# Hollow Knight FAQ

Um site completo de tutoriais e guias para Hollow Knight, desenvolvido com React, TypeScript e Tailwind CSS.

## 🎮 Sobre o Projeto

O Hollow Knight FAQ é uma plataforma dedicada a fornecer tutoriais detalhados, guias de chefes, estratégias de builds e dicas avançadas para jogadores de Hollow Knight. O site foi projetado com foco em usabilidade, organização de conteúdo e design moderno inspirado no universo do jogo.

## ✨ Funcionalidades

### 📱 Páginas Principais
- **Home**: Página inicial com tutoriais em destaque e estatísticas
- **Tutoriais**: Lista completa de tutoriais com filtros e busca
- **Tutorial Individual**: Visualização detalhada de cada tutorial
- **Sobre**: Informações sobre o projeto e equipe
- **Contato**: Formulário de contato e informações de suporte

### 🔍 Sistema de Busca e Filtros
- Busca por título, descrição e tags
- Filtros por categoria (Iniciante, Chefes, Equipamentos, etc.)
- Filtros por nível de dificuldade
- Interface responsiva para mobile e desktop

### 🎨 Design e UX
- Tema escuro inspirado no jogo
- Cores douradas e prateadas como destaque
- Animações suaves e transições fluidas
- Layout responsivo para todos os dispositivos
- Tipografia moderna e legível

### 📊 Conteúdo
- 6 tutoriais completos com dados mock
- Categorias organizadas por tipo de conteúdo
- Sistema de likes e comentários (simulado)
- Metadados completos (autor, data, tempo de leitura)

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilos
- **React Router** - Roteamento
- **Lucide React** - Ícones
- **Vite** - Build tool (via Create React App)

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre no diretório
cd hollow-knight-faq

# Instale as dependências
npm install

# Execute o projeto
npm start
```

O projeto estará disponível em `http://localhost:3000`

### Scripts Disponíveis
```bash
npm start          # Executa o projeto em modo de desenvolvimento
npm run build      # Cria build de produção
npm test           # Executa os testes
npm run eject      # Ejecta do Create React App (não recomendado)
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho com navegação
│   ├── Footer.tsx      # Rodapé com links
│   ├── Layout.tsx      # Layout principal
│   ├── TutorialCard.tsx # Card de tutorial
│   └── CategoryFilter.tsx # Filtro de categorias
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial
│   ├── Tutorials.tsx   # Lista de tutoriais
│   ├── TutorialDetail.tsx # Detalhes do tutorial
│   ├── About.tsx       # Página sobre
│   └── Contact.tsx     # Página de contato
├── data/               # Dados mock
│   └── tutorials.ts    # Tutoriais e categorias
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── assets/             # Recursos estáticos
├── App.tsx             # Componente principal
├── index.tsx           # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎯 Funcionalidades Implementadas

### ✅ Requisitos Funcionais
- [x] Página inicial com banner e cards de tutoriais
- [x] Sistema de busca funcional
- [x] Filtros por categoria
- [x] Páginas de tutoriais individuais
- [x] Sistema de navegação completo
- [x] Layout responsivo
- [x] Formulário de contato
- [x] Página sobre com informações da equipe

### ✅ Requisitos Visuais
- [x] Tema escuro com cores do jogo
- [x] Tipografia moderna (Inter)
- [x] Componentes com sombras e transições
- [x] Ícones consistentes (Lucide)
- [x] Animações suaves
- [x] Design responsivo

### ✅ Requisitos Técnicos
- [x] Estrutura de pastas organizada
- [x] Componentes reutilizáveis
- [x] Dados mock em TypeScript
- [x] Sistema de rotas
- [x] Compatibilidade com navegadores modernos

## 🔮 Próximos Passos

### Funcionalidades Futuras
- [ ] Sistema de autenticação
- [ ] Comentários funcionais
- [ ] Sistema de favoritos
- [ ] API real para tutoriais
- [ ] Sistema de avaliações
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

### Melhorias Técnicas
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Otimização de performance
- [ ] SEO melhorado
- [ ] Analytics
- [ ] Monitoramento de erros

## 🤝 Contribuição

Este projeto foi criado como demonstração de um site completo de tutoriais. Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é apenas para fins educacionais e de demonstração. Hollow Knight é uma marca registrada da Team Cherry.

## 👥 Equipe

- **GameMaster** - Criador de Conteúdo
- **BossHunter** - Especialista em Chefes
- **BuildMaster** - Especialista em Builds
- **ExplorerPro** - Explorador
- **SpeedRunner** - Speedrunner
- **Collector** - Colecionador

---

Feito com ❤️ para a comunidade de Hollow Knight