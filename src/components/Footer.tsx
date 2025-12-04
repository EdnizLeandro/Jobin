
import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Heart, ExternalLink, ChevronLeft, ChevronRight} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Footer: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleNavClick = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      toast.error('Faça login para acessar esta área')
      navigate('/login')
      return
    }
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSocialClick = (platform: string) => {
    toast.info(`Redirecionando para ${platform}...`)
    // Aqui você pode adicionar os links reais das redes sociais
  }

  const handleExternalLink = (url: string, name: string) => {
    toast.success(`Abrindo ${name} em nova aba`)
    window.open(url, '_blank')
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Início', path: '/' },
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Funcionalidades', path: '/funcionalidades' },
    { name: 'Como Funciona', path: '/como-funciona' },
    { name: 'Nosso Impacto', path: '/impacto' },
    { name: 'Equipe', path: '/equipe' },
    { name: 'Contato', path: '/contato' }
  ]

  const platformLinks = [
    { name: 'Capacitações', path: '/capacitacoes' },
    { name: 'Minhas Capacitações', path: '/minhas-capacitacoes', requiresAuth: true },
    { name: 'Gamificação', path: '/gamificacao', requiresAuth: true },
    { name: 'Analytics', path: '/analytics', requiresAuth: true },
    { name: 'Mensagens', path: '/mensagens', requiresAuth: true },
    { name: 'Configurações', path: '/configuracoes', requiresAuth: true },
    { name: 'Perfil Profissional', path: '/perfil-profissional', requiresAuth: true },
    { name: 'Perfil Contratante', path: '/perfil-contratante', requiresAuth: true },
    { name: 'Contratos', path: '/contratos', requiresAuth: true },
    { name: 'Notificações', path: '/notificacoes', requiresAuth: true }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://lumi.new/lumi.ing/logo.png" 
                alt="Jobin Logo" 
                className="h-8 w-8"
              />
              <span className="text-2xl font-bold">Jobin</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformando vidas jovens em Recife através de oportunidades de trabalho, 
              educação e renda. Uma plataforma humana e acessível para o futuro.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick('Facebook')}
                className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick('Instagram')}
                className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-colors"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick('LinkedIn')}
                className="bg-gray-800 hover:bg-blue-700 p-2 rounded-lg transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick('Twitter')}
                className="bg-gray-800 hover:bg-blue-400 p-2 rounded-lg transition-colors"
                title="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Plataforma</h3>
            <ul className="space-y-2">
              {platformLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.path, link.requiresAuth)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                    {link.requiresAuth && !isAuthenticated && (
                      <span className="ml-1 text-xs text-yellow-400">*</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {!isAuthenticated && (
              <p className="text-xs text-yellow-400">
                * Requer login
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                  <p>Recife, Pernambuco</p>
                  <p>Brasil</p>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('/contato')}
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 text-purple-400" />
                <span className="text-sm">contato@jobin.com.br</span>
              </button>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-gray-300">(81) 9999-9999</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold mb-2">Parceiros</h4>
              <div className="space-y-1">
                <button
                  onClick={() => handleExternalLink('https://www.recife.pe.gov.br', 'Prefeitura do Recife')}
                  className="flex items-center text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Prefeitura do Recife
                </button>
                <button
                  onClick={() => handleExternalLink('https://www.pe.gov.br', 'Governo de Pernambuco')}
                  className="flex items-center text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Governo de Pernambuco
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Navegação Rápida</h3>
              <div className="flex space-x-2">
                <button
                  onClick={scrollLeft}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  title="Rolar para esquerda"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                  title="Rolar para direita"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...quickLinks, ...platformLinks].map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(link.path, link.requiresAuth)}
                  className="flex-shrink-0 bg-gray-800 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  {link.name}
                  {link.requiresAuth && !isAuthenticated && (
                    <span className="ml-1 text-xs text-yellow-400">*</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <p>&copy; {currentYear} Jobin. Todos os direitos reservados.</p>
              <span className="hidden md:block">|</span>
              <button
                onClick={() => handleNavClick('/contato')}
                className="hover:text-white transition-colors"
              >
                Política de Privacidade
              </button>
              <span>|</span>
              <button
                onClick={() => handleNavClick('/contato')}
                className="hover:text-white transition-colors"
              >
                Termos de Uso
              </button>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para jovens de Recife</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </footer>
  )
}

export default Footer
