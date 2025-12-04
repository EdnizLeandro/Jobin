
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {Search, Filter, Clock, Users, Star, ArrowLeft} from 'lucide-react'
import { lumi } from '../lib/lumi'
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
  is_active: boolean
  enrollment_count: number
}

const ExploreCapacitations = () => {
  const navigate = useNavigate()
  const [capacitations, setCapacitations] = useState<Capacitation[]>([])
  const [filteredCapacitations, setFilteredCapacitations] = useState<Capacitation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')

  const categories = [
    'Design Gráfico',
    'Desenvolvimento Web',
    'Marketing Digital',
    'Redação',
    'Fotografia',
    'Consultoria',
    'Educação',
    'Outros'
  ]

  const levels = ['Iniciante', 'Intermediário', 'Avançado']

  const fetchCapacitations = async () => {
    setLoading(true)
    try {
      const { list } = await lumi.entities.capacitations.list({
        filter: { is_active: true },
        sort: { enrollment_count: -1 }
      })
      setCapacitations(list || [])
      setFilteredCapacitations(list || [])
    } catch (error) {
      console.error('Erro ao buscar capacitações:', error)
      toast.error('Erro ao carregar capacitações')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterCapacitations(term, selectedCategory, selectedLevel)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterCapacitations(searchTerm, category, selectedLevel)
  }

  const handleLevelFilter = (level: string) => {
    setSelectedLevel(level)
    filterCapacitations(searchTerm, selectedCategory, level)
  }

  const filterCapacitations = (search: string, category: string, level: string) => {
    let filtered = [...capacitations]

    if (search && search.trim()) {
      const searchLower = search.toLowerCase().trim()
      filtered = filtered.filter(cap =>
        cap.title?.toLowerCase().includes(searchLower) ||
        cap.description?.toLowerCase().includes(searchLower) ||
        cap.instructor?.toLowerCase().includes(searchLower) ||
        cap.category?.toLowerCase().includes(searchLower)
      )
    }

    if (category && category.trim()) {
      filtered = filtered.filter(cap => cap.category === category)
    }

    if (level && level.trim()) {
      filtered = filtered.filter(cap => cap.level === level)
    }

    setFilteredCapacitations(filtered)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedLevel('')
    setFilteredCapacitations(capacitations)
  }

  const handleEnroll = async (capacitationId: string, title: string) => {
    try {
      // Verifica se o usuário está autenticado
      if (!lumi.auth.isAuthenticated) {
        toast.error('Você precisa fazer login para se inscrever')
        navigate('/login')
        return
      }

      // Implementa lógica real de inscrição
      const enrollment = await lumi.entities.capacitations.update(capacitationId, {
        enrollment_count: capacitations.find(c => c._id === capacitationId)!.enrollment_count + 1
      })

      toast.success(`Inscrição realizada com sucesso em: ${title}!`)
      
      // Atualiza a lista de capacitações
      await fetchCapacitations()
      
      // Navega para "Minhas Capacitações"
      setTimeout(() => {
        navigate('/my-capacitations')
      }, 1500)
    } catch (error) {
      console.error('Erro ao realizar inscrição:', error)
      toast.error('Erro ao realizar inscrição. Tente novamente.')
    }
  }

  useEffect(() => {
    fetchCapacitations()
  }, [])

  useEffect(() => {
    filterCapacitations(searchTerm, selectedCategory, selectedLevel)
  }, [capacitations])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-2xl font-bold text-gray-900">Explorar Capacitações</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros e Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Busca */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar capacitações..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtro por Categoria */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Filtro por Nível */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => handleLevelFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Todos os níveis</option>
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botão Limpar Filtros */}
          {(searchTerm || selectedCategory || selectedLevel) && (
            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpar filtros
              </button>
            </div>
          )}
        </motion.div>

        {/* Resultados */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCapacitations.length} capacitação(ões) encontrada(s)
          </p>
        </div>

        {/* Lista de Capacitações */}
        {filteredCapacitations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhuma capacitação encontrada</p>
            <p className="text-gray-400 mt-2">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCapacitations.map((capacitation, index) => (
              <motion.div
                key={capacitation._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={capacitation.image_url}
                  alt={capacitation.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      capacitation.level === 'Iniciante' 
                        ? 'bg-green-100 text-green-800'
                        : capacitation.level === 'Intermediário'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {capacitation.level}
                    </span>
                    <span className="text-sm text-gray-500">{capacitation.category}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {capacitation.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {capacitation.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {capacitation.duration}h
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {capacitation.enrollment_count} inscritos
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Instrutor:</span> {capacitation.instructor}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEnroll(capacitation._id, capacitation.title)}
                    className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    Inscrever-se
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExploreCapacitations
