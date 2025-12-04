
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, BookOpen, Clock, Award, Play, CheckCircle, BarChart3, Download, Calendar, Star, Filter, Search} from 'lucide-react'
import { lumi } from '../lib/lumi'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Capacitation {
  _id: string
  title: string
  description: string
  category: string
  level: string
  duration: number
  instructor: string
  image_url: string
  progress: number
  status: 'not_started' | 'in_progress' | 'completed'
  enrolled_date: string
  completion_date?: string
  certificate_url?: string
  lessons_completed: number
  total_lessons: number
  rating?: number
}

const MyCapacitations = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [capacitations, setCapacitations] = useState<Capacitation[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'all' | 'in_progress' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const categories = ['Todos', 'Design Gráfico', 'Desenvolvimento Web', 'Marketing Digital', 'Redação', 'Fotografia', 'Consultoria', 'Educação']

  // Dados mockados para demonstração
  useEffect(() => {
    const mockCapacitations: Capacitation[] = [
      {
        _id: '1',
        title: 'Fundamentos do Design Gráfico',
        description: 'Aprenda os princípios básicos do design gráfico e ferramentas essenciais.',
        category: 'Design Gráfico',
        level: 'Iniciante',
        duration: 40,
        instructor: 'Carlos Silva',
        image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        progress: 75,
        status: 'in_progress',
        enrolled_date: '2024-01-15',
        lessons_completed: 15,
        total_lessons: 20,
        rating: 4.8
      },
      {
        _id: '2',
        title: 'React.js Completo',
        description: 'Domine o React.js do básico ao avançado com projetos práticos.',
        category: 'Desenvolvimento Web',
        level: 'Intermediário',
        duration: 60,
        instructor: 'Ana Costa',
        image_url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        progress: 100,
        status: 'completed',
        enrolled_date: '2023-12-01',
        completion_date: '2024-01-20',
        certificate_url: '/certificates/react-complete.pdf',
        lessons_completed: 25,
        total_lessons: 25,
        rating: 5.0
      },
      {
        _id: '3',
        title: 'Marketing Digital para Iniciantes',
        description: 'Estratégias essenciais de marketing digital e redes sociais.',
        category: 'Marketing Digital',
        level: 'Iniciante',
        duration: 30,
        instructor: 'Roberto Lima',
        image_url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
        progress: 0,
        status: 'not_started',
        enrolled_date: '2024-01-25',
        lessons_completed: 0,
        total_lessons: 12
      }
    ]
    
    setCapacitations(mockCapacitations)
    setLoading(false)
  }, [])

  const filteredCapacitations = capacitations.filter(cap => {
    const matchesTab = selectedTab === 'all' || cap.status === selectedTab
    const matchesSearch = cap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cap.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Todos' || cap.category === selectedCategory
    
    return matchesTab && matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'not_started':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído'
      case 'in_progress':
        return 'Em Progresso'
      case 'not_started':
        return 'Não Iniciado'
      default:
        return 'Desconhecido'
    }
  }

  const handleContinueCourse = (capacitationId: string) => {
    toast.success('Abrindo curso...')
    // Aqui implementaria a navegação para a página do curso
  }

  const handleDownloadCertificate = (certificateUrl: string) => {
    toast.success('Baixando certificado...')
    // Aqui implementaria o download do certificado
  }

  const totalProgress = capacitations.reduce((acc, cap) => acc + cap.progress, 0) / capacitations.length
  const completedCount = capacitations.filter(cap => cap.status === 'completed').length
  const inProgressCount = capacitations.filter(cap => cap.status === 'in_progress').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Minhas Capacitações</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{capacitations.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Progresso</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Progresso Médio</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(totalProgress)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {[
              { key: 'all', label: 'Todos' },
              { key: 'in_progress', label: 'Em Progresso' },
              { key: 'completed', label: 'Concluídos' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTab === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar capacitações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Categoria */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'Todos' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">
                {filteredCapacitations.length} capacitação(ões) encontrada(s)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Lista de Capacitações */}
        {filteredCapacitations.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma capacitação encontrada</p>
            <button
              onClick={() => navigate('/explorar-capacitacoes')}
              className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explorar Capacitações
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCapacitations.map((capacitation, index) => (
              <motion.div
                key={capacitation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-6">
                    <img
                      src={capacitation.image_url}
                      alt={capacitation.title}
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {capacitation.title}
                          </h3>
                          <p className="text-gray-600 mb-3">{capacitation.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {capacitation.duration}h
                            </span>
                            <span>{capacitation.instructor}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(capacitation.status)}`}>
                              {getStatusText(capacitation.status)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {capacitation.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{capacitation.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Barra de Progresso */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progresso</span>
                          <span className="text-sm font-medium text-gray-900">
                            {capacitation.lessons_completed}/{capacitation.total_lessons} aulas ({capacitation.progress}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${capacitation.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Ações */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Inscrito em: {new Date(capacitation.enrolled_date).toLocaleDateString('pt-BR')}
                          </span>
                          {capacitation.completion_date && (
                            <>
                              <span>•</span>
                              <span>
                                Concluído em: {new Date(capacitation.completion_date).toLocaleDateString('pt-BR')}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {capacitation.status === 'completed' && capacitation.certificate_url && (
                            <button
                              onClick={() => handleDownloadCertificate(capacitation.certificate_url!)}
                              className="flex items-center text-green-600 hover:text-green-700 font-medium"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Certificado
                            </button>
                          )}

                          {capacitation.status !== 'completed' && (
                            <button
                              onClick={() => handleContinueCourse(capacitation._id)}
                              className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {capacitation.status === 'not_started' ? 'Iniciar' : 'Continuar'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCapacitations
