
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Plus, Search, Filter, Briefcase, Calendar, DollarSign, User, Clock, CheckCircle, XCircle, AlertCircle} from 'lucide-react'
import { useContracts } from '../hooks/useContracts'
import { useUserProfile } from '../hooks/useUserProfile'
import toast from 'react-hot-toast'

const ContractManagement = () => {
  const navigate = useNavigate()
  const { contracts, loading, fetchContracts, updateContract } = useContracts()
  const { profile } = useUserProfile()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'>('all')

  const statusOptions = [
    { value: 'all', label: 'Todos', count: contracts.length },
    { value: 'pending', label: 'Pendentes', count: contracts.filter(c => c.status === 'pending').length },
    { value: 'accepted', label: 'Aceitos', count: contracts.filter(c => c.status === 'accepted').length },
    { value: 'in_progress', label: 'Em Progresso', count: contracts.filter(c => c.status === 'in_progress').length },
    { value: 'completed', label: 'Concluídos', count: contracts.filter(c => c.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelados', count: contracts.filter(c => c.status === 'cancelled').length }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Briefcase className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente'
      case 'accepted':
        return 'Aceito'
      case 'in_progress':
        return 'Em Progresso'
      case 'completed':
        return 'Concluído'
      case 'cancelled':
        return 'Cancelado'
      default:
        return 'Desconhecido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (contractId: string, newStatus: string) => {
    try {
      await updateContract(contractId, { status: newStatus as any })
    } catch (error) {
      // Erro já tratado no hook
    }
  }

  const getAvailableActions = (contract: any) => {
    const actions = []
    
    if (profile?.user_type === 'professional') {
      if (contract.status === 'pending') {
        actions.push(
          { label: 'Aceitar', status: 'accepted', color: 'bg-green-600 hover:bg-green-700' },
          { label: 'Recusar', status: 'cancelled', color: 'bg-red-600 hover:bg-red-700' }
        )
      } else if (contract.status === 'accepted') {
        actions.push(
          { label: 'Iniciar', status: 'in_progress', color: 'bg-blue-600 hover:bg-blue-700' }
        )
      } else if (contract.status === 'in_progress') {
        actions.push(
          { label: 'Concluir', status: 'completed', color: 'bg-green-600 hover:bg-green-700' }
        )
      }
    } else if (profile?.user_type === 'contractor') {
      if (contract.status === 'pending') {
        actions.push(
          { label: 'Cancelar', status: 'cancelled', color: 'bg-red-600 hover:bg-red-700' }
        )
      }
    }
    
    return actions
  }

  useEffect(() => {
    if (profile) {
      fetchContracts(profile.user_type)
    }
  }, [profile])

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Contratos</h1>
            </div>
            
            {profile?.user_type === 'contractor' && (
              <button
                onClick={() => navigate('/criar-contrato')}
                className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Novo Contrato
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar contratos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Status */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statusOptions.slice(1).map(option => (
              <div key={option.value} className="text-center">
                <div className="text-2xl font-bold text-gray-900">{option.count}</div>
                <div className="text-sm text-gray-600">{option.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lista de Contratos */}
        {filteredContracts.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum contrato encontrado</p>
            <p className="text-gray-400 mt-2">
              {statusFilter === 'all' 
                ? 'Quando você tiver contratos, eles aparecerão aqui'
                : `Nenhum contrato com status "${getStatusText(statusFilter)}"`
              }
            </p>
            {profile?.user_type === 'contractor' && statusFilter === 'all' && (
              <button
                onClick={() => navigate('/criar-contrato')}
                className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Criar Primeiro Contrato
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredContracts.map((contract, index) => (
              <motion.div
                key={contract._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {contract.title}
                      </h3>
                      {getStatusIcon(contract.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {getStatusText(contract.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {contract.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                        <span className="font-medium">R$ {contract.value.toLocaleString('pt-BR')}</span>
                      </div>
                      
                      {contract.deadline && (
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                          <span>Prazo: {new Date(contract.deadline).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                      
                      {contract.category && (
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="h-4 w-4 mr-2 text-purple-600" />
                          <span>{contract.category}</span>
                        </div>
                      )}
                    </div>

                    {contract.requirements && contract.requirements.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Requisitos:</h4>
                        <div className="flex flex-wrap gap-2">
                          {contract.requirements.map((req, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Criado em: {new Date(contract.createdAt || '').toLocaleDateString('pt-BR')}
                  </div>
                  
                  <div className="flex space-x-2">
                    {getAvailableActions(contract).map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleStatusChange(contract._id!, action.status)}
                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${action.color}`}
                      >
                        {action.label}
                      </button>
                    ))}
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

export default ContractManagement
