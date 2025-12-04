
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {Menu, X, User, LogOut, Settings, Bell, MessageSquare, BarChart3, Award, BookOpen} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import LoginModal from './LoginModal'
import UserMenu from './UserMenu'
import toast from 'react-hot-toast'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = () => {
    signOut()
    toast.success('Logout realizado com sucesso!')
    navigate('/')
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      toast.error('Faça login para acessar esta área')
      setShowLoginModal(true)
      return
    }
    navigate(path)
    setIsOpen(false)
    // Scroll para o topo da página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleLogoClick = () => {
    navigate('/')
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginClick = () => {
    setShowLoginModal(true)
    setIsOpen(false)
  }

  const handleRegisterClick = () => {
    navigate('/cadastro')
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const publicLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Funcionalidades', path: '/funcionalidades' },
    { name: 'Como Funciona', path: '/como-funciona' },
    { name: 'Impacto', path: '/impacto' },
    { name: 'Equipe', path: '/equipe' },
    { name: 'Contato', path: '/contato' }
  ]

  const userLinks = [
    { name: 'Capacitações', path: '/capacitacoes', icon: BookOpen },
    { name: 'Minhas Capacitações', path: '/minhas-capacitacoes', icon: BookOpen, requiresAuth: true },
    { name: 'Gamificação', path: '/gamificacao', icon: Award, requiresAuth: true }
  ]

  const isActivePage = (path: string) => {
    return location.pathname === path
  }

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Fixo à Esquerda */}
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-lg p-1"
              >
                <img 
                  src="https://lumi.new/lumi.ing/logo.png" 
                  alt="Jobin Logo" 
                  className="h-9 w-9 flex-shrink-0"
                />
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  Jobin
                </span>
              </button>
            </div>

            {/* Navegação Desktop - Otimizada */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-4">
              <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                {/* Links Públicos - Compactos */}
                <div className="flex items-center space-x-1">
                  {publicLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`text-gray-700 hover:text-purple-600 transition-colors font-medium px-2 py-2 rounded-md text-sm whitespace-nowrap ${
                        isActivePage(link.path) 
                          ? 'text-purple-600 bg-purple-50 font-semibold' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </button>
                  ))}
                </div>

                {/* Separador - Apenas quando autenticado */}
                {isAuthenticated && (
                  <div className="h-5 w-px bg-gray-300 mx-2 flex-shrink-0"></div>
                )}

                {/* Links do Usuário - Compactos */}
                {isAuthenticated && (
                  <div className="flex items-center space-x-1">
                    {userLinks.map((link) => (
                      <button
                        key={link.path}
                        onClick={() => handleNavClick(link.path, link.requiresAuth)}
                        className={`flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors px-2 py-2 rounded-md text-sm whitespace-nowrap ${
                          isActivePage(link.path) 
                            ? 'text-purple-600 bg-purple-50 font-semibold' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <link.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="hidden xl:block">{link.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Seção de Autenticação - Direita Fixa */}
            <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  {/* Ícones de Notificação - Compactos */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleNavClick('/mensagens', true)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      title="Mensagens"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center text-[10px]">
                        3
                      </span>
                    </button>
                    
                    <button
                      onClick={() => handleNavClick('/notificacoes', true)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      title="Notificações"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center text-[10px]">
                        5
                      </span>
                    </button>

                    <button
                      onClick={() => handleNavClick('/analytics', true)}
                      className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                      title="Analytics"
                    >
                      <BarChart3 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Separador */}
                  <div className="h-5 w-px bg-gray-300"></div>

                  {/* Menu do Usuário - Compacto */}
                  <UserMenu />
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLoginClick}
                    className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-200 px-3 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={handleRegisterClick}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-sm"
                  >
                    Cadastrar
                  </button>
                </div>
              )}
            </div>

            {/* Botão Menu Mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-purple-600 transition-colors p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-4 max-h-96 overflow-y-auto">
              {/* Links Públicos */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Navegação
                </div>
                {publicLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`block w-full text-left px-3 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors ${
                      isActivePage(link.path) ? 'bg-purple-50 text-purple-600 font-medium' : ''
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>

              {/* Links do Usuário (quando autenticado) */}
              {isAuthenticated && (
                <div className="border-t border-gray-200 pt-4 space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Área do Usuário
                  </div>
                  {[...userLinks, 
                    { name: 'Analytics', path: '/analytics', icon: BarChart3, requiresAuth: true },
                    { name: 'Mensagens', path: '/mensagens', icon: MessageSquare, requiresAuth: true },
                    { name: 'Notificações', path: '/notificacoes', icon: Bell, requiresAuth: true }
                  ].map((link) => (
                    <button
                      key={link.path}
                      onClick={() => handleNavClick(link.path, link.requiresAuth)}
                      className={`flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors ${
                        isActivePage(link.path) ? 'bg-purple-50 text-purple-600 font-medium' : ''
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.name}</span>
                      {(link.path === '/mensagens' || link.path === '/notificacoes') && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                          {link.path === '/mensagens' ? '3' : '5'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Seção de Autenticação */}
              <div className="border-t border-gray-200 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                      Olá, {user?.name || user?.email}
                    </div>
                    <button
                      onClick={() => handleNavClick('/configuracoes', true)}
                      className="flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Configurações</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={handleLoginClick}
                      className="flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <User className="h-5 w-5" />
                      <span>Entrar</span>
                    </button>
                    <button
                      onClick={handleRegisterClick}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 font-medium shadow-md"
                    >
                      Cadastrar Gratuitamente
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal de Login */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  )
}

export default Navbar
