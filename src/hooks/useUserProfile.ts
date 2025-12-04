
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface UserProfile {
  _id?: string
  user_type: 'professional' | 'contractor'
  full_name: string
  email: string
  phone: string
  location?: string
  photo_url?: string
  professional_data?: {
    area_of_expertise?: string
    experience?: string
    certifications?: string[]
    rating?: number
    completed_contracts?: number
  }
  contractor_data?: {
    company_name?: string
    cnpj_cpf?: string
    sector?: string
    total_contracts?: number
  }
  createdAt?: string
  updatedAt?: string
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const { list } = await lumi.entities.user_profiles.list()
      if (list && list.length > 0) {
        setProfile(list[0])
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (profileData: Omit<UserProfile, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString()
      const newProfile = await lumi.entities.user_profiles.create({
        ...profileData,
        createdAt: now,
        updatedAt: now
      })
      setProfile(newProfile)
      toast.success('Perfil criado com sucesso!')
      return newProfile
    } catch (error) {
      console.error('Erro ao criar perfil:', error)
      toast.error('Erro ao criar perfil')
      throw error
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile?._id) return

    try {
      const updatedProfile = await lumi.entities.user_profiles.update(profile._id, {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      setProfile(updatedProfile)
      toast.success('Perfil atualizado com sucesso!')
      return updatedProfile
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      toast.error('Erro ao atualizar perfil')
      throw error
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    createProfile,
    updateProfile,
    fetchProfile
  }
}
