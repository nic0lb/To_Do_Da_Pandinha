# 🐼 To Do da Pandinha

> Um ambiente digital emocional, leve e personalizado, que mistura produtividade com cuidado pessoal.

O **To Do da Pandinha** é uma aplicação web de produtividade pessoal construída com **HTML, CSS e JavaScript puro** — sem frameworks e sem backend. A proposta não é ser só um "gerenciador de tarefas", mas um espaço acolhedor que ajuda a organizar a rotina com leveza, sem pressão.

> *"Organização deve trazer calma, não cobrança."*

---

## 🌸 Sobre o nome

"Pandinha" é uma referência carinhosa à usuária final do aplicativo. O panda simboliza calma, leveza e um ritmo desacelerado — o app foi pensado para parecer um presente personalizado, não uma ferramenta genérica corporativa.

---

## ✨ Funcionalidades

- **Home** — tela principal com saudação emocional dinâmica, resumo do dia, tarefas, hábitos, meta da semana e o "Cantinho da Pandinha" (mensagens motivacionais aleatórias)
- **Storage** — persistência de tarefas via `localStorage`, com API centralizada (`create`, `toggle`, `delete`, `list`)
- **Navegação** — sidebar (desktop) e bottom navigation (mobile), mobile-first

### 🚧 Em desenvolvimento

Tasks (CRUD visual), Hábitos, Metas, Notas, Planner, Estudos e Configurações já têm a estrutura de pastas prevista em `js/modules/`, mas ainda não têm implementação — são os próximos módulos do roadmap.

---

## 🧱 Arquitetura

Projeto **modular vanilla JS**, sem build step, sem dependências externas:

```
to_do_da_pandinha/
├── index.html              # entry point, carrega CSS e scripts na ordem correta
├── css/                    # design tokens e estilos globais
│   ├── variables.css       # cores, tipografia, espaçamento, sombras (design tokens)
│   ├── reset.css
│   ├── base.css
│   ├── layout.css          # grid da aplicação, breakpoints mobile-first
│   ├── components.css
│   ├── utilities.css
│   └── animations.css
├── js/
│   ├── core/                # lógica central e persistência
│   │   └── storage.js       # ÚNICA fonte de acesso ao localStorage
│   ├── ui/                  # componentes globais compartilhados
│   │   ├── sidebar.js
│   │   ├── bottomNavigation.js
│   │   └── header.js
│   ├── modules/
│   │   └── home/            # módulo ativo (referência de padrão)
│   │       ├── home.data.js      # textos e conteúdo emocional
│   │       ├── home.template.js  # template HTML (string) do módulo
│   │       ├── home.events.js    # listeners e interações
│   │       ├── home.js           # orquestrador: render + hydrate + events
│   │       └── home.css          # estilos exclusivos do módulo
│   └── app.js                # bootstrap da aplicação
└── README.md
```

### Regras arquiteturais

1. **Fonte única de dados** — todo acesso a `localStorage` passa exclusivamente por `js/core/storage.js`. Nenhum módulo acessa `localStorage` diretamente.
2. **Separação por responsabilidade** — `core/` (regras de negócio e persistência), `modules/` (features), `ui/` (interface global compartilhada).
3. **Padrão de módulo** — cada módulo segue a sequência `data → template → events → js (orquestrador)`, replicando o padrão já validado no módulo `home`.
4. **Sem framework, sem bundler** — funções globais simples via `<script>` tags carregadas na ordem correta em `index.html`.

### Fluxo de inicialização

```
index.html
   └─ carrega CSS (tokens → reset → base → layout → components → utilities → animations → módulos)
   └─ carrega JS na ordem: core → ui → módulo home (data → template → events → js) → app.js
        └─ DOMContentLoaded dispara app.js
             ├─ renderSidebar()
             ├─ renderBottomNavigation()
             ├─ renderHeader()
             └─ renderHome()
                  ├─ injeta homeTemplate() em #main-content
                  ├─ hydrateHome() → preenche saudação, mensagem, data e pensamento do dia
                  └─ homeEvents() → prepara interações futuras
```

---

## 💾 Storage — API

```js
window.Storage = {
  getTasks,
  createTask,
  toggleTask,
  deleteTask
}
```

Estrutura de uma task:

```js
{
  id: number,
  title: string,
  completed: boolean,
  createdAt: string
}
```

---

## 🎨 Identidade visual

- Paleta suave: creme, rosa, branco (design tokens em `css/variables.css`)
- Elementos arredondados, espaçamento amplo
- Tipografia: **Poppins** (títulos) + **Inter** (corpo)
- Mobile-first, com breakpoints `min-width: 768px` e `min-width: 1024px`
- Linguagem de interface emocional e humana — evita termos como "dashboard" ou "controle"

---

## ▶️ Como rodar

Como é um projeto 100% estático (sem backend, sem build), basta servir os arquivos com qualquer servidor HTTP simples:

```bash
# Python
python3 -m http.server 8000

# ou Node
npx serve .
```

Depois acesse `http://localhost:8000`.

> Abrir `index.html` diretamente via `file://` também funciona, já que não há chamadas `fetch` a arquivos locais — os templates são strings JS, não HTML fetchado.

---

## ✅ Status atual

| Item | Status |
|---|---|
| Home renderiza | ✅ |
| Sidebar / Header / Bottom nav | ✅ |
| Storage funcional | ✅ |
| Sem erros no console | ✅ |
| CRUD visual de tarefas | 🚧 |
| Hábitos / Metas / Notas / Planner / Estudos / Configurações | 🚧 (scaffolding criado, sem implementação) |
| State manager formal (`state.js`) | 🚧 planejado |

---

## 🚀 Roadmap

1. UI de adicionar/editar/remover tarefas (CRUD visual)
2. Interações com feedback visual (toggle animado, toasts)
3. Implementar módulos de Hábitos e Metas com dados reais
4. Criar `state.js` — camada de estado centralizada
5. Evoluir para uma versão de design mais refinada ("premium polish")

---

## 🧠 Filosofia de produto

Diferente de um to-do tradicional, a experiência prioriza sensação de calma sobre métricas e cobrança — inspirada em apps de bem-estar e journaling emocional, não em ferramentas corporativas de produtividade.
