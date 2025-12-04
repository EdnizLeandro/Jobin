
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {Github, Linkedin, Mail, Award, Users, Building} from 'lucide-react'

const Team = () => {
  const navigate = useNavigate()

  const teamMembers = [
    {
      name: 'Dr. Ana Carolina Silva',
      role: 'Coordenadora do Projeto',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Doutora em Ciência da Computação com foco em HCD e inclusão digital',
      linkedin: 'https://www.linkedin.com/in/anacarolinasilva',
      email: 'ana.silva@ufrpe.br'
    },
    {
      name: 'João Pedro Santos',
      role: 'Desenvolvedor Full-Stack',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Especialista em React Native e desenvolvimento mobile acessível',
      github: 'https://github.com/joaopedrosantos',
      linkedin: 'https://www.linkedin.com/in/joaopedrosantos',
      email: 'joao.santos@jobin.app'
    },
    {
      name: 'Maria Fernanda Costa',
      role: 'UX/UI Designer',
      image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Designer especializada em interfaces inclusivas e acessibilidade',
      linkedin: 'https://www.linkedin.com/in/mariafernandacosta',
      email: 'maria.costa@jobin.app'
    },
    {
      name: 'Carlos Eduardo Lima',
      role: 'Analista de Dados',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Especialista em análise de impacto social e métricas de engajamento',
      github: 'https://github.com/carloseduardolima',
      linkedin: 'https://www.linkedin.com/in/carloseduardolima',
      email: 'carlos.lima@jobin.app'
    }
  ]

  const partners = [
    {
      name: 'UFRPE',
      description: 'Universidade Federal Rural de Pernambuco',
      logo: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=200',
      type: 'Instituição de Ensino'
    },
    {
      name: 'SEBRAE PE',
      description: 'Serviço Brasileiro de Apoio às Micro e Pequenas Empresas',
      logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
      type: 'Apoio Empresarial'
    },
    {
      name: 'Porto Digital',
      description: 'Parque Tecnológico de Pernambuco',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
      type: 'Ecossistema de Inovação'
    },
    {
      name: 'Prefeitura do Recife',
      description: 'Secretaria de Desenvolvimento Econômico',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200',
      type: 'Poder Público'
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
              Nossa Equipe
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Conheça as pessoas e organizações que tornam o Jobin possível
            </p>
          </motion.div>
        </div>
      </section>

      {/* Equipe de Desenvolvimento */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Equipe de Desenvolvimento
            </h2>
            <p className="text-xl text-gray-600">
              Profissionais dedicados à criação de soluções inclusivas e inovadoras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-purple-600 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-purple-600 transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missão da Equipe */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Diversidade</h3>
              <p className="text-gray-600">
                Nossa equipe multidisciplinar combina expertise técnica com conhecimento social para criar soluções verdadeiramente inclusivas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excelência</h3>
              <p className="text-gray-600">
                Comprometidos com os mais altos padrões de qualidade em desenvolvimento, design e impacto social.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inovação</h3>
              <p className="text-gray-600">
                Utilizamos as mais modernas tecnologias e metodologias para criar soluções que realmente fazem a diferença.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parceiros e Apoiadores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Parceiros e Apoiadores
            </h2>
            <p className="text-xl text-gray-600">
              Organizações que acreditam no poder transformador da tecnologia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{partner.description}</p>
                <span className="inline-block bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full">
                  {partner.type}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reconhecimentos */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Reconhecimentos
            </h2>
            <p className="text-xl text-gray-600">
              Prêmios e reconhecimentos que recebemos pela nossa contribuição social
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prêmio Inovação Social</h3>
              <p className="text-gray-600">
                Reconhecimento pela contribuição ao desenvolvimento social através da tecnologia
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Destaque em Acessibilidade</h3>
              <p className="text-gray-600">
                Premiação por excelência em design inclusivo e acessibilidade digital
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Impacto Comunitário</h3>
              <p className="text-gray-600">
                Reconhecimento pelo impacto positivo na comunidade da RMR
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Contato */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Quer fazer parte da nossa equipe?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Estamos sempre em busca de pessoas talentosas e comprometidas com nossa missão
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
          >
            Entre em Contato
          </button>
        </div>
      </section>
    </div>
  )
}

export default Team
