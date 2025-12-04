corrija todo: # 🟣 Jobin - Soluções Criativas para Jovens em Transformação

Uma plataforma digital criada por alunos da **UFRPE** em um projeto (Mundo 2) para apoiar jovens na retomada dos estudos, no desenvolvimento de habilidades e na entrada no mercado de trabalho por meio de ferramentas educacionais, oportunidades profissionais e soluções centradas no ser humano.

---

## ✨ Resumo do Projeto

O **Jobin** é uma plataforma web moderna, responsiva e inclusiva, projetada com **Design Centrado no Humano (HCD)** e pensada para jovens da **Região Metropolitana do Recife (RMR)**.  Seu objetivo é combater a inatividade juvenil oferecendo acesso a cursos, oportunidades de emprego, ferramentas de acompanhamento e suporte ao desenvolvimento pessoal e profissional. 

A plataforma conecta jovens a contratantes, capacitações, trilhas de estudo e funcionalidades que estimulam autonomia e geração de renda local.

---

## 🎯 Objetivos da Plataforma

- Capacitar jovens com cursos, treinamentos e trilhas de desenvolvimento.  
- Conectar profissionais e contratantes, facilitando o acesso ao mercado.  
- Acompanhar o progresso e evolução dos usuários.  
- Criar um espaço interativo, intuitivo e motivador.  
- Promover inclusão social e desenvolvimento regional.

---

## 🌐 Site Oficial

👉 [https://jobin-website.lumi.ing/](https://jobin-website.lumi.ing/)

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação e Segurança
- Login e logout com **Lumi Authentication System**  
- Sessão com timeout automático (15 min)  
- JWT, proteção de rotas, rate limiting e sanitização  
- CSP Headers e HTTPS forçado  

### 📊 Dashboard de Progresso
- Acompanhamento de cursos e trilhas evolutivas  
- Indicadores de avanço e metas pessoais  

### 🎓 Catálogo de Capacitações
- Cursos de:
  - Empreendedorismo  
  - Habilidades técnicas e sociais  
  - Desenvolvimento pessoal e profissional  

### 💼 Oportunidades Profissionais
- Conexão entre jovens e empresas contratantes  
- Sistema de propostas, aceite e contratos  

### 💬 Chat Interativo *(em desenvolvimento)*
- Comunicação entre profissionais e contratantes  
- Troca de mensagens e informações sobre serviços  

### 🏅 Gamificação
- Pontos, badges, rankings e conquistas  
- Engajamento e incentivo contínuo  

### 📈 Analytics do Mercado
- Integração com **Streamlit Dashboard**  
- **Novo CAGED** - análise atualizada do mercado da RMR  

### 🔔 Notificações em Tempo Real
- Alertas personalizados  
- Atualizações de cursos, oportunidades e mensagens  

### 🧩 Acessibilidade
- Ajuste de contraste  
- Controle de tamanho de fonte  
- Leitor de tela e navegação inclusiva  

### 🛠️ Painel Administrativo (RBAC)
- Gerenciamento completo de usuários  
- Controle de conteúdo e permissões  

---

## 🧪 Tech Stack

### Frontend
- React + TypeScript *(strict mode)*  
- Vite  
- Tailwind CSS  
- **Design System:**
  - Material Design  
  - Flat Design  
  - Paleta: roxo | lilás | branco  

### Backend
- Lumi SDK (Auth, MongoDB, File Upload, Email, Analytics)  
- Streamlit Dashboard  
- Com dados do **Novo CAGED**

---

## 📁 Estrutura do Projeto
```bash
/src
  /components         # Componentes reutilizáveis (Navbar, Footer, etc.)
  /pages              # Páginas (Home, Features, Analytics, etc.)
  /hooks              # Custom hooks (useAuth, useContracts, etc.)
  /utils              # Segurança, rate limiter, sanitização
  /lib                # Configuração do cliente Lumi SDK
  /entities           # Schemas JSON do banco
/public               # Arquivos estáticos
.lumi                 # Documentação interna

---


---

## ✅ Funcionalidades Atuais

- **🔐 Autenticação Completa**  
  - `src/hooks/useAuth.ts`  
  - `src/hooks/useSessionTimeout.ts`  
  - `src/pages/Login.tsx`  

- **👥 Perfis de Usuário (Profissional e Contratante)**  
  - `src/pages/ProfessionalProfile.tsx`  
  - `src/pages/ContractorProfile.tsx`  

- **🎓 Sistema de Capacitações**  
  - `src/pages/ExploreCapacitations.tsx`  
  - `src/pages/MyCapacitations.tsx`  

- **🏅 Gamificação**  
  - `src/pages/Gamification.tsx`  

- **📈 Analytics e Mercado da RMR**  
  - `src/pages/Analytics.tsx`  

- **📄 Gestão de Contratos**  
  - `src/pages/ContractManagement.tsx`  
  - `src/hooks/useContracts.ts`  

- **💬 Sistema de Mensagens (em desenvolvimento)**  
  - `src/pages/Messages.tsx`  

- **🔔 Notificações em Tempo Real**  
  - `src/pages/Notifications.tsx`  
  - `src/hooks/useNotifications.ts`  

- **🧩 Acessibilidade**  
  - `src/pages/AccessibilitySettings.tsx`  

- **🛠️ Painel Administrativo (RBAC)**  
  - `src/pages/AdminPanel.tsx`  
  - `src/hooks/useAdminAuth.ts`  

- **📬 Contato e Newsletter**  
  - `src/pages/Contact.tsx`  
  - `src/hooks/useContactForm.ts`  
  - `src/components/NewsletterSignup.tsx`  
  - `src/hooks/useNewsletter.ts`  

- **📱 Rastreamento de Downloads**  
  - `src/hooks/useAppDownload.ts`  

- **🔒 Segurança Avançada**  
  - `src/utils/security.ts`  
  - `src/utils/rateLimiter.ts`  

- **📱 Responsividade Total**
  - *Mobile-first*  
  - `src/index.css`

---

## 🛠️ Como Rodar o Projeto Localmente

