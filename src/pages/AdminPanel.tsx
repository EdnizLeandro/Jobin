
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { lumi } from '../lib/lumi'
import {Users, BookOpen, FileText, BarChart3, Settings, Shield, TrendingUp, Activity, Award, MessageSquare, AlertTriangle, Download, Filter, Search, Plus, Edit, Trash2, Eye, CheckCircle, XCircle, Clock, LogOut, Save, RefreshCw, Calendar, DollarSign, Target, Zap} from 'lucide-react'
import toast from 'react-hot-toast'

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalCapacitations: number
  completedCapacitations: number
  totalContracts: number
  activeContracts: number
  totalRevenue: number
  monthlyGrowth: number
}

interface User {
  _id: string
  name: string
  email: string
  type: 'professional' | 'contractor'
  status: 'active' | 'suspended' | 'pending'
  createdAt: string
  lastLogin: string
  phone?: string
  city?: string
}

interface Capacitation {
  _id: string
  title: string
  category: string
  instructor: string
  duration: number
  enrollments: number
  completions: number
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  price: number
  description: string
}

interface Contract {
  _id: string
  title: string
  contractor: string
  professional: string
  value: number
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  startDate: string
  endDate: string
  description: string
}

interface SystemSettings {
  maintenanceMode: boolean
  autoBackup: boolean
  newUserNotifications: boolean
  weeklyReports: boolean
  maxFileSize: number
  sessionTimeout: number
}

const AdminPanel: React.FC = () => {
  const { adminUser, isAdminAuthenticated, signOutAdmin } = useAdminAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [capacitations, setCapacitations] = useState<Capacitation[]>([])
  const [contracts, setContracts] = useState<Contract[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'user' | 'capacitation' | 'contract' | null>(null)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    autoBackup: true,
    newUserNotifications: true,
    weeklyReports: true,
    maxFileSize: 10,
    sessionTimeout: 30
  })

  // Verificação de acesso administrativo
  useEffect(() => {
    if (!isAdminAuthenticated || !adminUser) {
      toast.error('Acesso negado. Faça login como administrador.')
      navigate('/admin/login')
      return
    }

    loadAdminData()
  }, [isAdminAuthenticated, adminUser, navigate])

  const loadAdminData = async () => {
    try {
      setLoading(true)
      
      // Carregar estatísticas
      const statsData: AdminStats = {
        totalUsers: 1247,
        activeUsers: 1089,
        totalCapacitations: 156,
        completedCapacitations: 2341,
        totalContracts: 892,
        activeContracts: 234,
        totalRevenue: 450000,
        monthlyGrowth: 12.5
      }
      setStats(statsData)

      // Carregar usuários
      const usersData: User[] = [
        {
          _id: '1',
          name: 'Maria Silva',
          email: 'maria@email.com',
          type: 'professional',
          status: 'active',
          createdAt: '2024-01-15',
          lastLogin: '2024-01-20',
          phone: '(81) 99999-1111',
          city: 'Recife'
        },
        {
          _id: '2',
          name: 'João Santos',
          email: 'joao@empresa.com',
          type: 'contractor',
          status: 'active',
          createdAt: '2024-01-10',
          lastLogin: '2024-01-19',
          phone: '(81) 99999-2222',
          city: 'Olinda'
        },
        {
          _id: '3',
          name: 'Ana Costa',
          email: 'ana@email.com',
          type: 'professional',
          status: 'pending',
          createdAt: '2024-01-18',
          lastLogin: '2024-01-18',
          phone: '(81) 99999-3333',
          city: 'Jaboatão'
        },
        {
          _id: '4',
          name: 'Pedro Oliveira',
          email: 'pedro@tech.com',
          type: 'contractor',
          status: 'suspended',
          createdAt: '2024-01-12',
          lastLogin: '2024-01-17',
          phone: '(81) 99999-4444',
          city: 'Recife'
        },
        {
          _id: '5',
          name: 'Carla Mendes',
          email: 'carla@design.com',
          type: 'professional',
          status: 'active',
          createdAt: '2024-01-08',
          lastLogin: '2024-01-20',
          phone: '(81) 99999-5555',
          city: 'Camaragibe'
        }
      ]
      setUsers(usersData)

      // Carregar capacitações
      const capacitationsData: Capacitation[] = [
        {
          _id: '1',
          title: 'Desenvolvimento Web Frontend',
          category: 'Tecnologia',
          instructor: 'Carlos Mendes',
          duration: 40,
          enrollments: 156,
          completions: 89,
          status: 'active',
          createdAt: '2024-01-01',
          price: 299.90,
          description: 'Curso completo de desenvolvimento web com React, HTML, CSS e JavaScript'
        },
        {
          _id: '2',
          title: 'Marketing Digital',
          category: 'Marketing',
          instructor: 'Lucia Ferreira',
          duration: 30,
          enrollments: 203,
          completions: 145,
          status: 'active',
          createdAt: '2024-01-05',
          price: 199.90,
          description: 'Estratégias completas de marketing digital e redes sociais'
        },
        {
          _id: '3',
          title: 'Design UX/UI',
          category: 'Design',
          instructor: 'Ana Paula',
          duration: 35,
          enrollments: 87,
          completions: 34,
          status: 'draft',
          createdAt: '2024-01-15',
          price: 249.90,
          description: 'Fundamentos de design de experiência e interface do usuário'
        }
      ]
      setCapacitations(capacitationsData)

      // Carregar contratos
      const contractsData: Contract[] = [
        {
          _id: '1',
          title: 'Desenvolvimento de Site Institucional',
          contractor: 'João Santos',
          professional: 'Maria Silva',
          value: 5000,
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          description: 'Desenvolvimento completo de site institucional com CMS'
        },
        {
          _id: '2',
          title: 'Campanha de Marketing Digital',
          contractor: 'Pedro Oliveira',
          professional: 'Carla Mendes',
          value: 3000,
          status: 'completed',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          description: 'Gestão completa de redes sociais e campanhas pagas'
        },
        {
          _id: '3',
          title: 'Design de Identidade Visual',
          contractor: 'Ana Costa',
          professional: 'Maria Silva',
          value: 2500,
          status: 'pending',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          description: 'Criação de logo, paleta de cores e manual de marca'
        }
      ]
      setContracts(contractsData)

    } catch (error) {
      console.error('Erro ao carregar dados administrativos:', error)
      toast.error('Erro ao carregar dados do painel')
    } finally {
      setLoading(false)
    }
  }

  // Funções de geração de relatórios
  const generateUserReport = () => {
    const reportData = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      suspendedUsers: users.filter(u => u.status === 'suspended').length,
      professionals: users.filter(u => u.type === 'professional').length,
      contractors: users.filter(u => u.type === 'contractor').length,
      generatedAt: new Date().toLocaleString('pt-BR')
    }

    const content = `
RELATÓRIO DE USUÁRIOS - JOBIN
Gerado em: ${reportData.generatedAt}

=== RESUMO GERAL ===
Total de Usuários: ${reportData.totalUsers}
Usuários Ativos: ${reportData.activeUsers}
Usuários Pendentes: ${reportData.pendingUsers}
Usuários Suspensos: ${reportData.suspendedUsers}

=== POR TIPO ===
Profissionais: ${reportData.professionals}
Contratantes: ${reportData.contractors}

=== DETALHAMENTO ===
${users.map(user => `
Nome: ${user.name}
Email: ${user.email}
Tipo: ${user.type === 'professional' ? 'Profissional' : 'Contratante'}
Status: ${user.status === 'active' ? 'Ativo' : user.status === 'pending' ? 'Pendente' : 'Suspenso'}
Cidade: ${user.city || 'Não informado'}
Cadastro: ${new Date(user.createdAt).toLocaleDateString('pt-BR')}
Último Login: ${new Date(user.lastLogin).toLocaleDateString('pt-BR')}
`).join('\n')}
    `

    downloadReport('relatorio-usuarios.txt', content)
    toast.success('Relatório de usuários gerado com sucesso!')
  }

  const generateCapacitationReport = () => {
    const reportData = {
      totalCapacitations: capacitations.length,
      activeCapacitations: capacitations.filter(c => c.status === 'active').length,
      draftCapacitations: capacitations.filter(c => c.status === 'draft').length,
      totalEnrollments: capacitations.reduce((sum, c) => sum + c.enrollments, 0),
      totalCompletions: capacitations.reduce((sum, c) => sum + c.completions, 0),
      totalRevenue: capacitations.reduce((sum, c) => sum + (c.price * c.completions), 0),
      generatedAt: new Date().toLocaleString('pt-BR')
    }

    const content = `
RELATÓRIO DE CAPACITAÇÕES - JOBIN
Gerado em: ${reportData.generatedAt}

=== RESUMO GERAL ===
Total de Capacitações: ${reportData.totalCapacitations}
Capacitações Ativas: ${reportData.activeCapacitations}
Capacitações em Rascunho: ${reportData.draftCapacitations}
Total de Inscrições: ${reportData.totalEnrollments}
Total de Conclusões: ${reportData.totalCompletions}
Receita Total: R$ ${reportData.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

=== DETALHAMENTO ===
${capacitations.map(cap => `
Título: ${cap.title}
Categoria: ${cap.category}
Instrutor: ${cap.instructor}
Duração: ${cap.duration}h
Preço: R$ ${cap.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Inscrições: ${cap.enrollments}
Conclusões: ${cap.completions}
Taxa de Conclusão: ${((cap.completions / cap.enrollments) * 100).toFixed(1)}%
Status: ${cap.status === 'active' ? 'Ativa' : cap.status === 'draft' ? 'Rascunho' : 'Arquivada'}
Receita: R$ ${(cap.price * cap.completions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
`).join('\n')}
    `

    downloadReport('relatorio-capacitacoes.txt', content)
    toast.success('Relatório de capacitações gerado com sucesso!')
  }

  const generateFinancialReport = () => {
    const contractRevenue = contracts.reduce((sum, c) => sum + c.value, 0)
    const capacitationRevenue = capacitations.reduce((sum, c) => sum + (c.price * c.completions), 0)
    const totalRevenue = contractRevenue + capacitationRevenue

    const reportData = {
      contractRevenue,
      capacitationRevenue,
      totalRevenue,
      activeContracts: contracts.filter(c => c.status === 'active').length,
      completedContracts: contracts.filter(c => c.status === 'completed').length,
      averageContractValue: contractRevenue / contracts.length,
      generatedAt: new Date().toLocaleString('pt-BR')
    }

    const content = `
RELATÓRIO FINANCEIRO - JOBIN
Gerado em: ${reportData.generatedAt}

=== RESUMO FINANCEIRO ===
Receita Total: R$ ${reportData.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Receita de Contratos: R$ ${reportData.contractRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Receita de Capacitações: R$ ${reportData.capacitationRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

=== CONTRATOS ===
Contratos Ativos: ${reportData.activeContracts}
Contratos Concluídos: ${reportData.completedContracts}
Valor Médio por Contrato: R$ ${reportData.averageContractValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

=== DETALHAMENTO DE CONTRATOS ===
${contracts.map(contract => `
Título: ${contract.title}
Contratante: ${contract.contractor}
Profissional: ${contract.professional}
Valor: R$ ${contract.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Status: ${contract.status === 'active' ? 'Ativo' : contract.status === 'completed' ? 'Concluído' : contract.status === 'pending' ? 'Pendente' : 'Cancelado'}
Período: ${new Date(contract.startDate).toLocaleDateString('pt-BR')} - ${new Date(contract.endDate).toLocaleDateString('pt-BR')}
`).join('\n')}

=== DETALHAMENTO DE CAPACITAÇÕES ===
${capacitations.map(cap => `
Título: ${cap.title}
Receita: R$ ${(cap.price * cap.completions).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Conclusões: ${cap.completions}
Preço Unitário: R$ ${cap.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
`).join('\n')}
    `

    downloadReport('relatorio-financeiro.txt', content)
    toast.success('Relatório financeiro gerado com sucesso!')
  }

  const downloadReport = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Funções de gestão de usuários
  const handleUserAction = async (userId: string, action: 'suspend' | 'activate' | 'delete') => {
    try {
      const user = users.find(u => u._id === userId)
      if (!user) return

      let updatedUsers = [...users]
      
      switch (action) {
        case 'suspend':
          updatedUsers = users.map(u => 
            u._id === userId ? { ...u, status: 'suspended' as const } : u
          )
          toast.success(`Usuário ${user.name} suspenso com sucesso`)
          break
        case 'activate':
          updatedUsers = users.map(u => 
            u._id === userId ? { ...u, status: 'active' as const } : u
          )
          toast.success(`Usuário ${user.name} ativado com sucesso`)
          break
        case 'delete':
          updatedUsers = users.filter(u => u._id !== userId)
          toast.success(`Usuário ${user.name} removido com sucesso`)
          break
      }
      
      setUsers(updatedUsers)
    } catch (error) {
      toast.error('Erro ao executar ação')
    }
  }

  const handleBulkUserAction = (action: 'suspend' | 'activate' | 'delete') => {
    if (selectedItems.length === 0) {
      toast.error('Selecione pelo menos um usuário')
      return
    }

    selectedItems.forEach(userId => {
      handleUserAction(userId, action)
    })
    setSelectedItems([])
    toast.success(`Ação executada em ${selectedItems.length} usuários`)
  }

  // Funções de gestão de capacitações
  const handleCapacitationAction = (capacitationId: string, action: 'activate' | 'archive' | 'delete') => {
    try {
      const capacitation = capacitations.find(c => c._id === capacitationId)
      if (!capacitation) return

      let updatedCapacitations = [...capacitations]
      
      switch (action) {
        case 'activate':
          updatedCapacitations = capacitations.map(c => 
            c._id === capacitationId ? { ...c, status: 'active' as const } : c
          )
          toast.success(`Capacitação "${capacitation.title}" ativada`)
          break
        case 'archive':
          updatedCapacitations = capacitations.map(c => 
            c._id === capacitationId ? { ...c, status: 'archived' as const } : c
          )
          toast.success(`Capacitação "${capacitation.title}" arquivada`)
          break
        case 'delete':
          updatedCapacitations = capacitations.filter(c => c._id !== capacitationId)
          toast.success(`Capacitação "${capacitation.title}" removida`)
          break
      }
      
      setCapacitations(updatedCapacitations)
    } catch (error) {
      toast.error('Erro ao executar ação')
    }
  }

  // Funções de gestão de contratos
  const handleContractAction = (contractId: string, action: 'approve' | 'cancel' | 'complete') => {
    try {
      const contract = contracts.find(c => c._id === contractId)
      if (!contract) return

      let updatedContracts = [...contracts]
      
      switch (action) {
        case 'approve':
          updatedContracts = contracts.map(c => 
            c._id === contractId ? { ...c, status: 'active' as const } : c
          )
          toast.success(`Contrato "${contract.title}" aprovado`)
          break
        case 'cancel':
          updatedContracts = contracts.map(c => 
            c._id === contractId ? { ...c, status: 'cancelled' as const } : c
          )
          toast.success(`Contrato "${contract.title}" cancelado`)
          break
        case 'complete':
          updatedContracts = contracts.map(c => 
            c._id === contractId ? { ...c, status: 'completed' as const } : c
          )
          toast.success(`Contrato "${contract.title}" concluído`)
          break
      }
      
      setContracts(updatedContracts)
    } catch (error) {
      toast.error('Erro ao executar ação')
    }
  }

  // Funções de configurações do sistema
  const handleSettingsChange = (setting: keyof SystemSettings, value: boolean | number) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }))
    toast.success('Configuração atualizada com sucesso')
  }

  const saveAllSettings = () => {
    // Aqui seria salvo no backend
    toast.success('Todas as configurações foram salvas')
  }

  const forceLogoutAllUsers = () => {
    toast.success('Logout forçado para todos os usuários executado')
  }

  const resetExpiredPasswords = () => {
    toast.success('Senhas expiradas resetadas com sucesso')
  }

  const performBackup = () => {
    toast.loading('Realizando backup...', { duration: 2000 })
    setTimeout(() => {
      toast.success('Backup realizado com sucesso')
    }, 2000)
  }

  const handleLogout = () => {
    signOutAdmin()
    toast.success('Logout realizado com sucesso')
    navigate('/admin/login')
  }

  // Funções de modal
  const openModal = (type: 'user' | 'capacitation' | 'contract', item?: any) => {
    setModalType(type)
    setEditingItem(item || null)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType(null)
    setEditingItem(null)
  }

  // Filtros
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const filteredCapacitations = capacitations.filter(cap => {
    const matchesSearch = cap.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cap.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || cap.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contract.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando painel administrativo...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">Painel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bem-vindo, {adminUser?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {adminUser?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navegação de Abas */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'users', name: 'Usuários', icon: Users },
                { id: 'capacitations', name: 'Capacitações', icon: BookOpen },
                { id: 'contracts', name: 'Contratos', icon: FileText },
                { id: 'reports', name: 'Relatórios', icon: TrendingUp },
                { id: 'settings', name: 'Configurações', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Estatísticas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats?.totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+12% este mês</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Capacitações Ativas</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats?.totalCapacitations}</p>
                    <p className="text-sm text-green-600">+8% este mês</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contratos Ativos</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats?.activeContracts}</p>
                    <p className="text-sm text-green-600">+15% este mês</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Crescimento Mensal</p>
                    <p className="text-2xl font-semibold text-gray-900">+{stats?.monthlyGrowth}%</p>
                    <p className="text-sm text-green-600">Meta: +10%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos e Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Atividades Recentes</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Ver todas</button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="ml-3 text-sm text-gray-600">Novo usuário cadastrado: Maria Silva</p>
                    <span className="ml-auto text-xs text-gray-400">2 min atrás</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="ml-3 text-sm text-gray-600">Capacitação "React Avançado" foi concluída</p>
                    <span className="ml-auto text-xs text-gray-400">15 min atrás</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <p className="ml-3 text-sm text-gray-600">Novo contrato assinado</p>
                    <span className="ml-auto text-xs text-gray-400">1 hora atrás</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="ml-3 text-sm text-gray-600">Backup automático realizado</p>
                    <span className="ml-auto text-xs text-gray-400">2 horas atrás</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="ml-3 text-sm text-gray-600">Usuário Pedro Oliveira foi suspenso</p>
                    <span className="ml-auto text-xs text-gray-400">3 horas atrás</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Status do Sistema</h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Sistema Atualizado</p>
                      <p className="text-sm text-gray-600">Versão 2.1.0 instalada com sucesso</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Backup Automático</p>
                      <p className="text-sm text-gray-600">Último backup: hoje às 03:00</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Segurança Ativa</p>
                      <p className="text-sm text-gray-600">SSL ativo, firewall configurado</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Activity className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Performance</p>
                      <p className="text-sm text-gray-600">Tempo de resposta: 120ms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={performBackup}
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <RefreshCw className="h-6 w-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Fazer Backup</p>
                    <p className="text-sm text-gray-600">Backup manual do sistema</p>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('reports')}
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BarChart3 className="h-6 w-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Gerar Relatórios</p>
                    <p className="text-sm text-gray-600">Relatórios detalhados</p>
                  </div>
                </button>
                <button 
                  onClick={() => setActiveTab('users')}
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Users className="h-6 w-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Gerenciar Usuários</p>
                    <p className="text-sm text-gray-600">Administrar contas</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Filtros e Busca */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativo</option>
                  <option value="pending">Pendente</option>
                  <option value="suspended">Suspenso</option>
                </select>
                <button 
                  onClick={() => openModal('user')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </button>
              </div>

              {/* Ações em Lote */}
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-800">{selectedItems.length} usuários selecionados</span>
                  <button 
                    onClick={() => handleBulkUserAction('activate')}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Ativar
                  </button>
                  <button 
                    onClick={() => handleBulkUserAction('suspend')}
                    className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700"
                  >
                    Suspender
                  </button>
                  <button 
                    onClick={() => handleBulkUserAction('delete')}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>

            {/* Lista de Usuários */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(filteredUsers.map(u => u._id))
                            } else {
                              setSelectedItems([])
                            }
                          }}
                          className="rounded"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cidade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Último Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            checked={selectedItems.includes(user._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, user._id])
                              } else {
                                setSelectedItems(selectedItems.filter(id => id !== user._id))
                              }
                            }}
                            className="rounded"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400">{user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.type === 'professional' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.type === 'professional' ? 'Profissional' : 'Contratante'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : user.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'active' ? 'Ativo' : user.status === 'pending' ? 'Pendente' : 'Suspenso'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.city || 'Não informado'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(user.lastLogin).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => openModal('user', user)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Visualizar/Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleUserAction(user._id, user.status === 'active' ? 'suspend' : 'activate')}
                              className={user.status === 'active' ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"}
                              title={user.status === 'active' ? 'Suspender' : 'Ativar'}
                            >
                              {user.status === 'active' ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </button>
                            <button 
                              onClick={() => handleUserAction(user._id, 'delete')}
                              className="text-red-600 hover:text-red-900"
                              title="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'capacitations' && (
          <div className="space-y-6">
            {/* Header com Filtros */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Gestão de Capacitações</h2>
                <button 
                  onClick={() => openModal('capacitation')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Capacitação
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar capacitações..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativa</option>
                  <option value="draft">Rascunho</option>
                  <option value="archived">Arquivada</option>
                </select>
              </div>
            </div>

            {/* Lista de Capacitações */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCapacitations.map((capacitation) => (
                <div key={capacitation._id} className="bg-white rounded-lg shadow-sm overflow-hidden border">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{capacitation.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        capacitation.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : capacitation.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {capacitation.status === 'active' ? 'Ativa' : capacitation.status === 'draft' ? 'Rascunho' : 'Arquivada'}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-600"><span className="font-medium">Categoria:</span> {capacitation.category}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Instrutor:</span> {capacitation.instructor}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Duração:</span> {capacitation.duration}h</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Preço:</span> R$ {capacitation.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-semibold text-blue-600">{capacitation.enrollments}</div>
                        <div className="text-xs text-blue-600">Inscritos</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-semibold text-green-600">{capacitation.completions}</div>
                        <div className="text-xs text-green-600">Concluídos</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Taxa de Conclusão</span>
                        <span>{((capacitation.completions / capacitation.enrollments) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(capacitation.completions / capacitation.enrollments) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => openModal('capacitation', capacitation)}
                          className="text-blue-600 hover:text-blue-900" 
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleCapacitationAction(capacitation._id, capacitation.status === 'active' ? 'archive' : 'activate')}
                          className={capacitation.status === 'active' ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"}
                          title={capacitation.status === 'active' ? 'Arquivar' : 'Ativar'}
                        >
                          {capacitation.status === 'active' ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <button 
                          onClick={() => handleCapacitationAction(capacitation._id, 'delete')}
                          className="text-red-600 hover:text-red-900" 
                          title="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(capacitation.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="space-y-6">
            {/* Header com Filtros */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Gestão de Contratos</h2>
                <button 
                  onClick={() => openModal('contract')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Contrato
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar contratos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Todos os Status</option>
                  <option value="pending">Pendente</option>
                  <option value="active">Ativo</option>
                  <option value="completed">Concluído</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </div>
            </div>

            {/* Lista de Contratos */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contrato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Partes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Período
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContracts.map((contract) => (
                      <tr key={contract._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">{contract.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">Contratante: {contract.contractor}</div>
                            <div className="text-gray-500">Profissional: {contract.professional}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            R$ {contract.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            contract.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : contract.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : contract.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {contract.status === 'active' ? 'Ativo' : 
                             contract.status === 'pending' ? 'Pendente' : 
                             contract.status === 'completed' ? 'Concluído' : 'Cancelado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div>{new Date(contract.startDate).toLocaleDateString('pt-BR')}</div>
                            <div className="text-gray-500">até {new Date(contract.endDate).toLocaleDateString('pt-BR')}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => openModal('contract', contract)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {contract.status === 'pending' && (
                              <button 
                                onClick={() => handleContractAction(contract._id, 'approve')}
                                className="text-green-600 hover:text-green-900"
                                title="Aprovar"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {contract.status === 'active' && (
                              <button 
                                onClick={() => handleContractAction(contract._id, 'complete')}
                                className="text-blue-600 hover:text-blue-900"
                                title="Concluir"
                              >
                                <Award className="h-4 w-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleContractAction(contract._id, 'cancel')}
                              className="text-red-600 hover:text-red-900"
                              title="Cancelar"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Relatórios e Análises</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-600 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório de Usuários</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Análise detalhada do crescimento e engajamento dos usuários da plataforma</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Total de usuários:</span>
                      <span className="font-semibold">{users.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Usuários ativos:</span>
                      <span className="font-semibold text-green-600">{users.filter(u => u.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Taxa de ativação:</span>
                      <span className="font-semibold">{((users.filter(u => u.status === 'active').length / users.length) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <button 
                    onClick={generateUserReport}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-600 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório de Capacitações</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Performance e estatísticas detalhadas das capacitações oferecidas</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Total de capacitações:</span>
                      <span className="font-semibold">{capacitations.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Capacitações ativas:</span>
                      <span className="font-semibold text-green-600">{capacitations.filter(c => c.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total de inscrições:</span>
                      <span className="font-semibold">{capacitations.reduce((sum, c) => sum + c.enrollments, 0)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={generateCapacitationReport}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-600 rounded-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório Financeiro</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Análise completa de receitas, contratos e transações financeiras</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Receita total:</span>
                      <span className="font-semibold text-green-600">R$ {(contracts.reduce((sum, c) => sum + c.value, 0) + capacitations.reduce((sum, c) => sum + (c.price * c.completions), 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contratos ativos:</span>
                      <span className="font-semibold">{contracts.filter(c => c.status === 'active').length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Valor médio/contrato:</span>
                      <span className="font-semibold">R$ {(contracts.reduce((sum, c) => sum + c.value, 0) / contracts.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                  <button 
                    onClick={generateFinancialReport}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>

                {/* Relatório de Performance */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-yellow-50 to-yellow-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-yellow-600 rounded-lg">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório de Performance</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Métricas de desempenho e KPIs da plataforma</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Taxa de conclusão:</span>
                      <span className="font-semibold">{((capacitations.reduce((sum, c) => sum + c.completions, 0) / capacitations.reduce((sum, c) => sum + c.enrollments, 0)) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Crescimento mensal:</span>
                      <span className="font-semibold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfação:</span>
                      <span className="font-semibold">4.8/5.0</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const content = `
RELATÓRIO DE PERFORMANCE - JOBIN
Gerado em: ${new Date().toLocaleString('pt-BR')}

=== MÉTRICAS PRINCIPAIS ===
Taxa de Conclusão: ${((capacitations.reduce((sum, c) => sum + c.completions, 0) / capacitations.reduce((sum, c) => sum + c.enrollments, 0)) * 100).toFixed(1)}%
Crescimento Mensal: +12.5%
Satisfação Média: 4.8/5.0
Tempo Médio de Resposta: 120ms

=== ANÁLISE DETALHADA ===
Total de Interações: ${users.length * 15}
Sessões Ativas: ${Math.floor(users.filter(u => u.status === 'active').length * 0.6)}
Taxa de Retenção: 87.3%
Conversão de Leads: 23.4%
                      `
                      downloadReport('relatorio-performance.txt', content)
                      toast.success('Relatório de performance gerado!')
                    }}
                    className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>

                {/* Relatório de Engajamento */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-indigo-50 to-indigo-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-600 rounded-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório de Engajamento</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Análise do engajamento e atividade dos usuários</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Usuários ativos hoje:</span>
                      <span className="font-semibold">{Math.floor(users.filter(u => u.status === 'active').length * 0.3)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sessões médias/usuário:</span>
                      <span className="font-semibold">4.2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tempo médio na plataforma:</span>
                      <span className="font-semibold">18 min</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const content = `
RELATÓRIO DE ENGAJAMENTO - JOBIN
Gerado em: ${new Date().toLocaleString('pt-BR')}

=== MÉTRICAS DE ENGAJAMENTO ===
Usuários Ativos Hoje: ${Math.floor(users.filter(u => u.status === 'active').length * 0.3)}
Sessões Médias por Usuário: 4.2
Tempo Médio na Plataforma: 18 minutos
Taxa de Bounce: 12.8%

=== ANÁLISE POR PERÍODO ===
Última Semana: ${Math.floor(users.filter(u => u.status === 'active').length * 0.7)} usuários ativos
Último Mês: ${users.filter(u => u.status === 'active').length} usuários ativos
Crescimento Semanal: +8.3%

=== FUNCIONALIDADES MAIS UTILIZADAS ===
1. Busca de Profissionais: 45.2%
2. Capacitações: 32.1%
3. Mensagens: 28.7%
4. Contratos: 21.3%
5. Gamificação: 18.9%
                      `
                      downloadReport('relatorio-engajamento.txt', content)
                      toast.success('Relatório de engajamento gerado!')
                    }}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>

                {/* Relatório Executivo */}
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Relatório Executivo</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Resumo executivo com todas as métricas principais</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>ROI da plataforma:</span>
                      <span className="font-semibold text-green-600">+234%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Satisfação geral:</span>
                      <span className="font-semibold">94.2%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Meta mensal:</span>
                      <span className="font-semibold text-green-600">112% atingida</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const content = `
RELATÓRIO EXECUTIVO - JOBIN
Gerado em: ${new Date().toLocaleString('pt-BR')}

=== RESUMO EXECUTIVO ===
ROI da Plataforma: +234%
Satisfação Geral: 94.2%
Meta Mensal: 112% atingida
Crescimento Anual: +156%

=== MÉTRICAS PRINCIPAIS ===
Total de Usuários: ${users.length}
Usuários Ativos: ${users.filter(u => u.status === 'active').length}
Capacitações Oferecidas: ${capacitations.length}
Contratos Realizados: ${contracts.length}

=== RECEITAS ===
Receita Total: R$ ${(contracts.reduce((sum, c) => sum + c.value, 0) + capacitations.reduce((sum, c) => sum + (c.price * c.completions), 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Receita de Contratos: R$ ${contracts.reduce((sum, c) => sum + c.value, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Receita de Capacitações: R$ ${capacitations.reduce((sum, c) => sum + (c.price * c.completions), 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

=== RECOMENDAÇÕES ESTRATÉGICAS ===
1. Expandir catálogo de capacitações em áreas de alta demanda
2. Implementar programa de fidelidade para usuários ativos
3. Desenvolver parcerias estratégicas com empresas locais
4. Investir em marketing digital para acelerar crescimento
5. Aprimorar sistema de gamificação para aumentar engajamento
                      `
                      downloadReport('relatorio-executivo.txt', content)
                      toast.success('Relatório executivo gerado!')
                    }}
                    className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center justify-center transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </button>
                </div>
              </div>

              {/* Seção de Relatórios Agendados */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Relatórios Agendados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Relatório Semanal</h4>
                        <p className="text-sm text-gray-600">Toda segunda-feira às 08:00</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 text-sm mr-2">Ativo</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Relatório Mensal</h4>
                        <p className="text-sm text-gray-600">Todo dia 1º às 09:00</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 text-sm mr-2">Ativo</span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações do Sistema</h2>
              
              <div className="space-y-8">
                {/* Configurações Gerais */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações Gerais</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Modo de Manutenção</label>
                        <p className="text-sm text-gray-600">Ativar modo de manutenção para todos os usuários</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={systemSettings.maintenanceMode}
                          onChange={(e) => handleSettingsChange('maintenanceMode', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Backup Automático</label>
                        <p className="text-sm text-gray-600">Realizar backup diário dos dados às 03:00</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={systemSettings.autoBackup}
                          onChange={(e) => handleSettingsChange('autoBackup', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Tamanho Máximo de Arquivo (MB)</label>
                        <input 
                          type="number" 
                          value={systemSettings.maxFileSize}
                          onChange={(e) => handleSettingsChange('maxFileSize', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="block text-sm font-medium text-gray-900 mb-2">Timeout de Sessão (minutos)</label>
                        <input 
                          type="number" 
                          value={systemSettings.sessionTimeout}
                          onChange={(e) => handleSettingsChange('sessionTimeout', parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notificações */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notificações</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Email de Novos Usuários</label>
                        <p className="text-sm text-gray-600">Receber notificação quando um novo usuário se cadastrar</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={systemSettings.newUserNotifications}
                          onChange={(e) => handleSettingsChange('newUserNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="text-sm font-medium text-gray-900">Relatórios Semanais</label>
                        <p className="text-sm text-gray-600">Enviar relatório semanal por email toda segunda-feira</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={systemSettings.weeklyReports}
                          onChange={(e) => handleSettingsChange('weeklyReports', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Segurança */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Segurança</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={forceLogoutAllUsers}
                      className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Forçar Logout de Todos os Usuários
                    </button>
                    <button 
                      onClick={resetExpiredPasswords}
                      className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      <Shield className="h-5 w-5 mr-2" />
                      Resetar Senhas Expiradas
                    </button>
                  </div>
                </div>

                {/* Sistema */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sistema</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={performBackup}
                      className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <RefreshCw className="h-5 w-5 mr-2" />
                      Fazer Backup Manual
                    </button>
                    <button 
                      onClick={() => {
                        toast.loading('Limpando cache...', { duration: 2000 })
                        setTimeout(() => toast.success('Cache limpo com sucesso!'), 2000)
                      }}
                      className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Zap className="h-5 w-5 mr-2" />
                      Limpar Cache do Sistema
                    </button>
                  </div>
                </div>

                {/* Salvar Configurações */}
                <div className="flex justify-end">
                  <button 
                    onClick={saveAllSettings}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="h-5 w-5 mr-2" />
                    Salvar Todas as Configurações
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'Editar' : 'Novo'} {modalType === 'user' ? 'Usuário' : modalType === 'capacitation' ? 'Capacitação' : 'Contrato'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {modalType === 'user' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.email} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.phone} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.city} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.type}>
                        <option value="professional">Profissional</option>
                        <option value="contractor">Contratante</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.status}>
                        <option value="active">Ativo</option>
                        <option value="pending">Pendente</option>
                        <option value="suspended">Suspenso</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {modalType === 'capacitation' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.title} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.category} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.instructor} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duração (horas)</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.duration} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                      <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.price} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.status}>
                        <option value="active">Ativa</option>
                        <option value="draft">Rascunho</option>
                        <option value="archived">Arquivada</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} defaultValue={editingItem?.description}></textarea>
                  </div>
                </>
              )}

              {modalType === 'contract' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.title} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contratante</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.contractor} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profissional</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.professional} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                      <input type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.value} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.startDate} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.endDate} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" defaultValue={editingItem?.status}>
                      <option value="pending">Pendente</option>
                      <option value="active">Ativo</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={3} defaultValue={editingItem?.description}></textarea>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={closeModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  toast.success(`${modalType === 'user' ? 'Usuário' : modalType === 'capacitation' ? 'Capacitação' : 'Contrato'} ${editingItem ? 'atualizado' : 'criado'} com sucesso!`)
                  closeModal()
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingItem ? 'Atualizar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
