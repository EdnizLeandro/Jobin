
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface Contract {
  _id?: string
  title: string
  description: string
  contractor_id: string
  professional_id: string
  value: number
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  deadline?: string
  category?: string
  requirements?: string[]
  createdAt?: string
  updatedAt?: string
}

export const useContracts = () => {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const fetchContracts = async (userType?: 'professional' | 'contractor') => {
    setLoading(true)
    try {
      let filter = {}
      
      if (userType === 'professional') {
        filter = { professional_id: user?.userId || 'current_user' }
      } else if (userType === 'contractor') {
        filter = { contractor_id: user?.userId || 'current_user' }
      }

      const { list } = await lumi.entities.contracts.list({
        filter,
        sort: { createdAt: -1 }
      })
      setContracts(list || [])
    } catch (error) {
      console.error('Erro ao buscar contratos:', error)
      toast.error('Erro ao carregar contratos')
    } finally {
      setLoading(false)
    }
  }

  const createContract = async (contractData: Omit<Contract, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString()
      const newContract = await lumi.entities.contracts.create({
        ...contractData,
        createdAt: now,
        updatedAt: now
      })
      setContracts(prev => [newContract, ...prev])
      toast.success('Contrato criado com sucesso!')
      return newContract
    } catch (error) {
      console.error('Erro ao criar contrato:', error)
      toast.error('Erro ao criar contrato')
      throw error
    }
  }

  const updateContract = async (contractId: string, updates: Partial<Contract>) => {
    try {
      const updatedContract = await lumi.entities.contracts.update(contractId, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      setContracts(prev => prev.map(c => c._id === contractId ? updatedContract : c))
      toast.success('Contrato atualizado com sucesso!')
      return updatedContract
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error)
      toast.error('Erro ao atualizar contrato')
      throw error
    }
  }

  return {
    contracts,
    loading,
    fetchContracts,
    createContract,
    updateContract
  }
}
