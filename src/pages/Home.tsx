
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ArrowRight, Users, Target, Zap, Award, BookOpen, Briefcase, TrendingUp, Heart, Star, Play, Download, ChevronRight, MapPin, Clock, Calendar, Volume2, Maximize, Pause} from 'lucide-react'
import DownloadButton from '../components/DownloadButton'
import NewsletterSignup from '../components/NewsletterSignup'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  const handleFeatureClick = (path: string, requiresAuth: boolean = false) => {
    if (requiresAuth && !isAuthenticated) {
      toast.error('Faça login para acessar esta funcionalidade')
      navigate('/login')
      return
    }
    navigate(path)
    // Scroll para o topo da página
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleVideoPlay = () => {
    setShowVideoModal(true)
    setIsVideoPlaying(true)
    toast.success('Reproduzindo vídeo institucional do Jobin')
  }

  const handleVideoClose = () => {
    setShowVideoModal(false)
    setIsVideoPlaying(false)
  }

  const handleStatClick = (stat: string) => {
    toast.info(`Estatística: ${stat}`)
  }

  const handleTestimonialClick = (name: string) => {
    toast.info(`Depoimento de ${name}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Transformando
                  <span className="block text-yellow-300">Vidas Jovens</span>
                  em Recife
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-purple-100">
                  Conectamos jovens a oportunidades de trabalho, educação e renda através de uma plataforma humana e acessível.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => handleFeatureClick('/capacitacoes')}
                  className="bg-yellow-400 text-purple-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Explorar Capacitações
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5" />
                </button>
                <DownloadButton variant="secondary" source="hero" />
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:flex md:items-center md:space-x-6 lg:space-x-8 pt-4">
                <div 
                  className="text-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleStatClick('5.000+ jovens impactados')}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">5.000+</div>
                  <div className="text-xs sm:text-sm md:text-base text-purple-200">Jovens Impactados</div>
                </div>
                <div 
                  className="text-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleStatClick('200+ empresas parceiras')}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">200+</div>
                  <div className="text-xs sm:text-sm md:text-base text-purple-200">Empresas Parceiras</div>
                </div>
                <div 
                  className="text-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleStatClick('95% de satisfação')}
                >
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-300">95%</div>
                  <div className="text-xs sm:text-sm md:text-base text-purple-200">Satisfação</div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-yellow-400 text-purple-900 rounded-full p-2 sm:p-3 shadow-lg">
                  <Play className="h-4 w-4 sm:h-6 sm:w-6" />
                </div>
                
                {/* Thumbnail do Vídeo */}
                <div className="relative">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Jovens colaborando" 
                    className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg"
                  />
                  
                  {/* Overlay do Play */}
                  <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                    <button
                      onClick={handleVideoPlay}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/50 rounded-full p-4 transition-all duration-300 transform hover:scale-110"
                    >
                      <Play className="h-12 w-12 text-white ml-1" />
                    </button>
                  </div>
                  
                  {/* Indicador de Duração */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-2 py-1 rounded">
                    5:32
                  </div>
                </div>

                <button
                  onClick={handleVideoPlay}
                  className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Assistir Nossa História
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal do Vídeo */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            {/* Controles do Vídeo */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button
                onClick={handleVideoClose}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                title="Fechar"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Player do Vídeo - YouTube Embed com novo link */}
            <iframe
              src="https://www.youtube.com/embed/nZXHTJzhaQQ?autoplay=1&controls=1&rel=0&modestbranding=1"
              title="Vídeo Institucional Jobin"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* Informações do Vídeo */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-xl font-semibold mb-2">
                Jobin - Transformando Vidas em Recife
              </h3>
              <p className="text-gray-300 text-sm">
                Conheça nossa missão de conectar jovens a oportunidades de trabalho e educação
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Funcionalidades que Transformam
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Desenvolvemos soluções pensadas especialmente para jovens de Recife, 
              conectando talentos a oportunidades reais de crescimento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Capacitações Profissionais",
                description: "Cursos práticos e certificações que preparam você para o mercado de trabalho",
                path: "/capacitacoes",
                color: "bg-blue-500"
              },
              {
                icon: Briefcase,
                title: "Oportunidades de Trabalho",
                description: "Conectamos você com empresas que valorizam jovens talentos",
                path: "/capacitacoes",
                color: "bg-green-500"
              },
              {
                icon: Award,
                title: "Sistema de Gamificação",
                description: "Ganhe pontos, badges e reconhecimento pelo seu progresso",
                path: "/gamificacao",
                color: "bg-purple-500",
                requiresAuth: true
              },
              {
                icon: Users,
                title: "Rede de Contatos",
                description: "Conecte-se com outros jovens e profissionais da sua área",
                path: "/mensagens",
                color: "bg-pink-500",
                requiresAuth: true
              },
              {
                icon: TrendingUp,
                title: "Acompanhamento de Progresso",
                description: "Monitore seu desenvolvimento e conquistas em tempo real",
                path: "/gamificacao",
                color: "bg-indigo-500",
                requiresAuth: true
              },
              {
                icon: Target,
                title: "Metas Personalizadas",
                description: "Defina objetivos e receba orientações para alcançá-los",
                path: "/configuracoes",
                color: "bg-orange-500",
                requiresAuth: true
              }
            ].map((feature, index) => (
              <div 
                key={index}
                onClick={() => handleFeatureClick(feature.path, feature.requiresAuth)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="p-8">
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                    Saiba mais
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Nosso Impacto em Números
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Resultados que comprovam nossa dedicação aos jovens de Recife
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "5.247",
                label: "Jovens Cadastrados",
                icon: Users,
                description: "Perfis ativos na plataforma"
              },
              {
                number: "1.832",
                label: "Capacitações Concluídas",
                icon: BookOpen,
                description: "Cursos finalizados com sucesso"
              },
              {
                number: "934",
                label: "Jovens Empregados",
                icon: Briefcase,
                description: "Colocações no mercado de trabalho"
              },
              {
                number: "267",
                label: "Empresas Parceiras",
                icon: Target,
                description: "Organizações que confiam no Jobin"
              }
            ].map((stat, index) => (
              <div 
                key={index}
                onClick={() => handleStatClick(`${stat.number} ${stat.label}`)}
                className="text-center bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Histórias de Sucesso
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Conheça jovens que transformaram suas vidas através do Jobin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Silva",
                age: "19 anos",
                role: "Desenvolvedora Junior",
                company: "TechRecife",
                image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300",
                quote: "O Jobin me deu a oportunidade que eu precisava. Hoje trabalho como desenvolvedora e estou realizando meu sonho!",
                achievement: "Primeiro emprego na área de tecnologia"
              },
              {
                name: "João Santos",
                age: "22 anos",
                role: "Assistente Administrativo",
                company: "Empresa Local",
                image: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=300",
                quote: "As capacitações me prepararam para o mercado. Consegui meu primeiro emprego formal e estou muito grato!",
                achievement: "85% de aumento na renda familiar"
              },
              {
                name: "Ana Costa",
                age: "20 anos",
                role: "Empreendedora",
                company: "Negócio Próprio",
                image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=300",
                quote: "Aprendi sobre empreendedorismo e hoje tenho meu próprio negócio. O Jobin mudou minha perspectiva de vida!",
                achievement: "Criou 3 empregos na comunidade"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                onClick={() => handleTestimonialClick(testimonial.name)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">{testimonial.age}</p>
                      <p className="text-sm text-purple-600 font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-purple-600" />
                      {testimonial.achievement}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Briefcase className="h-4 w-4 mr-2 text-purple-600" />
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para Transformar sua Vida?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-purple-100">
            Junte-se a milhares de jovens que já estão construindo um futuro melhor em Recife
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => handleFeatureClick('/cadastro')}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Cadastre-se Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <DownloadButton variant="secondary" source="cta" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-3">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Rápido e Fácil</h3>
              <p className="text-sm text-purple-100">Cadastro em menos de 5 minutos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-3">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">100% Gratuito</h3>
              <p className="text-sm text-purple-100">Todas as funcionalidades sem custo</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white/20 rounded-full p-3 mb-3">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-1">Focado em Recife</h3>
              <p className="text-sm text-purple-100">Oportunidades locais e relevantes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  )
}

export default Home
