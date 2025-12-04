
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Trophy, Star, Award, Target, TrendingUp, Crown, Gift, Zap, Medal, Users, Calendar} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Achievement {
  _id: string
  title: string
  description: string
  icon: string
  points: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  unlocked_date?: string
  progress: number
  max_progress: number
}

interface UserStats {
  total_points: number
  level: number
  rank_position: number
  completed_courses: number
  completed_contracts: number
  streak_days: number
  badges_earned: number
}

interface LeaderboardUser {
  _id: string
  name: string
  avatar_url?: string
  points: number
  level: number
  rank: number
}

const Gamification = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [selectedTab, setSelectedTab] = useState<'overview' | 'achievements' | 'leaderboard'>('overview')
  const [loading, setLoading] = useState(true)

  // Dados mockados para demonstração
  useEffect(() => {
    const mockUserStats: UserStats = {
      total_points: 2850,
      level: 12,
      rank_position: 23,
      completed_courses: 8,
      completed_contracts: 15,
      streak_days: 7,
      badges_earned: 12
    }

    const mockAchievements: Achievement[] = [
      {
        _id: '1',
        title: 'Primeiro Passo',
        description: 'Complete seu primeiro curso',
        icon: '🎯',
        points: 100,
        rarity: 'common',
        unlocked: true,
        unlocked_date: '2024-01-15',
        progress: 1,
        max_progress: 1
      },
      {
        _id: '2',
        title: 'Estudante Dedicado',
        description: 'Complete 5 cursos',
        icon: '📚',
        points: 500,
        rarity: 'rare',
        unlocked: true,
        unlocked_date: '2024-01-20',
        progress: 5,
        max_progress: 5
      },
      {
        _id: '3',
        title: 'Profissional Ativo',
        description: 'Complete 10 contratos',
        icon: '💼',
        points: 750,
        rarity: 'epic',
        unlocked: true,
        unlocked_date: '2024-01-25',
        progress: 10,
        max_progress: 10
      },
      {
        _id: '4',
        title: 'Mestre dos Cursos',
        description: 'Complete 20 cursos',
        icon: '🎓',
        points: 1000,
        rarity: 'legendary',
        unlocked: false,
        progress: 8,
        max_progress: 20
      },
      {
        _id: '5',
        title: 'Sequência de Ouro',
        description: 'Mantenha uma sequência de 30 dias',
        icon: '🔥',
        points: 800,
        rarity: 'epic',
        unlocked: false,
        progress: 7,
        max_progress: 30
      },
      {
        _id: '6',
        title: 'Mentor da Comunidade',
        description: 'Ajude 50 pessoas',
        icon: '🤝',
        points: 1200,
        rarity: 'legendary',
        unlocked: false,
        progress: 12,
        max_progress: 50
      }
    ]

    const mockLeaderboard: LeaderboardUser[] = [
      { _id: '1', name: 'Ana Silva', points: 4250, level: 18, rank: 1 },
      { _id: '2', name: 'Carlos Santos', points: 3890, level: 16, rank: 2 },
      { _id: '3', name: 'Maria Costa', points: 3650, level: 15, rank: 3 },
      { _id: '4', name: 'João Lima', points: 3200, level: 14, rank: 4 },
      { _id: '5', name: 'Pedro Oliveira', points: 2950, level: 13, rank: 5 },
      { _id: 'current', name: user?.userName || 'Você', points: 2850, level: 12, rank: 23 }
    ]

    setUserStats(mockUserStats)
    setAchievements(mockAchievements)
    setLeaderboard(mockLeaderboard)
    setLoading(false)
  }, [user])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50'
      case 'rare':
        return 'border-blue-300 bg-blue-50'
      case 'epic':
        return 'border-purple-300 bg-purple-50'
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-700'
      case 'rare':
        return 'text-blue-700'
      case 'epic':
        return 'text-purple-700'
      case 'legendary':
        return 'text-yellow-700'
      default:
        return 'text-gray-700'
    }
  }

  const getLevelProgress = (level: number) => {
    if (!level || level <= 0) return 0
    const pointsForNextLevel = level * 250
    const currentLevelPoints = (level - 1) * 250
    const userCurrentPoints = userStats?.total_points || 0
    const progressInLevel = Math.max(0, userCurrentPoints - currentLevelPoints)
    const levelRange = pointsForNextLevel - currentLevelPoints
    const progressPercentage = levelRange > 0 ? (progressInLevel / levelRange) * 100 : 0
    return Math.min(Math.max(progressPercentage, 0), 100)
  }

  const getPointsToNextLevel = (level: number) => {
    if (!level || level <= 0) return 0
    const pointsForNextLevel = level * 250
    const userCurrentPoints = userStats?.total_points || 0
    const pointsNeeded = pointsForNextLevel - userCurrentPoints
    return Math.max(pointsNeeded, 0)
  }

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
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Conquistas</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { key: 'overview', label: 'Visão Geral', icon: TrendingUp },
            { key: 'achievements', label: 'Conquistas', icon: Trophy },
            { key: 'leaderboard', label: 'Ranking', icon: Crown }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedTab === tab.key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visão Geral */}
        {selectedTab === 'overview' && userStats && (
          <div className="space-y-8">
            {/* Estatísticas do Usuário */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl p-8 text-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <Crown className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Nível {userStats.level}</h2>
                      <p className="text-purple-100">
                        {getPointsToNextLevel(userStats.level)} pontos para o próximo nível
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-100">Progresso do Nível</span>
                      <span className="font-medium">{Math.round(getLevelProgress(userStats.level))}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
                      <div
                        className="bg-white h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getLevelProgress(userStats.level)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                    <Zap className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{userStats.total_points?.toLocaleString() || 0}</div>
                    <div className="text-sm text-purple-100">Pontos Totais</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                    <Trophy className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">#{userStats.rank_position || '-'}</div>
                    <div className="text-sm text-purple-100">Posição no Ranking</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                    <Target className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{userStats.streak_days || 0}</div>
                    <div className="text-sm text-purple-100">Dias Consecutivos</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                    <Award className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{userStats.badges_earned || 0}</div>
                    <div className="text-sm text-purple-100">Badges Conquistados</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Estatísticas Detalhadas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Atividade de Aprendizado</h3>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cursos Concluídos</span>
                    <span className="font-medium">{userStats.completed_courses || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contratos Finalizados</span>
                    <span className="font-medium">{userStats.completed_contracts || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Conquistas Recentes</h3>
                  <Medal className="h-6 w-6 text-purple-500" />
                </div>
                <div className="space-y-3">
                  {achievements && achievements.filter(a => a.unlocked).length > 0 ? (
                    achievements.filter(a => a.unlocked).slice(-2).map(achievement => (
                      <div key={achievement._id} className="flex items-center space-x-3">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{achievement.title}</p>
                          <p className="text-xs text-gray-500">+{achievement.points} pontos</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Nenhuma conquista recente</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Próximas Metas</h3>
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <div className="space-y-3">
                  {achievements && achievements.filter(a => !a.unlocked).length > 0 ? (
                    achievements.filter(a => !a.unlocked).slice(0, 2).map(achievement => (
                      <div key={achievement._id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{achievement.title}</span>
                          <span className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.max_progress}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${(achievement.progress / achievement.max_progress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">Todas as conquistas desbloqueadas!</p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Conquistas */}
        {selectedTab === 'achievements' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    achievement.unlocked 
                      ? `${getRarityColor(achievement.rarity)} shadow-lg` 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className={`text-lg font-bold mb-2 ${
                      achievement.unlocked ? getRarityTextColor(achievement.rarity) : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    
                    <div className="space-y-3">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        achievement.unlocked 
                          ? `${getRarityTextColor(achievement.rarity)} bg-opacity-20` 
                          : 'text-gray-500 bg-gray-200'
                      }`}>
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{achievement.points} pontos</span>
                      </div>

                      {!achievement.unlocked && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>{achievement.progress}/{achievement.max_progress}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${(achievement.progress / achievement.max_progress) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {achievement.unlocked && achievement.unlocked_date && (
                        <p className="text-xs text-gray-500">
                          Conquistado em {new Date(achievement.unlocked_date).toLocaleDateString('pt-BR')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Ranking */}
        {selectedTab === 'leaderboard' && (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Top Usuários</h3>
                <p className="text-gray-600">Ranking baseado em pontos totais</p>
              </div>

              <div className="divide-y divide-gray-200">
                {leaderboard.map((leaderUser, index) => (
                  <motion.div
                    key={leaderUser._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`p-6 flex items-center justify-between ${
                      leaderUser._id === 'current' ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        leaderUser.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                        leaderUser.rank === 2 ? 'bg-gray-100 text-gray-800' :
                        leaderUser.rank === 3 ? 'bg-orange-100 text-orange-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {leaderUser.rank}
                      </div>
                      
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900">{leaderUser.name}</h4>
                        <p className="text-sm text-gray-500">Nível {leaderUser.level}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="font-bold text-gray-900">
                          {leaderUser.points.toLocaleString()} pontos
                        </span>
                      </div>
                      {leaderUser.rank <= 3 && (
                        <div className="flex items-center justify-end mt-1">
                          <Trophy className={`h-4 w-4 ${
                            leaderUser.rank === 1 ? 'text-yellow-500' :
                            leaderUser.rank === 2 ? 'text-gray-500' :
                            'text-orange-500'
                          }`} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gamification
