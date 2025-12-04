import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {BarChart3, TrendingUp, Target, PieChart, Calendar, Filter, Maximize2, Minimize2, RefreshCw, Download, Share2, Eye, EyeOff, Lock, AlertCircle, Info, FileText, Users, Briefcase, ExternalLink, Activity, LineChart} from 'lucide-react'
import toast from 'react-hot-toast'

interface ReportView {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: 'mercado'
  url: string
}

const Analytics: React.FC = () => {
  const { user, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [selectedReport, setSelectedReport] = useState<string>('analise-mercado')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // URL do Novo CAGED - Analytics de Mercado
  const NOVO_CAGED_URL = 'https://mercado-e5n3wlbybyt4h4jknnf3p8.streamlit.app/'

  // Apenas 1 relatório funcional
  const reportViews: ReportView[] = [
    {
      id: 'analise-mercado',
      name: 'Análise de Mercado - Novo CAGED',
      description: 'Análise completa do mercado de trabalho, tendências e oportunidades para jovens em Recife baseada nos dados do Novo CAGED',
      icon: TrendingUp,
      category: 'mercado',
      url: NOVO_CAGED_URL
    }
  ]

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast.error('Você precisa estar logado para acessar os relatórios')
      navigate('/login')
      return
    }

    if (isAuthenticated) {
      // Simular carregamento dos relatórios
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, loading, navigate])

  const handleReportChange = (reportId: string) => {
    setSelectedReport(reportId)
    setIsLoading(true)
    
    // Simular carregamento do novo relatório
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Relatório carregado com sucesso')
    }, 1500)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    toast.info(isFullscreen ? 'Modo normal ativado' : 'Modo tela cheia ativado')
  }

  const refreshReport = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Relatório atualizado')
    }, 1000)
  }

  const shareReport = () => {
    const currentReport = reportViews.find(r => r.id === selectedReport)
    if (currentReport) {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link do relatório copiado para a área de transferência')
    }
  }

  const exportReport = () => {
    toast.loading('Preparando exportação...', { duration: 2000 })
    setTimeout(() => {
      toast.success('Relatório exportado com sucesso')
    }, 2000)
  }

  const currentReport = reportViews.find(r => r.id === selectedReport)

  // Tela de loading durante verificação de autenticação
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    )
  }

  // Tela de acesso negado para usuários não logados
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">
            Você precisa estar logado para acessar os relatórios e análises da plataforma.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fazer Login
            </button>
            <button
              onClick={() => navigate('/cadastro')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}`}>
      {/* Header Moderno */}
      <div className={`${isFullscreen ? 'bg-gray-800' : 'bg-white'} shadow-lg border-b ${isFullscreen ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BarChart3 className={`h-6 w-6 ${isFullscreen ? 'text-white' : 'text-white'}`} />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${isFullscreen ? 'text-white' : 'text-gray-900'}`}>Analytics & Performance</h1>
                <p className={`text-xs ${isFullscreen ? 'text-gray-400' : 'text-gray-500'}`}>Novo CAGED - Mercado de Trabalho RMR</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`hidden md:block text-sm ${isFullscreen ? 'text-gray-300' : 'text-gray-600'}`}>
                {user?.name || user?.email}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={refreshReport}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isFullscreen 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Atualizar relatório"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button
                  onClick={shareReport}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isFullscreen 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Compartilhar"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <a
                  href={NOVO_CAGED_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isFullscreen 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  title="Abrir em nova aba"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={toggleFullscreen}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isFullscreen 
                      ? 'text-white bg-blue-600 hover:bg-blue-700' 
                      : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  }`}
                  title={isFullscreen ? "Sair da tela cheia" : "Tela cheia"}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isFullscreen ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'}`}>
        {!isFullscreen && (
          <>
            {/* Hero Section com Cards de Estatísticas */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <Activity className="h-6 w-6 text-blue-200" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Análise em Tempo Real</h3>
                <p className="text-blue-100 text-sm">Dados atualizados do mercado de trabalho</p>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Briefcase className="h-8 w-8" />
                  </div>
                  <LineChart className="h-6 w-6 text-purple-200" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Oportunidades</h3>
                <p className="text-purple-100 text-sm">Mapeamento de vagas na RMR</p>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Target className="h-8 w-8" />
                  </div>
                  <Users className="h-6 w-6 text-indigo-200" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Insights</h3>
                <p className="text-indigo-100 text-sm">Tendências e setores em crescimento</p>
              </div>
            </div>

            {/* Painel de Informações Modernizado */}
            <div className="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <FileText className="h-10 w-10" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-1">Novo CAGED</h2>
                      <p className="text-blue-100 text-xs sm:text-sm">Cadastro Geral de Empregados e Desempregados - Recife</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <div>
                        <p className="text-xs text-blue-100">Última atualização</p>
                        <p className="text-sm font-semibold">{new Date().toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <a
                      href={NOVO_CAGED_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Abrir Dashboard</span>
                      <span className="sm:hidden">Abrir</span>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Info className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Sobre esta Análise</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Dashboard interativo com dados do Novo CAGED apresentando análise completa do mercado de trabalho 
                      formal em Recife. Explore tendências, setores em crescimento e oportunidades para jovens profissionais.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>Visualizações interativas</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span>Dados em tempo real</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                        <span>Filtros personalizados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Área do Dashboard Streamlit com Design Moderno */}
        <div className={`${isFullscreen ? 'h-screen' : 'rounded-2xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-blue-500 via-purple-500 to-indigo-500'}`}>
          <div className={`relative ${isFullscreen ? 'h-full' : 'h-[calc(100vh-250px)] min-h-[800px]'} bg-white`}>
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
                    <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-400 opacity-20 mx-auto"></div>
                  </div>
                  <p className="mt-6 text-lg font-semibold text-gray-900">Carregando Dashboard</p>
                  <p className="text-sm text-gray-600 mt-2">Preparando análise de mercado...</p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full relative">
                {/* Borda decorativa animada */}
                {!isFullscreen && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-20 animate-pulse"></div>
                )}
                {currentReport ? (
                  <iframe
                    src={currentReport.url}
                    className="relative w-full h-full border-0"
                    allowFullScreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="Dashboard Novo CAGED - Análise de Mercado RMR"
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                      setIsLoading(false)
                      toast.error('Erro ao carregar o dashboard')
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">Preparando análise...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Guia de Uso Melhorado */}
        {!isFullscreen && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Info className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Como Usar o Dashboard</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-gray-900">Explore os Dados</p>
                        <p className="text-sm text-gray-600">Navegue pelas visualizações interativas do Streamlit</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-gray-900">Use Filtros</p>
                        <p className="text-sm text-gray-600">Personalize a análise por setor, período e região</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-gray-900">Tela Cheia</p>
                        <p className="text-sm text-gray-600">Maximize para melhor visualização dos gráficos</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <p className="font-medium text-gray-900">Compartilhe</p>
                        <p className="text-sm text-gray-600">Exporte insights e compartilhe com sua rede</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Analytics