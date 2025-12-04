
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {ArrowLeft, Eye, Volume2, Keyboard, MousePointer, Accessibility, Save, RotateCcw} from 'lucide-react'
import toast from 'react-hot-toast'

interface AccessibilitySettings {
  highContrast: boolean
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  voiceCommands: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
  screenReader: boolean
  focusIndicator: boolean
  colorBlindSupport: boolean
}

const AccessibilitySettings = () => {
  const navigate = useNavigate()
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: 'medium',
    voiceCommands: false,
    keyboardNavigation: true,
    reducedMotion: false,
    screenReader: false,
    focusIndicator: true,
    colorBlindSupport: false
  })

  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Carregar configurações salvas
    const savedSettings = localStorage.getItem('accessibilitySettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings))
    
    // Aplicar configurações ao documento
    applyAccessibilitySettings(settings)
    
    setHasChanges(false)
    toast.success('Configurações de acessibilidade salvas!')
  }

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      highContrast: false,
      fontSize: 'medium',
      voiceCommands: false,
      keyboardNavigation: true,
      reducedMotion: false,
      screenReader: false,
      focusIndicator: true,
      colorBlindSupport: false
    }
    
    setSettings(defaultSettings)
    setHasChanges(true)
    toast.info('Configurações restauradas para o padrão')
  }

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement

    // Alto contraste
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Tamanho da fonte
    root.classList.remove('font-small', 'font-medium', 'font-large', 'font-extra-large')
    root.classList.add(`font-${settings.fontSize}`)

    // Movimento reduzido
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Indicador de foco
    if (settings.focusIndicator) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }

    // Suporte para daltonismo
    if (settings.colorBlindSupport) {
      root.classList.add('colorblind-support')
    } else {
      root.classList.remove('colorblind-support')
    }
  }

  const fontSizeOptions = [
    { value: 'small', label: 'Pequeno', description: '14px' },
    { value: 'medium', label: 'Médio', description: '16px' },
    { value: 'large', label: 'Grande', description: '18px' },
    { value: 'extra-large', label: 'Extra Grande', description: '20px' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Accessibility className="h-6 w-6 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Configurações de Acessibilidade</h1>
            </div>
          </div>

          {hasChanges && (
            <div className="flex space-x-3">
              <button
                onClick={resetSettings}
                className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar
              </button>
              <button
                onClick={saveSettings}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configurações Visuais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Configurações Visuais</h2>
            </div>

            <div className="space-y-6">
              {/* Alto Contraste */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Alto Contraste</h3>
                  <p className="text-sm text-gray-500">Aumenta o contraste para melhor visibilidade</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Tamanho da Fonte */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Tamanho da Fonte</h3>
                <div className="grid grid-cols-2 gap-2">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSettingChange('fontSize', option.value)}
                      className={`p-3 text-left border rounded-lg transition-colors ${
                        settings.fontSize === option.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suporte para Daltonismo */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Suporte para Daltonismo</h3>
                  <p className="text-sm text-gray-500">Ajusta cores para melhor distinção</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.colorBlindSupport}
                    onChange={(e) => handleSettingChange('colorBlindSupport', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Configurações de Interação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MousePointer className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Configurações de Interação</h2>
            </div>

            <div className="space-y-6">
              {/* Navegação por Teclado */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Navegação por Teclado</h3>
                  <p className="text-sm text-gray-500">Habilita navegação completa via teclado</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.keyboardNavigation}
                    onChange={(e) => handleSettingChange('keyboardNavigation', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Indicador de Foco */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Indicador de Foco Aprimorado</h3>
                  <p className="text-sm text-gray-500">Destaca elementos focados com mais clareza</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.focusIndicator}
                    onChange={(e) => handleSettingChange('focusIndicator', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Movimento Reduzido */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Movimento Reduzido</h3>
                  <p className="text-sm text-gray-500">Reduz animações e transições</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.reducedMotion}
                    onChange={(e) => handleSettingChange('reducedMotion', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Configurações de Audio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Volume2 className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Configurações de Áudio</h2>
            </div>

            <div className="space-y-6">
              {/* Comandos de Voz */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Comandos de Voz</h3>
                  <p className="text-sm text-gray-500">Habilita controle por comandos de voz</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.voiceCommands}
                    onChange={(e) => handleSettingChange('voiceCommands', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Leitor de Tela */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Compatibilidade com Leitor de Tela</h3>
                  <p className="text-sm text-gray-500">Otimiza a interface para leitores de tela</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.screenReader}
                    onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Atalhos de Teclado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Keyboard className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Atalhos de Teclado</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Navegação principal</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">Alt + M</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Buscar</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">Ctrl + K</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Configurações</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">Alt + S</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Ajuda</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">F1</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Botão de Teste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-purple-50 border border-purple-200 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-purple-900 mb-2">
            Teste suas Configurações
          </h3>
          <p className="text-purple-700 mb-4">
            Clique no botão abaixo para testar como as configurações afetam a navegação da plataforma.
          </p>
          <button
            onClick={() => {
              applyAccessibilitySettings(settings)
              toast.success('Configurações aplicadas! Navegue pela plataforma para testar.')
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Aplicar e Testar
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default AccessibilitySettings
