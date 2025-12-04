

## 🟣 Jobin – Soluções Criativas para Jovens em Transformação

Uma plataforma digital criada por alunos da UFRPE para o projeto (Mundo 2), apoiar jovens na retomada dos estudos, no desenvolvimento de habilidades e na entrada no mercado de trabalho, por meio de ferramentas educacionais, oportunidades profissionais e soluções centradas no ser humano.

---

## ✨ Resumo do Projeto

O **Jobin** é uma plataforma web moderna, responsiva e inclusiva, projetada com **Design Centrado no Humano (HCD)** e desenvolvida especialmente para jovens da Região Metropolitana do Recife (RMR).

Seu objetivo é combater a inatividade juvenil oferecendo acesso a cursos, oportunidades de emprego, ferramentas de acompanhamento e suporte ao desenvolvimento pessoal e profissional.

A plataforma conecta jovens a contratantes, capacitações, trilhas de estudo e funcionalidades que estimulam autonomia e geração de renda local.

---

## 🎯 Objetivos da Plataforma

* Capacitar jovens com cursos, treinamentos e trilhas de desenvolvimento.
* Conectar profissionais e contratantes, facilitando acesso ao mercado.
* Acompanhar o progresso e evolução dos usuários.
* Criar um espaço interativo, intuitivo e motivador.
* Promover inclusão social e desenvolvimento regional.

---

### 🌐 Site Oficial

👉 [https://jobin-website.lumi.ing/](https://jobin-website.lumi.ing/)

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação e Segurança

* Login e logout com **Lumi Authentication System**
* Timeout automático (15 min)
* JWT, proteção de rotas, rate limiting, sanitização
* CSP Headers e HTTPS forçado

### 📊 Dashboard de Progresso

* Acompanhamento de cursos e trilhas evolutivas
* Indicadores de avanço e metas pessoais

### 🎓 Catálogo de Capacitações

Cursos de:

* Empreendedorismo
* Habilidades técnicas e sociais
* Desenvolvimento pessoal e profissional

### 💼 Oportunidades Profissionais

* Conexão entre jovens e contratantes
* Sistema de propostas, aceite e contratos

### 💬 Chat Interativo *(em desenvolvimento)*

* Comunicação entre profissionais e contratantes
* Troca de mensagens e informações

### 🏅 Gamificação

* Pontos, badges, rankings e conquistas
* Incentivo e engajamento constante

### 📈 Analytics do Mercado

* Integração com **Streamlit Dashboard**
* Dados do Novo CAGED da RMR

### 🔔 Notificações em Tempo Real

* Alertas personalizados
* Atualizações de cursos, oportunidades e mensagens

### 🧩 Acessibilidade

* Ajuste de contraste
* Tamanho de fonte
* Leitor de tela e navegação inclusiva

### 🛠️ Painel Administrativo (RBAC)

* Gerenciamento completo de usuários
* Controle de conteúdo e permissões

---

## 🧪 Tech Stack

### **Frontend**

* React + TypeScript
* Vite
* Tailwind CSS
* Design System:

  * Material Design
  * Flat Design
  * Paleta: roxo | lilás | branco

### **Backend**

* **Lumi SDK**

  * Auth
  * MongoDB
  * File Upload
  * Email

### **Analytics**

* Streamlit Dashboard
* Integração com Novo CAGED

---

## 📁 Estrutura do Projeto

```
/src
  /components         # Componentes reutilizáveis (Navbar, Footer, etc.)
  /pages              # Páginas (Home, Features, Analytics, etc.)
  /hooks              # Custom hooks (useAuth, useContracts, etc.)
  /utils              # Segurança, rate limiter, sanitização
  /lib                # Configuração do cliente Lumi SDK
  /entities           # Schemas JSON do banco
/public               # Arquivos estáticos
.lumi                 # Documentação interna
```

---

## ✅ Funcionalidades Atuais

### 🔐 Autenticação Completa

* src/hooks/useAuth.ts
* src/hooks/useSessionTimeout.ts
* src/pages/Login.tsx

### 👥 Perfis de Usuário

* ProfessionalProfile.tsx
* ContractorProfile.tsx

### 🎓 Sistema de Capacitações

* ExploreCapacitations.tsx
* MyCapacitations.tsx

### 🏅 Gamificação

* Gamification.tsx

### 📈 Analytics

* Analytics.tsx

### 📄 Gestão de Contratos

* ContractManagement.tsx
* useContracts.ts

### 💬 Mensagens *(em desenvolvimento)*

* Messages.tsx

### 🔔 Notificações

* Notifications.tsx
* useNotifications.ts

### 🧩 Acessibilidade

* AccessibilitySettings.tsx

### 🛠️ Painel Administrativo (RBAC)

* AdminPanel.tsx
* useAdminAuth.ts

### 📬 Contato e Newsletter

* Contact.tsx
* useContactForm.ts
* NewsletterSignup.tsx
* useNewsletter.ts

### 📱 Rastreamento de Downloads

* useAppDownload.ts

### 🔒 Segurança Avançada

* security.ts
* rateLimiter.ts

### 📱 Responsividade

* Mobile-first
* index.css

---

## 🛠️ Como Rodar o Projeto Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/jobin.git

# 2. Acesse o diretório
cd jobin

# 3. Instale as dependências
npm install

# 4. Rode o projeto
npm run dev
```

---

## 📄 Licença

Distribuído sob licença **MIT**.

---

## 💜 Desenvolvido com propósito para a juventude da RMR

O Jobin acredita no potencial transformador da juventude e na tecnologia como ponte para o futuro.

---
