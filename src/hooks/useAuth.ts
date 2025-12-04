
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'
import { clearSensitiveCache } from '../utils/security'
import { loginRateLimiter, getBrowserFingerprint, formatBlockTime } from '../utils/rateLimiter'
import toast from 'react-hot-toast'

export const useAuth = () => {
  const [user, setUser] = useState(lumi.auth.user)
  const [isAuthenticated, setIsAuthenticated] = useState(lumi.auth.isAuthenticated)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = lumi.auth.onAuthChange(({ isAuthenticated, user }) => {
      setIsAuthenticated(isAuthenticated)
      setUser(user)
    })

    setLoading(false)
    return unsubscribe
  }, [])

  const signIn = async () => {
    const fingerprint = getBrowserFingerprint()
    
    // Verifica rate limiting antes de tentar login
    const status = loginRateLimiter.getStatus(fingerprint)
    
    if (status.isBlocked && status.blockExpiry) {
      const timeRemaining = formatBlockTime(status.blockExpiry)
      toast.error(`Muitas tentativas de login. Tente novamente em ${timeRemaining}.`)
      throw new Error('Rate limit exceeded')
    }
    
    if (status.attemptsRemaining <= 2 && status.attemptsRemaining > 0) {
      toast.error(`Atenção: ${status.attemptsRemaining} tentativa${status.attemptsRemaining !== 1 ? 's' : ''} restante${status.attemptsRemaining !== 1 ? 's' : ''} antes do bloqueio temporário.`)
    }
    
    try {
      const { user } = await lumi.auth.signIn()
      // Login bem-sucedido, reseta o contador
      loginRateLimiter.reset(fingerprint)
      return user
    } catch (error) {
      // Registra tentativa falha
      loginRateLimiter.recordAttempt(fingerprint)
      throw error
    }
  }

  const signOut = () => {
    // Limpa dados sensíveis do cache antes do logout
    clearSensitiveCache()
    lumi.auth.signOut()
  }

  return { user, isAuthenticated, loading, signIn, signOut }
}
