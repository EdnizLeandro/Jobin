
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Users, Briefcase, ArrowLeft} from 'lucide-react'

const UserTypeSelection = () => {
  const navigate = useNavigate()

  const handleTypeSelection = (type: 'professional' | 'contractor') => {
    navigate('/cadastro', { state: { userType: type } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao início
          </button>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Como você quer usar o Jobin?
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Escolha o tipo de perfil que melhor representa você para começar sua jornada
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => handleTypeSelection('professional')}
          >
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-purple-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sou Profissional
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg">
                Quero oferecer meus serviços, desenvolver habilidades e encontrar oportunidades de trabalho
              </p>
              
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Criar perfil profissional
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Receber propostas de trabalho
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Acessar capacitações gratuitas
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Construir portfólio
                </li>
              </ul>
              
              <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors">
                Continuar como Profissional
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => handleTypeSelection('contractor')}
          >
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-10 w-10 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Sou Contratante
              </h2>
              
              <p className="text-gray-600 mb-6 text-lg">
                Quero contratar profissionais qualificados para meus projetos e necessidades
              </p>
              
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Encontrar profissionais qualificados
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Publicar oportunidades de trabalho
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Gerenciar contratos
                </li>
                <li className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Apoiar o desenvolvimento local
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors">
                Continuar como Contratante
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-purple-100 text-lg">
            Já tem uma conta?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-white font-bold underline hover:no-underline transition-all"
            >
              Fazer login
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default UserTypeSelection
