
import React from 'react'
import { motion } from 'framer-motion'
import {Download, UserPlus, Search, Users, CheckCircle, ArrowRight} from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: Download,
      title: 'Baixe o App',
      description: 'Faça o download gratuito do Jobin na Google Play ou App Store',
      details: 'Disponível para Android e iOS, o app é leve e funciona em qualquer dispositivo'
    },
    {
      icon: UserPlus,
      title: 'Crie seu Perfil',
      description: 'Cadastre-se e monte seu perfil profissional completo',
      details: 'Adicione suas habilidades, experiências e objetivos profissionais'
    },
    {
      icon: Search,
      title: 'Explore Oportunidades',
      description: 'Busque cursos gratuitos e oportunidades de trabalho',
      details: 'Use filtros para encontrar exatamente o que você precisa'
    },
    {
      icon: Users,
      title: 'Conecte-se',
      description: 'Interaja com contratantes, mentores e outros jovens',
      details: 'Construa sua rede profissional e aprenda com outros usuários'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Como Funciona o Jobin
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Em apenas 4 passos simples, você estará conectado a um mundo de oportunidades
            </p>
          </motion.div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Passo a Passo
            </h2>
            <p className="text-xl text-gray-600">
              Veja como é fácil começar sua jornada no Jobin
            </p>
          </div>

          <div className="relative">
            {/* Linha conectora */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-purple-200 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative bg-white p-8 rounded-xl shadow-lg text-center"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-purple-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-sm font-bold text-purple-600 mb-2">PASSO {index + 1}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <p className="text-sm text-gray-500">{step.details}</p>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-purple-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jornada do Usuário */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sua Jornada no Jobin
            </h2>
            <p className="text-xl text-gray-600">
              Acompanhe como será sua experiência desde o primeiro acesso
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Primeira Semana</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Cadastro e Perfil</h4>
                    <p className="text-gray-600">Complete seu perfil e descubra as funcionalidades</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Primeiro Curso</h4>
                    <p className="text-gray-600">Inicie sua primeira trilha de capacitação</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Explore Oportunidades</h4>
                    <p className="text-gray-600">Navegue pelas vagas disponíveis na sua região</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Jovem usando smartphone"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Jovens trabalhando em equipe"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Primeiro Mês</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Networking</h4>
                    <p className="text-gray-600">Conecte-se com outros jovens e profissionais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Primeiros Trabalhos</h4>
                    <p className="text-gray-600">Candidate-se às suas primeiras oportunidades</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Desenvolvimento</h4>
                    <p className="text-gray-600">Continue aprendendo e desenvolvendo novas habilidades</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infográfico Interativo */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ecossistema Jobin
            </h2>
            <p className="text-xl text-gray-600">
              Veja como todos os elementos se conectam para criar oportunidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Capacitação</h3>
              <p className="text-gray-600">
                Cursos e trilhas de aprendizado para desenvolver habilidades técnicas e comportamentais
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conexão</h3>
              <p className="text-gray-600">
                Plataforma que conecta jovens talentos com empresas e oportunidades de trabalho
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Geração de Renda</h3>
              <p className="text-gray-600">
                Oportunidades reais de trabalho autônomo e freelance para gerar renda local
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Baixe o Jobin agora e dê o primeiro passo rumo ao seu futuro profissional
          </p>
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
            Baixar App Gratuito
          </button>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
