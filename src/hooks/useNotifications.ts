
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface Notification {
  _id?: string
  user_id: string
  title: string
  message: string
  type: 'contract' | 'capacitation' | 'system' | 'reminder'
  is_read: boolean
  related_id?: string
  action_url?: string
  createdAt?: string
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const fetchNotifications = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { list } = await lumi.entities.notifications.list({
        filter: { user_id: user.userId },
        sort: { createdAt: -1 }
      })
      setNotifications(list || [])
      setUnreadCount((list || []).filter(n => !n.is_read).length)
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId: string) => {
    try {
      await lumi.entities.notifications.update(notificationId, {
        is_read: true
      })
      setNotifications(prev => 
        prev.map(n => n._id === notificationId ? { ...n, is_read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.is_read)
      await Promise.all(
        unreadNotifications.map(n => 
          lumi.entities.notifications.update(n._id!, { is_read: true })
        )
      )
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
      setUnreadCount(0)
      toast.success('Todas as notificações foram marcadas como lidas')
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error)
      toast.error('Erro ao atualizar notificações')
    }
  }

  const createNotification = async (notificationData: Omit<Notification, '_id' | 'createdAt'>) => {
    try {
      const newNotification = await lumi.entities.notifications.create({
        ...notificationData,
        createdAt: new Date().toISOString()
      })
      setNotifications(prev => [newNotification, ...prev])
      if (!notificationData.is_read) {
        setUnreadCount(prev => prev + 1)
      }
      return newNotification
    } catch (error) {
      console.error('Erro ao criar notificação:', error)
      throw error
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [user])

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    createNotification
  }
}
