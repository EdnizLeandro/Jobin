
import React from 'react'
import { motion } from 'framer-motion'
import {TrendingUp, Users, MapPin, Award, Building, Handshake, Target, Heart} from 'lucide-react'

const Impact = () => {
  const impactStats = [
    {
      icon: Users,
      number: '1,500+',
      label: 'Jovens Impactados',
      description: 'Jovens que já utilizaram a plataforma para capacitação e busca de oportunidades'
    },
    {
      icon: Award,
      number: '300+',
      label: 'Certificações Emitidas',
      description: 'Certificados de conclusão de cursos e capacitações realizadas'
    },
    {
      icon: Building,
      number: '50+',
      label: 'Empresas Parceiras',
      description: 'Empresas que oferecem oportunidades através da plataforma'
    },
    {
      icon: MapPin,
      number: '15',
      label: 'Cidades da RMR',
      description: 'Municípios da Região Metropolitana do Recife atendidos'
    }
  ]

  const projections = [
    {
      year: '2024',
      target: '5.000 jovens capacitados',
      description: 'Meta de alcance para o primeiro ano completo'
    },
    {
      year: '2025',
      target: '15.000 jovens conectados',
      description: 'Expansão para toda a RMR e interior de PE'
    },
    {
      year: '2026',
      target: '50.000 oportunidades criadas',
      description: 'Consolidação como principal plataforma do Nordeste'
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
              Impacto Social do Jobin
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Transformando vidas e comunidades através da tecnologia e inclusão social
            </p>
          </motion.div>
        </div>
      </section>

      {/* Missão Social */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Promovendo Inclusão e Oportunidades
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                O Jobin vai além de ser apenas um aplicativo. É uma ferramenta de transformação social que democratiza o acesso a oportunidades de trabalho e capacitação para jovens em situação de vulnerabilidade na RMR.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nossa missão é quebrar barreiras socioeconômicas e criar um ecossistema onde o talento e a dedicação sejam os únicos pré-requisitos para o sucesso profissional.
              </p>
              <div className="flex items-center bg-purple-50 p-6 rounded-lg">
                <Heart className="h-8 w-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Impacto Direto</h3>
                  <p className="text-gray-600">Cada jovem conectado representa uma família com melhores perspectivas de futuro</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Jovens em capacitação"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estatísticas de Impacto */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos Números
            </h2>
            <p className="text-xl text-gray-600">
              Dados reais do impacto que estamos gerando na comunidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">{stat.label}</h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projeções Futuras */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Metas e Projeções
            </h2>
            <p className="text-xl text-gray-600">
              Nossos objetivos para os próximos anos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projections.map((projection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-purple-600 to-purple-400 text-white p-8 rounded-xl">
                  <div className="text-4xl font-bold mb-2">{projection.year}</div>
                  <h3 className="text-xl font-bold mb-4">{projection.target}</h3>
                  <p className="text-purple-100">{projection.description}</p>
                </div>
                {index < projections.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Histórias de Sucesso */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Histórias de Transformação
            </h2>
            <p className="text-xl text-gray-600">
              Conheça jovens que mudaram suas vidas com o Jobin
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Carla Mendes"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Carla Mendes</h3>
                  <p className="text-gray-600">21 anos, Recife</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Estava desempregada há 8 meses quando descobri o Jobin. Fiz o curso de marketing digital e em 2 semanas já estava trabalhando como freelancer. Hoje tenho minha própria agência!"
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-800 font-semibold">Resultado: R$ 3.500/mês de renda própria</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Rafael Silva"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Rafael Silva</h3>
                  <p className="text-gray-600">19 anos, Olinda</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "O Jobin me ajudou a descobrir meu talento para programação. Comecei do zero e hoje trabalho em uma startup. O app mudou completamente minha perspectiva de futuro."
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-800 font-semibold">Resultado: Contratado como desenvolvedor júnior</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chamada para Parceiros */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Seja um Parceiro do Impacto
            </h2>
            <p className="text-xl text-gray-600">
              Empresas e organizações que querem fazer a diferença
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-600 to-purple-400 text-white p-8 rounded-xl"
            >
              <Handshake className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Para Empresas</h3>
              <p className="text-purple-100 mb-6">
                Conecte-se com jovens talentos da RMR e contribua para o desenvolvimento da nossa região
              </p>
              <ul className="space-y-2 text-purple-100">
                <li>• Acesso a talentos qualificados</li>
                <li>• Responsabilidade social corporativa</li>
                <li>• Impacto positivo na comunidade</li>
                <li>• Parceria estratégica</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-300 text-white p-8 rounded-xl"
            >
              <Target className="h-12 w-12 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Para Organizações</h3>
              <p className="text-purple-100 mb-6">
                ONGs, instituições de ensino e órgãos públicos podem amplificar nosso impacto
              </p>
              <ul className="space-y-2 text-purple-100">
                <li>• Parcerias institucionais</li>
                <li>• Programas de capacitação</li>
                <li>• Multiplicação do impacto</li>
                <li>• Transformação social</li>
              </ul>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Quero ser Parceiro
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Impact
