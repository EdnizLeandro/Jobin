import React, { useState } from 'react'
import {X, Mail, Lock, Eye, EyeOff, LogIn, User, CheckCircle} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{email?: string, password?: string}>({})
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {}
    
    if (!email) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Preencha todos os campos corretamente')
      return
    }

    setIsLoading(true)

    try {
      await signIn()
      toast.success('Login realizado com sucesso! Bem-vindo ao Jobin!')
      onClose()
      // Reset form
      setEmail('')
      setPassword('')
      setErrors({})
      navigate('/gamificacao')
    } catch (error) {
      console.error('Erro no login:', error)
      toast.error('Erro ao fazer login. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterClick = () => {
    onClose()
    setEmail('')
    setPassword('')
    setErrors({})
    navigate('/cadastro')
  }

  const handleForgotPassword = () => {
    if (email) {
      toast.success('Link de recuperação enviado para seu email!')
    } else {
      toast.info('Digite seu email e clique novamente para recuperar a senha')
    }
  }

  const handleClose = () => {
    onClose()
    setEmail('')
    setPassword('')
    setErrors({})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-full p-2">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Entrar no Jobin</h2>
                <p className="text-sm text-gray-600">Acesse sua conta e continue sua jornada</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({...errors, email: undefined})
                  }}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                {!errors.email && email && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors({...errors, password: undefined})
                  }}
                  placeholder="Sua senha"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium"
              >
                Esqueci minha senha
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 mr-2" />
                  Entrar na Plataforma
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              Ainda não tem uma conta?
            </p>
            <button
              onClick={handleRegisterClick}
              className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              <User className="h-5 w-5 mr-2" />
              Cadastre-se Gratuitamente
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-purple-900 mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Ao fazer login você terá acesso a:
            </h3>
            <ul className="text-xs text-purple-700 space-y-2">
              <li className="flex items-center">
                <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                Capacitações personalizadas para seu perfil
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                Sistema de gamificação com pontos e badges
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                Oportunidades de trabalho exclusivas em Recife
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                Rede de contatos profissionais
              </li>
              <li className="flex items-center">
                <div className="w-1 h-1 bg-purple-600 rounded-full mr-2"></div>
                Relatórios detalhados de seu progresso
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal