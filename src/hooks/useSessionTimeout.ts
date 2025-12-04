/**
 * Hook para gerenciar timeout de sessão por inatividade
 * Desloga automaticamente o usuário após período de inatividade
 */

import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

interface UseSessionTimeoutOptions {
  timeoutMinutes?: number; // Tempo de inatividade em minutos
  warningMinutes?: number; // Minutos antes do timeout para mostrar aviso
}

export const useSessionTimeout = (options: UseSessionTimeoutOptions = {}) => {
  const { timeoutMinutes = 30, warningMinutes = 5 } = options;
  const { isAuthenticated, signOut } = useAuth();
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  // Limpa os timers
  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      warningRef.current = null;
    }
  }, []);

  // Faz logout por inatividade
  const handleTimeout = useCallback(() => {
    clearTimers();
    signOut();
    toast.error("Sua sessão expirou por inatividade. Faça login novamente.", {
      duration: 5000
    });
  }, [signOut, clearTimers]);

  // Mostra aviso de timeout iminente
  const showWarning = useCallback(() => {
    toast("Sua sessão expirará em breve por inatividade. Mova o mouse para continuar.", {
      icon: "⚠️",
      duration: 4000
    });
  }, []);

  // Reseta os timers de inatividade
  const resetTimers = useCallback(() => {
    if (!isAuthenticated) return;

    clearTimers();
    lastActivityRef.current = Date.now();

    // Timer para o aviso
    const warningTime = (timeoutMinutes - warningMinutes) * 60 * 1000;
    warningRef.current = setTimeout(showWarning, warningTime);

    // Timer para o logout
    const timeoutTime = timeoutMinutes * 60 * 1000;
    timeoutRef.current = setTimeout(handleTimeout, timeoutTime);
  }, [isAuthenticated, timeoutMinutes, warningMinutes, clearTimers, showWarning, handleTimeout]);

  // Eventos que indicam atividade do usuário
  useEffect(() => {
    if (!isAuthenticated) {
      clearTimers();
      return;
    }

    // Inicializa os timers
    resetTimers();

    // Lista de eventos que indicam atividade
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click"
    ];

    // Throttle para não resetar os timers a cada movimento
    let throttleTimer: NodeJS.Timeout | null = null;
    const handleActivity = () => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        resetTimers();
        throttleTimer = null;
      }, 1000); // Throttle de 1 segundo
    };

    // Adiciona listeners
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      if (throttleTimer) clearTimeout(throttleTimer);
      clearTimers();
    };
  }, [isAuthenticated, resetTimers, clearTimers]);

  // Monitora mudanças de visibilidade da página
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Página ficou oculta, salva o tempo
        lastActivityRef.current = Date.now();
      } else {
        // Página ficou visível novamente
        const inactiveTime = Date.now() - lastActivityRef.current;
        const maxInactiveTime = timeoutMinutes * 60 * 1000;

        if (inactiveTime >= maxInactiveTime) {
          // Tempo de inatividade excedido enquanto a página estava oculta
          handleTimeout();
        } else {
          // Reseta os timers
          resetTimers();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated, timeoutMinutes, handleTimeout, resetTimers]);

  return {
    resetTimers,
    clearTimers
  };
};
