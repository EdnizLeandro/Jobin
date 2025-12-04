
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {User, Settings, LogOut, Bell, MessageSquare, Award, BarChart3, ChevronDown, UserCircle} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    signOut()
    toast.success('Logout realizado com sucesso!')
    navigate('/')
    setIsOpen(false)
  }

  const handleMenuClick = (path: string, action?: () => void) => {
    if (action) {
      action()
    } else {
      navigate(path)
    }
    setIsOpen(false)
  }

  const menuItems = [
    {
      icon: UserCircle,
      label: 'Meu Perfil',
      path: '/perfil-profissional',
      description: 'Visualizar e editar perfil'
    },
    {
      icon: Settings,
      label: 'Configurações',
      path: '/configuracoes',
      description: 'Preferências da conta'
    }
  ]

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors bg-gray-50 hover:bg-gray-100 rounded-full px-2 py-1.5"
      >
        <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden md:block font-medium text-sm max-w-20 truncate">
          {user?.name || user?.email?.split('@')[0] || 'Usuário'}
        </span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {user?.name || 'Nome do Usuário'}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {user?.email || 'email@exemplo.com'}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item.path)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <item.icon className="h-4 w-4 text-gray-600 group-hover:text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-purple-600">
                    {item.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => handleMenuClick('', handleSignOut)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors group"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <LogOut className="h-4 w-4 text-gray-600 group-hover:text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 group-hover:text-red-600">
                  Sair da Conta
                </div>
                <div className="text-xs text-gray-500">
                  Fazer logout do sistema
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
