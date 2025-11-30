
import React from 'react'
import {Download, Smartphone} from 'lucide-react'
import { useAppDownload } from '../hooks/useAppDownload'
import toast from 'react-hot-toast'

interface DownloadButtonProps {
  source?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  source = 'direct',
  variant = 'primary',
  className = ''
}) => {
  const { downloadApp } = useAppDownload()

  const detectPlatform = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('android')) return 'android'
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) return 'ios'
    return 'android' // Default para Android
  }

  const handleDownload = async () => {
    const platform = detectPlatform()
    
    // Mostrar toast informativo já que o app ainda não está disponível
    toast((t) => (
      <div className="flex items-center">
        <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
        <div>
          <p className="font-semibold">App em desenvolvimento!</p>
          <p className="text-sm text-gray-600">
            O Jobin estará disponível em breve na {platform === 'ios' ? 'App Store' : 'Google Play'}
          </p>
        </div>
      </div>
    ), {
      duration: 4000,
      style: {
        background: '#f3f4f6',
        color: '#374151',
      },
    })

    await downloadApp(platform, source)
  }

  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-purple-400 text-white hover:shadow-lg",
    secondary: "border-2 border-white text-white hover:bg-white hover:text-purple-600"
  }

  return (
    <button
      onClick={handleDownload}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <Download className="h-5 w-5 mr-2" />
      Baixar App
    </button>
  )
}

export default DownloadButton
