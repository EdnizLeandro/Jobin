🟣 Jobin - Soluções Criativas para Jovens em Transformação
Uma plataforma digital criada por alunos UFRPE para apoiar jovens na retomada dos estudos, no desenvolvimento de habilidades e na entrada no mercado de trabalho, por meio de ferramentas educacionais, oportunidades profissionais e soluções centradas no ser humano.
________________________________________
✨ Resumo do Projeto
O Jobin é uma plataforma web moderna, responsiva e inclusiva, projetada com Design Centrado no Humano (HCD) e pensada para jovens da Região Metropolitana do Recife (RMR).
Seu objetivo é combater a inatividade juvenil oferecendo acesso a cursos, oportunidades de emprego, ferramentas de acompanhamento e suporte ao desenvolvimento pessoal e profissional.
A plataforma conecta jovens a contratantes, capacitações, trilhas de estudo e funcionalidades que estimulam autonomia e geração de renda local.
________________________________________
🎯 Objetivos da Plataforma
•	Capacitar jovens com cursos, treinamentos e trilhas de desenvolvimento.
•	Conectar profissionais e contratantes, facilitando acesso ao mercado.
•	Acompanhar o progresso e evolução dos usuários.
•	Criar um espaço interativo, intuitivo e motivador.
•	Promover inclusão social e desenvolvimento regional.
________________________________________

Site Oficial: https://jobin-website.lumi.ing/

🚀 Funcionalidades Principais
🔐 Autenticação e Segurança
•	Login e logout com Lumi Authentication System
•	Sessão com timeout automático (15 min)
•	JWT, proteção de rotas, rate limiting e sanitização
•	CSP Headers e HTTPS forçado
📊 Dashboard de Progresso
•	Acompanhamento de cursos e trilhas evolutivas
•	Indicadores de avanço e metas pessoais
🎓 Catálogo de Capacitações
•	Cursos de:
o	Empreendedorismo
o	Habilidades técnicas e sociais
o	Desenvolvimento pessoal e profissional
💼 Oportunidades Profissionais
•	Conexão entre jovens e empresas contratantes
•	Sistema de propostas, aceite e contratos
💬 Chat Interativo (em desenvolvimento)
•	Comunicação entre profissionais e contratantes
•	Troca de mensagens e informações sobre serviços
🏅 Gamificação
•	Pontos, badges, rankings e conquistas
•	Engajamento e incentivo contínuo
📈 Analytics do Mercado
•	Integração com Streamlit Dashboard
•	Novo CAGED - análise atualizada do mercado da RMR
🔔 Notificações em Tempo Real
•	Alertas personalizados
•	Atualizações de cursos, oportunidades e mensagens
🧩 Acessibilidade
•	Ajuste de contraste
•	Tamanho de fonte
•	Leitor de tela e navegação inclusiva
🛠️ Painel Administrativo (RBAC)
•	Gerenciamento completo de usuários
•	Controle de conteúdo e permissões
________________________________________
🧪 Tech Stack
Frontend
•	React + TypeScript (strict mode)
•	Vite
•	Tailwind CSS
•	Design System:
o	Material Design
o	Flat Design
o	Paleta: roxo | lilás | branco
Backend
•	Lumi SDK
o	Auth
o	MongoDB
o	File Upload
o	Email
Analytics
•	Streamlit Dashboard
•	Integração com dados do Novo CAGED
________________________________________
📁 Estrutura do Projeto
/src
  /components         # Componentes reutilizáveis (Navbar, Footer, etc.)
  /pages              # Páginas (Home, Features, Analytics, etc.)
  /hooks              # Custom hooks (useAuth, useContracts, etc.)
  /utils              # Segurança, rate limiter, sanitização
  /lib                # Configuração do cliente Lumi SDK
  /entities           # Schemas JSON do banco
/public               # Arquivos estáticos
.lumi                 # Documentação interna
________________________________________
✅ Funcionalidades Atuais
🔐 Autenticação Completa
Arquivos principais:
•	src/hooks/useAuth.ts
•	src/hooks/useSessionTimeout.ts
•	src/pages/Login.tsx
👥 Perfis de Usuário (Profissional e Contratante)
•	src/pages/ProfessionalProfile.tsx
•	src/pages/ContractorProfile.tsx
🎓 Sistema de Capacitações
•	src/pages/ExploreCapacitations.tsx
•	src/pages/MyCapacitations.tsx
🏅 Gamificação
•	src/pages/Gamification.tsx
📈 Analytics e Mercado da RMR
•	src/pages/Analytics.tsx
📄 Gestão de Contratos
•	src/pages/ContractManagement.tsx
•	src/hooks/useContracts.ts
💬 Sistema de Mensagens (em desenvolvimento)
•	src/pages/Messages.tsx
🔔 Notificações em Tempo Real
•	src/pages/Notifications.tsx
•	src/hooks/useNotifications.ts
🧩 Acessibilidade
•	src/pages/AccessibilitySettings.tsx
🛠️ Painel Administrativo (RBAC)
•	src/pages/AdminPanel.tsx
•	src/hooks/useAdminAuth.ts
📬 Contato e Newsletter
•	src/pages/Contact.tsx
•	src/hooks/useContactForm.ts
•	src/components/NewsletterSignup.tsx
•	src/hooks/useNewsletter.ts
📱 Rastreamento de Downloads
•	src/hooks/useAppDownload.ts
🔒 Segurança Avançada
•	src/utils/security.ts
•	src/utils/rateLimiter.ts
📱 Responsividade Total
•	Mobile-first
•	src/index.css
________________________________________
🛠️ Como Rodar o Projeto Localmente
# 1. Clone o repositório
git clone https://github.com/seu-usuario/jobin.git

# 2. Acesse o diretório
cd jobin

# 3. Instale as dependências
npm install

# 4. Rode o projeto
npm run dev
________________________________________

📄 Licença
Este projeto é distribuído sob a licença MIT.
Sinta-se livre para usar, modificar e contribuir.
________________________________________
💜 Desenvolvido com propósito para a juventude da RMR
O Jobin é uma iniciativa que acredita no potencial transformador dos jovens e na tecnologia como ponte para o futuro.
