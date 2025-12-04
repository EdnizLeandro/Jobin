/**
 * Utilitários de Segurança do Jobin
 * Proteção contra XSS, validação de entrada e sanitização de dados
 */

// Sanitização contra XSS (Cross-Site Scripting)
export const sanitizeInput = (input: string): string => {
  if (!input) return "";
  
  // Remove tags HTML e scripts
  const withoutTags = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<link\b[^<]*>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  
  // Escapa caracteres especiais HTML
  return withoutTags
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

// Validação de e-mail robusta
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Validação de senha forte
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("A senha deve ter pelo menos 8 caracteres");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula");
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push("A senha deve conter pelo menos um número");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("A senha deve conter pelo menos um caractere especial");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Sanitização de número de telefone
export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d+\-() ]/g, "");
};

// Validação de CNPJ
export const validateCNPJ = (cnpj: string): boolean => {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, "");
  
  if (cleanCNPJ.length !== 14) return false;
  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;
  
  // Validação dos dígitos verificadores
  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(cleanCNPJ.charAt(12))) return false;
  
  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cleanCNPJ.charAt(i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === parseInt(cleanCNPJ.charAt(13));
};

// Validação de CPF
export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/[^\d]/g, "");
  
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let result = (sum * 10) % 11;
  if (result === 10 || result === 11) result = 0;
  if (result !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  result = (sum * 10) % 11;
  if (result === 10 || result === 11) result = 0;
  return result === parseInt(cleanCPF.charAt(10));
};

// Prevenção de SQL Injection (para uso com MongoDB)
export const sanitizeMongoQuery = (query: any): any => {
  if (typeof query === "string") {
    return sanitizeInput(query);
  }
  
  if (Array.isArray(query)) {
    return query.map(item => sanitizeMongoQuery(item));
  }
  
  if (typeof query === "object" && query !== null) {
    const sanitized: any = {};
    for (const key in query) {
      // Remove operadores MongoDB perigosos se não forem esperados
      if (key.startsWith("$") && !["$eq", "$ne", "$gt", "$gte", "$lt", "$lte", "$in", "$nin"].includes(key)) {
        continue;
      }
      sanitized[key] = sanitizeMongoQuery(query[key]);
    }
    return sanitized;
  }
  
  return query;
};

// Verificação de HTTPS (para uso em produção)
export const enforceHTTPS = (): void => {
  if (typeof window !== "undefined" && 
      window.location.protocol === "http:" && 
      window.location.hostname !== "localhost" &&
      !window.location.hostname.startsWith("127.")) {
    window.location.href = window.location.href.replace("http:", "https:");
  }
};

// Limpeza de cache sensível
export const clearSensitiveCache = (): void => {
  // Remove dados sensíveis do sessionStorage e localStorage
  const sensitiveKeys = [
    "password",
    "token",
    "auth_token",
    "session",
    "credit_card",
    "cpf",
    "cnpj"
  ];
  
  sensitiveKeys.forEach(key => {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  });
  
  // Limpa dados de formulário do cache do navegador
  if (typeof window !== "undefined") {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.setAttribute("autocomplete", "off");
    });
  }
};

// Rate limiting simples (lado do cliente)
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, number[]>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove tentativas antigas
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit excedido
    }
    
    recentAttempts.push(now);
    attempts.set(identifier, recentAttempts);
    return true; // Permitido
  };
};

// Content Security Policy Headers (para configuração do servidor)
export const getCSPHeaders = (): Record<string, string> => {
  return {
    "Content-Security-Policy": 
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "img-src 'self' data: https:; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "connect-src 'self' https://api.jobin.app; " +
      "frame-ancestors 'none'; " +
      "base-uri 'self'; " +
      "form-action 'self';",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  };
};
