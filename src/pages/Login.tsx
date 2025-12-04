
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Bot, ArrowLeft, Shield, Users, Zap} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { signIn, loading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async () => {
    try {
      await signIn()
      toast.success('Login realizado com sucesso!')
      navigate('/')
    } catch (error) {
      toast.error('Erro no login. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
              <Bot className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold">Jobin</h1>
              <p className="text-purple-100 text-lg">Transformando talentos em oportunidades</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Acesso Seguro</h3>
                <p className="text-purple-100">
                  Sua conta é protegida com a mais alta segurança da plataforma Lumi
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comunidade</h3>
                <p className="text-purple-100">
                  Conecte-se com outros jovens e empresas da Região Metropolitana do Recife
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Oportunidades</h3>
                <p className="text-purple-100">
                  Acesse cursos gratuitos, vagas de trabalho e desenvolva suas habilidades
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar ao site
            </button>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600 text-lg">
              Faça login para acessar sua conta e descobrir novas oportunidades
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <Bot className="h-6 w-6 mr-3" />
                  Entrar com Lumi
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Primeira vez aqui? O login será criado automaticamente
              </p>
            </div>

            <div className="border-t pt-6">
              <p className="text-center text-sm text-gray-500">
                Ao fazer login, você concorda com nossos{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-purple-600 hover:underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
