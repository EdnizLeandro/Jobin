
import { lumi } from '../lib/lumi'

export const useAppDownload = () => {
  const trackDownload = async (platform: 'android' | 'ios', source: string) => {
    try {
      await lumi.entities.app_downloads.create({
        platform,
        action: 'click',
        source,
        userAgent: navigator.userAgent,
        ip: '', // Será preenchido pelo backend
        sessionId: `sess_${Date.now()}`,
        createdAt: new Date().toISOString()
      })
    } catch (error) {
      console.error('Erro ao rastrear download:', error)
    }
  }

  const downloadApp = async (platform: 'android' | 'ios', source: string = 'direct') => {
    await trackDownload(platform, source)
    
    const urls = {
      android: 'https://play.google.com/store/apps/details?id=com.jobin.app',
      ios: 'https://apps.apple.com/app/jobin/id123456789'
    }

    // Abrir em nova aba
    window.open(urls[platform], '_blank')
  }

  return {
    downloadApp,
    trackDownload
  }
}
