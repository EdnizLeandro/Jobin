
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {BookOpen, Users, Award, TrendingUp, Briefcase, MessageSquare, Settings, BarChart3, Target, Zap, Heart, Shield, Globe, Smartphone, ArrowRight, CheckCircle, Star, Play, ExternalLink} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Features: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleFeatureClick = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      toast.error('Faça login para acessar esta funcionalidade')
      navigate('/login')
      return
    }
    navigate(path)
  }

  const handleDemoClick = (feature: string) => {
    toast.success(`Demo de ${feature} em breve!`)
  }

  const mainFeatures = [
    {
      icon: BookOpen,
      title: "Capacitações Profissionais",
      description: "Cursos práticos e certificações que preparam você para o mercado de trabalho local",
      path: "/capacitacoes",
      color: "bg-blue-500",
      benefits: ["Certificações reconhecidas", "Instrutores qualificados", "Conteúdo atualizado", "Suporte personalizado"]
    },
    {
      icon: Briefcase,
      title: "Oportunidades de Trabalho",
      description: "Conectamos você com empresas que valorizam jovens talentos em Recife",
      path: "/capacitacoes",
      color: "bg-green-500",
      benefits: ["Vagas exclusivas", "Match inteligente", "Preparação para entrevistas", "Acompanhamento pós-contratação"]
    },
    {
      icon: Award,
      title: "Sistema de Gamificação",
      description: "Ganhe pontos, badges e reconhecimento pelo seu progresso e conquistas",
      path: "/gamificacao",
      color: "bg-purple-500",
      requiresAuth: true,
      benefits: ["Pontos por atividades", "Badges exclusivos", "Rankings", "Recompensas reais"]
    },
    {
      icon: TrendingUp,
      title: "Analytics & Performance",
      description: "Análise completa do mercado de trabalho com dados do Novo CAGED em dashboard interativo",
      path: "/analytics",
      color: "bg-indigo-500",
      requiresAuth: true,
      benefits: ["Dashboard do Novo CAGED", "Dados em tempo real", "Análise de mercado RMR", "Visualizações interativas"],
      externalLink: "https://mercado-e5n3wlbybyt4h4jknnf3p8.streamlit.app/"
    }
  ]

  const additionalFeatures = [
    {
      icon: Users,
      title: "Rede de Contatos",
      description: "Conecte-se com outros jovens e profissionais",
      path: "/mensagens",
      requiresAuth: true
    },
    {
      icon: MessageSquare,
      title: "Sistema de Mensagens",
      description: "Comunicação direta com empresas e mentores",
      path: "/mensagens",
      requiresAuth: true
    },
    {
      icon: Settings,
      title: "Configurações Personalizadas",
      description: "Customize sua experiência na plataforma",
      path: "/configuracoes",
      requiresAuth: true
    },
    {
      icon: Target,
      title: "Metas e Objetivos",
      description: "Defina e acompanhe seus objetivos profissionais",
      path: "/configuracoes",
      requiresAuth: true
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Funcionalidades que
              <span className="block text-yellow-300">Transformam Vidas</span>
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Descubra todas as ferramentas desenvolvidas especialmente para jovens de Recife 
              construírem um futuro profissional de sucesso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tecnologia Avançada</h3>
              <p className="text-purple-100">Plataforma moderna e intuitiva</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-purple-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Foco Humano</h3>
              <p className="text-purple-100">Desenvolvido pensando em pessoas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-900" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Seguro e Confiável</h3>
              <p className="text-purple-100">Dados protegidos e privacidade garantida</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Principais Funcionalidades
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Ferramentas completas para sua jornada profissional
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <button
                      onClick={() => handleDemoClick(feature.title)}
                      className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Demo
                    </button>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 text-lg">
                    {feature.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleFeatureClick(feature.path, feature.requiresAuth)}
                      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                    >
                      {feature.requiresAuth && !isAuthenticated ? 'Fazer Login para Acessar' : 'Explorar Funcionalidade'}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                    {feature.externalLink && (
                      <a
                        href={feature.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-white border-2 border-indigo-500 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
                        Abrir Dashboard Externo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Complementares
            </h2>
            <p className="text-xl text-gray-600">
              Recursos adicionais para uma experiência completa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={index}
                onClick={() => handleFeatureClick(feature.path, feature.requiresAuth)}
                className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
                  Acessar
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher o Jobin?
            </h2>
            <p className="text-xl text-gray-600">
              Vantagens que fazem a diferença na sua jornada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Acesso 24/7",
                description: "Plataforma disponível a qualquer hora, em qualquer lugar",
                stats: "99.9% de uptime"
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                description: "Experiência otimizada para dispositivos móveis",
                stats: "App nativo em breve"
              },
              {
                icon: Users,
                title: "Comunidade Ativa",
                description: "Rede de jovens, mentores e empresas engajadas",
                stats: "5.000+ membros"
              },
              {
                icon: Award,
                title: "Certificações Válidas",
                description: "Cursos reconhecidos pelo mercado de trabalho",
                stats: "200+ certificações"
              },
              {
                icon: TrendingUp,
                title: "Taxa de Sucesso",
                description: "Alto índice de colocação no mercado de trabalho",
                stats: "85% de empregabilidade"
              },
              {
                icon: Heart,
                title: "Suporte Humanizado",
                description: "Atendimento personalizado e focado no seu sucesso",
                stats: "Resposta em 24h"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {benefit.description}
                </p>
                <div className="bg-purple-50 rounded-lg p-3">
                  <span className="text-purple-600 font-semibold">{benefit.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Junte-se a milhares de jovens que já estão transformando suas vidas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleFeatureClick('/cadastro')}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              Cadastre-se Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => handleFeatureClick('/capacitacoes')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center"
            >
              Explorar Capacitações
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Features
