
import React, { useState } from 'react'
import {Mail, Send, CheckCircle} from 'lucide-react'
import { useNewsletter } from '../hooks/useNewsletter'
import toast from 'react-hot-toast'

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { subscribe } = useNewsletter()

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast.error('Por favor, insira seu email')
      return
    }

    if (!validateEmail(email)) {
      toast.error('Por favor, insira um email válido')
      return
    }

    setIsLoading(true)

    try {
      await subscribe(email, 'website')
      
      toast.success((t) => (
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
          <div>
            <p className="font-semibold">Inscrição realizada!</p>
            <p className="text-sm text-gray-600">Você receberá nossas novidades em breve</p>
          </div>
        </div>
      ), { duration: 4000 })

      setEmail('')
    } catch (error) {
      console.error('Erro ao inscrever na newsletter:', error)
      toast.error('Erro ao realizar inscrição. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputFocus = () => {
    toast('💡 Receba atualizações sobre oportunidades de trabalho e capacitações!', {
      duration: 3000,
      style: {
        background: '#f3f4f6',
        color: '#374151',
      },
    })
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Fique por Dentro das Novidades
          </h2>
          
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Receba em primeira mão informações sobre novas oportunidades de trabalho, 
            capacitações e eventos exclusivos para jovens de Recife.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleInputFocus}
                  placeholder="Seu melhor email"
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-900 placeholder-gray-500"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-900"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Inscrever
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-purple-100">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Sem spam, apenas conteúdo relevante</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Cancele quando quiser</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">500+</div>
              <div className="text-sm text-purple-100">Inscritos ativos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">2x</div>
              <div className="text-sm text-purple-100">Por semana</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">95%</div>
              <div className="text-sm text-purple-100">Taxa de satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
