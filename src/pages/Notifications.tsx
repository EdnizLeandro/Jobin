
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Bell, CheckCircle, Circle, Briefcase, BookOpen, Settings, Clock, CheckCheck} from 'lucide-react'
import { useNotifications } from '../hooks/useNotifications'

const Notifications = () => {
  const navigate = useNavigate()
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } = useNotifications()
  const [filter, setFilter] = useState<'all' | 'unread' | 'contract' | 'capacitation' | 'system' | 'reminder'>('all')

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <Briefcase className="h-5 w-5 text-blue-600" />
      case 'capacitation':
        return <BookOpen className="h-5 w-5 text-green-600" />
      case 'system':
        return <Settings className="h-5 w-5 text-gray-600" />
      case 'reminder':
        return <Clock className="h-5 w-5 text-orange-600" />
      default:
        return <Bell className="h-5 w-5 text-purple-600" />
    }
  }

  const getNotificationTypeText = (type: string) => {
    switch (type) {
      case 'contract':
        return 'Contrato'
      case 'capacitation':
        return 'Capacitação'
      case 'system':
        return 'Sistema'
      case 'reminder':
        return 'Lembrete'
      default:
        return 'Notificação'
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.is_read
      case 'contract':
      case 'capacitation':
      case 'system':
      case 'reminder':
        return notification.type === filter
      default:
        return true
    }
  })

  const handleNotificationClick = (notification: any) => {
    if (!notification.is_read) {
      markAsRead(notification._id)
    }
    
    if (notification.action_url) {
      navigate(notification.action_url)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notificações</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600">{unreadCount} não lida(s)</p>
                )}
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <CheckCheck className="h-5 w-5 mr-2" />
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filtrar por</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'unread'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Não lidas ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('contract')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'contract'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Contratos
            </button>
            <button
              onClick={() => setFilter('capacitation')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'capacitation'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Capacitações
            </button>
            <button
              onClick={() => setFilter('reminder')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'reminder'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Lembretes
            </button>
          </div>
        </motion.div>

        {/* Lista de Notificações */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {filter === 'all' ? 'Nenhuma notificação' : `Nenhuma notificação ${filter === 'unread' ? 'não lida' : `do tipo ${filter}`}`}
            </p>
            <p className="text-gray-400 mt-2">
              Quando houver atualizações importantes, você será notificado aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => handleNotificationClick(notification)}
                className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all ${
                  !notification.is_read ? 'border-l-4 border-purple-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {notification.title}
                          </h4>
                          {!notification.is_read && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {getNotificationTypeText(notification.type)}
                          </span>
                          <span>
                            {new Date(notification.createdAt || '').toLocaleString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        {notification.is_read ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications
