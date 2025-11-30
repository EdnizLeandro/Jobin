
import { useState, useEffect } from 'react'

interface AdminUser {
  email: string
  name: string
  isAdmin: true
}

export const useAdminAuth = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Credenciais administrativas
  const ADMIN_EMAIL = '***********'
  const ADMIN_PASSWORD = '*********'

  useEffect(() => {
    // Verificar se há sessão admin salva
    const savedAdminSession = localStorage.getItem('admin_session')
    if (savedAdminSession) {
      try {
        const adminData = JSON.parse(savedAdminSession)
        if (adminData.email === ADMIN_EMAIL) {
          setAdminUser(adminData)
          setIsAdminAuthenticated(true)
        }
      } catch (error) {
        localStorage.removeItem('admin_session')
      }
    }
    setLoading(false)
  }, [])

  const signInAdmin = async (email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> => {
    try {
      // Validar credenciais administrativas
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return { success: false, error: 'Credenciais administrativas inválidas' }
      }

      const adminUser: AdminUser = {
        email: ADMIN_EMAIL,
        name: 'Administrador',
        isAdmin: true
      }

      // Salvar sessão admin
      localStorage.setItem('admin_session', JSON.stringify(adminUser))
      
      setAdminUser(adminUser)
      setIsAdminAuthenticated(true)

      return { success: true, user: adminUser }
    } catch (error) {
      return { success: false, error: 'Erro interno do servidor' }
    }
  }

  const signOutAdmin = () => {
    localStorage.removeItem('admin_session')
    setAdminUser(null)
    setIsAdminAuthenticated(false)
  }

  const isValidAdmin = (email: string): boolean => {
    return email === ADMIN_EMAIL
  }

  return {
    adminUser,
    isAdminAuthenticated,
    loading,
    signInAdmin,
    signOutAdmin,
    isValidAdmin
  }
}
