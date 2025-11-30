/**
 * Rate Limiter - Proteção contra ataques de força bruta
 * Implementa limitação de tentativas por IP/usuário com janela deslizante
 */

interface RateLimitEntry {
  count: number
  firstAttempt: number
  blocked: boolean
  blockExpiry?: number
}

interface RateLimitConfig {
  maxAttempts: number // Máximo de tentativas permitidas
  windowMs: number // Janela de tempo em milissegundos
  blockDurationMs: number // Duração do bloqueio em milissegundos
}

class RateLimiter {
  private attempts: Map<string, RateLimitEntry> = new Map()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
    // Limpa entradas expiradas a cada 5 minutos
    setInterval(() => this.cleanup(), 5 * 60 * 1000)
  }

  /**
   * Verifica se a tentativa é permitida
   */
  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const entry = this.attempts.get(identifier)

    // Se não há registro, permite
    if (!entry) {
      this.attempts.set(identifier, {
        count: 1,
        firstAttempt: now,
        blocked: false
      })
      return true
    }

    // Se está bloqueado, verifica se o bloqueio expirou
    if (entry.blocked && entry.blockExpiry) {
      if (now < entry.blockExpiry) {
        return false // Ainda bloqueado
      } else {
        // Bloqueio expirou, reseta
        this.attempts.delete(identifier)
        this.attempts.set(identifier, {
          count: 1,
          firstAttempt: now,
          blocked: false
        })
        return true
      }
    }

    // Verifica se a janela de tempo expirou
    if (now - entry.firstAttempt > this.config.windowMs) {
      // Reseta o contador
      this.attempts.set(identifier, {
        count: 1,
        firstAttempt: now,
        blocked: false
      })
      return true
    }

    // Incrementa o contador
    entry.count++

    // Se excedeu o limite, bloqueia
    if (entry.count > this.config.maxAttempts) {
      entry.blocked = true
      entry.blockExpiry = now + this.config.blockDurationMs
      return false
    }

    return true
  }

  /**
   * Registra uma tentativa
   */
  recordAttempt(identifier: string): void {
    this.isAllowed(identifier) // Atualiza o contador
  }

  /**
   * Retorna informações sobre o rate limit
   */
  getStatus(identifier: string): {
    attemptsRemaining: number
    isBlocked: boolean
    blockExpiry?: number
  } {
    const entry = this.attempts.get(identifier)
    const now = Date.now()

    if (!entry) {
      return {
        attemptsRemaining: this.config.maxAttempts,
        isBlocked: false
      }
    }

    if (entry.blocked && entry.blockExpiry) {
      if (now < entry.blockExpiry) {
        return {
          attemptsRemaining: 0,
          isBlocked: true,
          blockExpiry: entry.blockExpiry
        }
      }
    }

    // Verifica se a janela expirou
    if (now - entry.firstAttempt > this.config.windowMs) {
      return {
        attemptsRemaining: this.config.maxAttempts,
        isBlocked: false
      }
    }

    return {
      attemptsRemaining: Math.max(0, this.config.maxAttempts - entry.count),
      isBlocked: entry.blocked || false,
      blockExpiry: entry.blockExpiry
    }
  }

  /**
   * Reseta o contador para um identificador específico
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }

  /**
   * Limpa entradas expiradas
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [identifier, entry] of this.attempts.entries()) {
      // Remove entradas antigas ou bloqueios expirados
      if (
        (!entry.blocked && now - entry.firstAttempt > this.config.windowMs) ||
        (entry.blocked && entry.blockExpiry && now > entry.blockExpiry)
      ) {
        this.attempts.delete(identifier)
      }
    }
  }
}

// Instâncias pré-configuradas para diferentes casos de uso

/**
 * Rate limiter para login - 5 tentativas em 15 minutos, bloqueio de 30 minutos
 */
export const loginRateLimiter = new RateLimiter({
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutos
  blockDurationMs: 30 * 60 * 1000 // 30 minutos
})

/**
 * Rate limiter para registro - 3 tentativas em 10 minutos, bloqueio de 1 hora
 */
export const registerRateLimiter = new RateLimiter({
  maxAttempts: 3,
  windowMs: 10 * 60 * 1000, // 10 minutos
  blockDurationMs: 60 * 60 * 1000 // 1 hora
})

/**
 * Rate limiter para formulário de contato - 5 tentativas em 10 minutos, bloqueio de 20 minutos
 */
export const contactRateLimiter = new RateLimiter({
  maxAttempts: 5,
  windowMs: 10 * 60 * 1000, // 10 minutos
  blockDurationMs: 20 * 60 * 1000 // 20 minutos
})

/**
 * Rate limiter genérico para APIs - 30 tentativas por minuto, bloqueio de 5 minutos
 */
export const apiRateLimiter = new RateLimiter({
  maxAttempts: 30,
  windowMs: 60 * 1000, // 1 minuto
  blockDurationMs: 5 * 60 * 1000 // 5 minutos
})

/**
 * Gera um identificador único baseado no fingerprint do navegador
 */
export const getBrowserFingerprint = (): string => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.textBaseline = "top"
    ctx.font = "14px 'Arial'"
    ctx.textBaseline = "alphabetic"
    ctx.fillStyle = "#f60"
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = "#069"
    ctx.fillText("Browser Fingerprint", 2, 15)
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)"
    ctx.fillText("Browser Fingerprint", 4, 17)
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width,
    screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join("|")

  // Gera um hash simples do fingerprint
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }

  return `fp_${Math.abs(hash).toString(36)}`
}

/**
 * Formata o tempo restante de bloqueio
 */
export const formatBlockTime = (blockExpiry: number): string => {
  const now = Date.now()
  const remaining = Math.max(0, blockExpiry - now)
  const minutes = Math.ceil(remaining / 60000)

  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? "s" : ""}`
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (remainingMinutes === 0) {
    return `${hours} hora${hours !== 1 ? "s" : ""}`
  }

  return `${hours}h ${remainingMinutes}min`
}
