
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Mail, Phone, MapPin, Send, MessageCircleDashed as MessageCircle, Instagram, Linkedin, Facebook} from 'lucide-react'
import { useContactForm } from '../hooks/useContactForm'
import { sanitizeInput, validateEmail } from '../utils/security'
import toast from 'react-hot-toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const { submitContact, loading } = useContactForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    // Validação de e-mail
    if (!validateEmail(formData.email)) {
      toast.error('E-mail inválido')
      return
    }

    // Sanitiza dados antes de enviar
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    }

    const success = await submitContact(sanitizedData)
    if (success) {
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

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
              Entre em Contato
            </h1>
            <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto">
              Estamos aqui para ajudar. Fale conosco sobre parcerias, dúvidas ou sugestões
            </p>
          </motion.div>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Seu nome completo"
                    required
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="seu.email@exemplo.com"
                    required
                    autoComplete="email"
                    maxLength={254}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="parceria">Parceria Empresarial</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="feedback">Feedback/Sugestão</option>
                    <option value="imprensa">Imprensa</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Escreva sua mensagem aqui..."
                    required
                    maxLength={2000}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-400 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">E-mail</h3>
                      <p className="text-gray-600">contato@jobin.app</p>
                      <p className="text-gray-600">parcerias@jobin.app</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Telefone</h3>
                      <p className="text-gray-600">(81) 9999-9999</p>
                      <p className="text-gray-600">WhatsApp Business</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Endereço</h3>
                      <p className="text-gray-600">
                        Universidade Federal Rural de Pernambuco<br />
                        Departamento de Computação<br />
                        Recife - PE, Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Siga-nos nas Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-purple-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-purple-600" />
                  </a>
                  <a
                    href="#"
                    className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <Facebook className="h-6 w-6 text-purple-600" />
                  </a>
                  <a
                    href="https://wa.me/5581999999999"
                    className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </a>
                </div>
              </div>

              {/* Horário de Atendimento */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Horário de Atendimento</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Segunda a Sexta:</strong> 8h às 18h</p>
                  <p><strong>Sábado:</strong> 9h às 13h</p>
                  <p><strong>Domingo:</strong> Fechado</p>
                </div>
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    💡 Para suporte urgente, utilize nosso WhatsApp Business
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Rápido */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-gray-600">
              Respostas rápidas para as dúvidas mais comuns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Como posso baixar o aplicativo?
              </h3>
              <p className="text-gray-600">
                O Jobin estará disponível gratuitamente na Google Play e App Store. Cadastre-se em nosso site para receber notificações sobre o lançamento.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Minha empresa pode ser parceira?
              </h3>
              <p className="text-gray-600">
                Sim! Empresas interessadas em oferecer oportunidades para jovens da RMR podem entrar em contato conosco através do e-mail parcerias@jobin.app.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Os cursos são realmente gratuitos?
              </h3>
              <p className="text-gray-600">
                Sim, todos os cursos e capacitações oferecidos através do Jobin são completamente gratuitos para os jovens usuários.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Como funciona a acessibilidade?
              </h3>
              <p className="text-gray-600">
                O Jobin foi desenvolvido seguindo padrões de acessibilidade, incluindo comandos de voz, navegação por teclado e compatibilidade com leitores de tela.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-400">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Vamos transformar vidas juntos?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Entre em contato e descubra como você pode fazer parte desta transformação social
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contato@jobin.app"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105"
            >
              Enviar E-mail
            </a>
            <a
              href="https://wa.me/5581999999999"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
