# [ADR-001] Adoção de React 19, Vite, Tailwind CSS v4 e Shadcn/UI

| Metadado | Detalhe |
| :--- | :--- |
| **Status** | ✅ Aceito |
| **Data** | 2026-11-10 |
| **Autores** | Time de Engenharia Núcleo3Pro |
| **Iniciativa Relacionada** | Ecossistema Geral (Painel Web) |

---

## 1. 🔍 Contexto & Problema
O projeto Núcleo3Pro necessita de um Painel Administrativo moderno, performático e altamente responsivo para gerenciar cursos, editais, leads de WhatsApp e relatórios de vendas.
Precisamos de uma base tecnológica que proporcione:
1. Tempo de inicialização e hot-reload quase instantâneos durante o desenvolvimento.
2. Componentes de UI acessíveis, customizáveis e fáceis de compor.
3. Máxima compatibilidade e facilidade de geração de código consistente por ferramentas de IA (Antigravity, Cursor, Copilot).
4. Bundle leve e veloz para produção.

---

## 2. 💡 Decisão Proposta
Adotar o seguinte stack no frontend:
- **Framework & Runtime:** React 19 com Vite 8 (ESM nativo, ultra-rápido).
- **Estilização:** Tailwind CSS v4 com integração via `@tailwindcss/vite`.
- **Design System / Componentes de UI:** Shadcn/UI (`@base-ui/react` / Radix) com `class-variance-authority` para variantes de componentes.
- **Ícones:** `lucide-react` (primário) e `@phosphor-icons/react` (secundário/específico).
- **Linter:** `oxlint` para checagem rápida de qualidade de código.

---

## 3. ⚖️ Consequências

### Pontos Positivos (Ganhos)
- **Produtividade Acelerada:** Vite e Tailwind v4 eliminam gargalos de compilação.
- **Controle Total de Código (Sem Bloat):** Shadcn não é uma dependência fechada de `node_modules`; o código dos componentes vive diretamente em `src/components/ui/`, permitindo customização irrestrita.
- **Excelente para IAs:** Modelos de linguagem modernos dominam React, Tailwind CSS e componentes Shadcn, produzindo código compatível com mínimo índice de erros ou alucinações.

### Pontos Negativos / Trade-offs (Custos & Riscos)
- Adoção de React 19 e Tailwind v4 representa tecnologia de ponta, podendo ocasionalmente requerer atenção a bibliotecas legadas de terceiros ainda presas ao React 18.

---

## 4. 🔄 Alternativas Consideradas & Motivo do Descarte

| Alternativa | Prós | Contras | Motivo do Descarte |
| :--- | :--- | :--- | :--- |
| **Create React App / Webpack** | Familiar | Lento, descontinuado, overhead de configuração | Obsoleto |
| **MUI (Material UI)** | Biblioteca completa | Muito pesado, difícil de customizar o tema para o design do Núcleo3Pro | Perda de flexibilidade e bundle inchado |
| **Chakra UI** | Bom sistema de props | Mudanças recentes de versão e complexidade de runtime CSS-in-JS | Pior desempenho que Tailwind |

---

## 5. 📌 Diretrizes de Aplicação Prática

1. **Localização de Componentes:** Componentes base ficam em `src/components/ui/`. Componentes de negócio ficam em `src/components/{modulo}/` (ex: `src/components/chat/`, `src/components/leads/`).
2. **Utilidade `cn()`:** Sempre utilize a função helper `cn()` (`clsx` + `tailwind-merge`) para mesclar classes Tailwind condicionais.
3. **Ícones:** Antes de instalar outro pacote de ícones, utilize os disponíveis em `lucide-react`.

