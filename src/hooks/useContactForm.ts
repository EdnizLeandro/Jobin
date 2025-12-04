
import { useState } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'
import { sanitizeInput, validateEmail } from '../utils/security'
import { contactRateLimiter, getBrowserFingerprint, formatBlockTime } from '../utils/rateLimiter'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const useContactForm = () => {
  const [loading, setLoading] = useState(false)

  const submitContact = async (data: ContactFormData) => {
    setLoading(true)
    try {
      const fingerprint = getBrowserFingerprint()
      
      // Verifica rate limiting
      const status = contactRateLimiter.getStatus(fingerprint)
      
      if (status.isBlocked && status.blockExpiry) {
        const timeRemaining = formatBlockTime(status.blockExpiry)
        toast.error(`Muitas tentativas de envio. Tente novamente em ${timeRemaining}.`)
        setLoading(false)
        return false
      }
      
      if (status.attemptsRemaining <= 2 && status.attemptsRemaining > 0) {
        toast.error(`Atenção: ${status.attemptsRemaining} envio${status.attemptsRemaining !== 1 ? 's' : ''} restante${status.attemptsRemaining !== 1 ? 's' : ''}.`)
      }
      
      // Validação e sanitização de dados
      if (!validateEmail(data.email)) {
        toast.error('E-mail inválido')
        setLoading(false)
        return false
      }

      // Sanitiza todos os campos de entrada
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
        status: 'nova',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await lumi.entities.contacts.create(sanitizedData)
      
      // Registra tentativa bem-sucedida
      contactRateLimiter.recordAttempt(fingerprint)

      toast.success('Mensagem enviada com sucesso! Retornaremos em breve.')
      return true
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error('Erro ao enviar mensagem. Tente novamente.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    submitContact,
    loading
  }
}
