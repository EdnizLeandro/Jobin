
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Search, Send, Phone, Video, MoreVertical, Paperclip, Smile, User} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Message {
  id: string
  sender_id: string
  sender_name: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file'
}

interface Conversation {
  id: string
  participant_id: string
  participant_name: string
  participant_avatar?: string
  last_message: string
  last_message_time: Date
  unread_count: number
  is_online: boolean
}

const Messages = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Dados mockados para demonstração
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participant_id: 'user1',
        participant_name: 'Maria Silva',
        last_message: 'Olá! Gostaria de saber mais sobre o projeto.',
        last_message_time: new Date(Date.now() - 1000 * 60 * 5),
        unread_count: 2,
        is_online: true
      },
      {
        id: '2',
        participant_id: 'user2',
        participant_name: 'João Santos',
        last_message: 'Perfeito! Vamos marcar uma reunião.',
        last_message_time: new Date(Date.now() - 1000 * 60 * 30),
        unread_count: 0,
        is_online: false
      },
      {
        id: '3',
        participant_id: 'user3',
        participant_name: 'Ana Costa',
        last_message: 'Obrigada pela oportunidade!',
        last_message_time: new Date(Date.now() - 1000 * 60 * 60 * 2),
        unread_count: 1,
        is_online: true
      }
    ]

    const mockMessages: Message[] = [
      {
        id: '1',
        sender_id: 'user1',
        sender_name: 'Maria Silva',
        content: 'Olá! Vi seu perfil e fiquei interessada no seu trabalho.',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        type: 'text'
      },
      {
        id: '2',
        sender_id: user?.id || 'current_user',
        sender_name: user?.name || 'Você',
        content: 'Olá Maria! Obrigado pelo interesse. Em que posso ajudá-la?',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        type: 'text'
      },
      {
        id: '3',
        sender_id: 'user1',
        sender_name: 'Maria Silva',
        content: 'Gostaria de saber mais sobre o projeto de design que você mencionou.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: 'text'
      }
    ]

    setConversations(mockConversations)
    setSelectedConversation(mockConversations[0])
    setMessages(mockMessages)
  }, [user])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const message: Message = {
      id: Date.now().toString(),
      sender_id: user?.id || 'current_user',
      sender_name: user?.name || 'Você',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    
    // Atualizar a conversa com a última mensagem
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, last_message: newMessage, last_message_time: new Date() }
          : conv
      )
    )

    toast.success('Mensagem enviada!')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Agora'
    if (minutes < 60) return `${minutes}min`
    if (hours < 24) return `${hours}h`
    return `${days}d`
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Lista de Conversas */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Voltar
                  </button>
                  <h1 className="text-xl font-bold text-gray-900">Mensagens</h1>
                </div>

                {/* Busca */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Lista de Conversas */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-purple-50 border-r-2 border-r-purple-500' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-purple-600" />
                        </div>
                        {conversation.is_online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {conversation.participant_name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTime(conversation.last_message_time)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-1">
                          {conversation.last_message}
                        </p>
                      </div>

                      {conversation.unread_count > 0 && (
                        <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {conversation.unread_count}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Área de Chat */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Header do Chat */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          {selectedConversation.is_online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {selectedConversation.participant_name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {selectedConversation.is_online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mensagens */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.sender_id === (user?.id || 'current_user') ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender_id === (user?.id || 'current_user')
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender_id === (user?.id || 'current_user')
                              ? 'text-purple-200'
                              : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input de Mensagem */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                          <Smile className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Selecione uma conversa
                    </h3>
                    <p className="text-gray-500">
                      Escolha uma conversa da lista para começar a conversar
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages
