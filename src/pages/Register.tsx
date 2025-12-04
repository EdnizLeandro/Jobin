
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Eye, EyeOff, Upload} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useUserProfile } from '../hooks/useUserProfile'
import toast from 'react-hot-toast'
import { sanitizeInput, validateEmail, validatePassword, validateCPF, validateCNPJ } from '../utils/security'
import { registerRateLimiter, getBrowserFingerprint, formatBlockTime } from '../utils/rateLimiter'

interface RegisterFormData {
  full_name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  location?: string
  
  // Campos específicos para profissional
  area_of_expertise?: string
  experience?: string
  
  // Campos específicos para contratante
  company_name?: string
  cnpj_cpf?: string
  sector?: string
}

const Register = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { createProfile } = useUserProfile()
  const userType = location.state?.userType as 'professional' | 'contractor'
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>()

  const password = watch('password')

  const onSubmit = async (data: RegisterFormData) => {
    const fingerprint = getBrowserFingerprint()
    
    // Verifica rate limiting
    const status = registerRateLimiter.getStatus(fingerprint)
    
    if (status.isBlocked && status.blockExpiry) {
      const timeRemaining = formatBlockTime(status.blockExpiry)
      toast.error(`Muitas tentativas de registro. Tente novamente em ${timeRemaining}.`)
      return
    }
    
    if (status.attemptsRemaining <= 1 && status.attemptsRemaining > 0) {
      toast.error(`Atenção: ${status.attemptsRemaining} tentativa restante antes do bloqueio temporário.`)
    }
    
    if (data.password !== data.confirmPassword) {
      toast.error('As senhas não coincidem')
      return
    }

    // Validação de e-mail
    if (!validateEmail(data.email)) {
      toast.error('E-mail inválido')
      return
    }

    // Validação de senha forte
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.valid) {
      toast.error(passwordValidation.errors[0])
      return
    }

    // Validação de CNPJ/CPF para contratante
    if (userType === 'contractor' && data.cnpj_cpf) {
      const cleanDoc = data.cnpj_cpf.replace(/[^\d]/g, '')
      const isValid = cleanDoc.length === 11 ? validateCPF(data.cnpj_cpf) : validateCNPJ(data.cnpj_cpf)
      
      if (!isValid) {
        toast.error('CNPJ/CPF inválido')
        return
      }
    }

    setLoading(true)
    try {
      // Sanitiza dados de entrada
      const sanitizedData = {
        full_name: sanitizeInput(data.full_name),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone),
        location: data.location ? sanitizeInput(data.location) : undefined,
        area_of_expertise: data.area_of_expertise ? sanitizeInput(data.area_of_expertise) : undefined,
        experience: data.experience ? sanitizeInput(data.experience) : undefined,
        company_name: data.company_name ? sanitizeInput(data.company_name) : undefined,
        cnpj_cpf: data.cnpj_cpf ? sanitizeInput(data.cnpj_cpf) : undefined,
        sector: data.sector ? sanitizeInput(data.sector) : undefined
      }
      
      const profileData = {
        user_type: userType,
        full_name: sanitizedData.full_name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        location: sanitizedData.location,
        ...(userType === 'professional' && {
          professional_data: {
            area_of_expertise: sanitizedData.area_of_expertise,
            experience: sanitizedData.experience,
            certifications: [],
            rating: 0,
            completed_contracts: 0
          }
        }),
        ...(userType === 'contractor' && {
          contractor_data: {
            company_name: sanitizedData.company_name,
            cnpj_cpf: sanitizedData.cnpj_cpf,
            sector: sanitizedData.sector,
            total_contracts: 0
          }
        })
      }

      await createProfile(profileData)
      
      // Registra tentativa bem-sucedida
      registerRateLimiter.recordAttempt(fingerprint)
      
      toast.success('Cadastro realizado com sucesso!')
      navigate(userType === 'professional' ? '/perfil-profissional' : '/perfil-contratante')
      
    } catch (error) {
      console.error('Erro no cadastro:', error)
      toast.error('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (!userType) {
    navigate('/selecionar-tipo')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate('/selecionar-tipo')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Criar Conta {userType === 'professional' ? 'Profissional' : 'Contratante'}
              </h1>
              <p className="text-gray-600">
                Preencha os dados abaixo para começar sua jornada no Jobin
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Campos comuns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    {...register('full_name', { 
                      required: 'Nome completo é obrigatório',
                      minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'E-mail é obrigatório',
                      pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone *
                  </label>
                  <input
                    {...register('phone', { required: 'Telefone é obrigatório' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="(81) 99999-9999"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <input
                    {...register('location')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Cidade, Estado"
                  />
                </div>
              </div>

              {/* Campos específicos para profissional */}
              {userType === 'professional' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Área de Atuação *
                    </label>
                    <select
                      {...register('area_of_expertise', { required: 'Área de atuação é obrigatória' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione uma área</option>
                      <option value="Design Gráfico">Design Gráfico</option>
                      <option value="Desenvolvimento Web">Desenvolvimento Web</option>
                      <option value="Marketing Digital">Marketing Digital</option>
                      <option value="Redação">Redação</option>
                      <option value="Fotografia">Fotografia</option>
                      <option value="Consultoria">Consultoria</option>
                      <option value="Educação">Educação</option>
                      <option value="Outros">Outros</option>
                    </select>
                    {errors.area_of_expertise && (
                      <p className="text-red-500 text-sm mt-1">{errors.area_of_expertise.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nível de Experiência *
                    </label>
                    <select
                      {...register('experience', { required: 'Nível de experiência é obrigatório' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Iniciante">Iniciante</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Especialista">Especialista</option>
                    </select>
                    {errors.experience && (
                      <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Campos específicos para contratante */}
              {userType === 'contractor' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CNPJ/CPF *
                      </label>
                      <input
                        {...register('cnpj_cpf', { required: 'CNPJ/CPF é obrigatório' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="00.000.000/0000-00 ou 000.000.000-00"
                      />
                      {errors.cnpj_cpf && (
                        <p className="text-red-500 text-sm mt-1">{errors.cnpj_cpf.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Empresa
                      </label>
                      <input
                        {...register('company_name')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Nome da sua empresa (opcional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Setor de Interesse *
                    </label>
                    <select
                      {...register('sector', { required: 'Setor é obrigatório' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Selecione um setor</option>
                      <option value="Tecnologia">Tecnologia</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Educação">Educação</option>
                      <option value="Saúde">Saúde</option>
                      <option value="Varejo">Varejo</option>
                      <option value="Serviços">Serviços</option>
                      <option value="Indústria">Indústria</option>
                      <option value="Outros">Outros</option>
                    </select>
                    {errors.sector && (
                      <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Campos de senha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password', { 
                        required: 'Senha é obrigatória',
                        minLength: { value: 8, message: 'Senha deve ter pelo menos 8 caracteres' }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Senha *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...register('confirmPassword', { 
                        required: 'Confirmação de senha é obrigatória',
                        validate: value => value === password || 'As senhas não coincidem'
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                      placeholder="Confirme sua senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6">
                <p className="text-sm text-gray-600">
                  Já possui conta?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-purple-600 font-medium hover:text-purple-700"
                  >
                    Fazer login
                  </button>
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Criando conta...' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register
