
import React from 'react'
import { motion } from 'framer-motion'
import {Target, Heart, Users, Lightbulb} from 'lucide-react'

const About = () => {
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
              Sobre o Jobin
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Conheça a história por trás do projeto que está transformando vidas na Região Metropolitana do Recife
            </p>
          </motion.div>
        </div>
      </section>

      {/* História e Propósito */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                O Jobin nasceu de um desafio estratégico: como podemos usar a tecnologia para promover a inclusão social e apoiar jovens em situação de vulnerabilidade a encontrarem oportunidades de trabalho e capacitação?
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Desenvolvido com base na metodologia de Design Centrado no Humano (HCD), nosso aplicativo coloca as necessidades reais dos jovens da RMR no centro de cada decisão de design e funcionalidade.
              </p>
              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
                <p className="text-purple-800 italic font-medium">
                  "A tecnologia deve servir às pessoas, especialmente àquelas que mais precisam de oportunidades para crescer e prosperar."
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Equipe trabalhando"
                className="rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Design Centrado no Humano */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Design Centrado no Humano
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Nossa abordagem HCD garante que cada funcionalidade seja desenvolvida pensando nas necessidades reais dos usuários
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Empatia</h3>
              <p className="text-gray-600">
                Compreendemos profundamente as necessidades dos jovens da RMR
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Definição</h3>
              <p className="text-gray-600">
                Identificamos os principais desafios e oportunidades
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Ideação</h3>
              <p className="text-gray-600">
                Criamos soluções inovadoras e acessíveis
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Teste</h3>
              <p className="text-gray-600">
                Validamos constantemente com nossos usuários
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Missão e Valores */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-600 to-purple-400 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Missão</h3>
                <p className="text-purple-100">
                  Democratizar o acesso a oportunidades de trabalho e capacitação para jovens da RMR, promovendo inclusão social e desenvolvimento econômico local.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-500 to-purple-300 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Visão</h3>
                <p className="text-purple-100">
                  Ser a principal plataforma de conexão entre jovens talentos e oportunidades de trabalho no Nordeste brasileiro.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-400 to-purple-200 text-white p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-4">Valores</h3>
                <p className="text-purple-100">
                  Inclusão, acessibilidade, empoderamento, inovação social e desenvolvimento sustentável.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Citação Inspiradora */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <blockquote className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              "A inclusão social não é apenas sobre dar oportunidades, é sobre criar um ecossistema onde todos os talentos podem florescer."
            </blockquote>
            <p className="text-lg text-purple-600 font-medium">
              - Equipe Jobin
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
