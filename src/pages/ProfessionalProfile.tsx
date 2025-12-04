
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {User, MapPin, Star, Briefcase, BookOpen, Bell, Settings, LogOut, Award, Calendar, TrendingUp} from 'lucide-react'
import { useUserProfile } from '../hooks/useUserProfile'
import { useContracts } from '../hooks/useContracts'
import { useNotifications } from '../hooks/useNotifications'
import { useAuth } from '../hooks/useAuth'

const ProfessionalProfile = () => {
  const navigate = useNavigate()
  const { profile, loading } = useUserProfile()
  const { contracts, fetchContracts } = useContracts()
  const { unreadCount } = useNotifications()
  const { signOut } = useAuth()

  React.useEffect(() => {
    if (profile?.user_type === 'professional') {
      fetchContracts('professional')
    }
  }, [profile])

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!profile || profile.user_type !== 'professional') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfil não encontrado</h2>
          <button
            onClick={() => navigate('/selecionar-tipo')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Criar Perfil
          </button>
        </div>
      </div>
    )
  }

  const professionalData = profile.professional_data || {}
  const activeContracts = contracts.filter(c => c.status === 'accepted' || c.status === 'in_progress')
  const completedContracts = contracts.filter(c => c.status === 'completed')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://lumi.new/lumi.ing/logo.png"
                alt="Jobin"
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-gray-900">Jobin</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/notificacoes')}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Perfil */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card de Perfil */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={profile.photo_url || 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200'}
                    alt={profile.full_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.full_name}</h2>
                    <p className="text-purple-600 font-medium">{professionalData.area_of_expertise}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/editar-perfil')}
                  className="flex items-center text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Settings className="h-5 w-5 mr-2" />
                  Editar Perfil
                </button>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {professionalData.rating?.toFixed(1) || '0.0'}
                  </div>
                  <div className="text-sm text-purple-600">Avaliação</div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    {professionalData.completed_contracts || 0}
                  </div>
                  <div className="text-sm text-green-600">Contratos Concluídos</div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {professionalData.certifications?.length || 0}
                  </div>
                  <div className="text-sm text-blue-600">Certificações</div>
                </div>
              </div>

              {/* Experiência */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Experiência</h3>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">{professionalData.experience || 'Não informado'}</span>
                </div>
              </div>
            </motion.div>

            {/* Contratos Ativos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Contratos em Andamento</h3>
                <button
                  onClick={() => navigate('/contratos')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Ver todos
                </button>
              </div>

              {activeContracts.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum contrato ativo no momento</p>
                  <button
                    onClick={() => navigate('/explorar-capacitacoes')}
                    className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Explorar Oportunidades
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeContracts.slice(0, 3).map((contract) => (
                    <div key={contract._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{contract.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{contract.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-green-600 font-medium">
                              R$ {contract.value.toLocaleString('pt-BR')}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              contract.status === 'accepted' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {contract.status === 'accepted' ? 'Aceito' : 'Em Progresso'}
                            </span>
                          </div>
                        </div>
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Menu de Ações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/minhas-capacitacoes')}
                  className="w-full flex items-center text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700">Minhas Capacitações</span>
                </button>
                
                <button
                  onClick={() => navigate('/explorar-capacitacoes')}
                  className="w-full flex items-center text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">Explorar Profissionais</span>
                </button>
                
                <button
                  onClick={() => navigate('/contratos')}
                  className="w-full flex items-center text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Briefcase className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Ver Contratos</span>
                </button>
                
                <button
                  onClick={() => navigate('/notificacoes')}
                  className="w-full flex items-center text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-gray-700">Notificações</span>
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Resumo de Atividades */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contratos Ativos</span>
                  <span className="font-medium text-gray-900">{activeContracts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Contratos Concluídos</span>
                  <span className="font-medium text-gray-900">{completedContracts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avaliação Média</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="font-medium text-gray-900">
                      {professionalData.rating?.toFixed(1) || '0.0'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalProfile
