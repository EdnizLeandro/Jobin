
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSessionTimeout } from './hooks/useSessionTimeout'
import { enforceHTTPS } from './utils/security'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Impact from './pages/Impact'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import LoginPage from './pages/LoginPage'
import UserTypeSelection from './pages/UserTypeSelection'
import ExploreCapacitations from './pages/ExploreCapacitations'
import MyCapacitations from './pages/MyCapacitations'
import Gamification from './pages/Gamification'
import ProfessionalProfile from './pages/ProfessionalProfile'
import ContractorProfile from './pages/ContractorProfile'
import ContractManagement from './pages/ContractManagement'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import AccessibilitySettings from './pages/AccessibilitySettings'
import Analytics from './pages/Analytics'
import AdminLogin from './pages/AdminLogin'
import AdminPanel from './pages/AdminPanel'

// Component to handle scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function App() {
  // Gerenciamento de timeout de sessão (30 minutos de inatividade)
  useSessionTimeout({ timeoutMinutes: 30, warningMinutes: 5 })

  // Força HTTPS em produção
  useEffect(() => {
    enforceHTTPS()
  }, [])

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Toaster position="top-right" />
        <Navbar />
        <main className="pt-16">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/funcionalidades" element={<Features />} />
            <Route path="/como-funciona" element={<HowItWorks />} />
            <Route path="/impacto" element={<Impact />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/contato" element={<Contact />} />
            
            {/* Rotas de Autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/entrar" element={<LoginPage />} />
            <Route path="/selecionar-tipo" element={<UserTypeSelection />} />
            
            {/* Rotas de Funcionalidades */}
            <Route path="/capacitacoes" element={<ExploreCapacitations />} />
            <Route path="/minhas-capacitacoes" element={<MyCapacitations />} />
            <Route path="/gamificacao" element={<Gamification />} />
            <Route path="/perfil-profissional" element={<ProfessionalProfile />} />
            <Route path="/perfil-contratante" element={<ContractorProfile />} />
            <Route path="/contratos" element={<ContractManagement />} />
            <Route path="/mensagens" element={<Messages />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/acessibilidade" element={<AccessibilitySettings />} />
            
            {/* Rota de Analytics/Relatórios - Protegida */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/relatorios" element={<Analytics />} />
            
            {/* Rotas Administrativas */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
            
            {/* Redirecionamentos */}
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            
            {/* Rota 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
