# [TASK-001] Fila de Conversas em 3 Abas com Badges de Contagem

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-002 - Caixa de Entrada](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Alta |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
A coluna esquerda do painel administrativo deve organizar todas as conversas ativas em 3 abas simples utilizando o componente `Tabs` do Shadcn/UI: `Com o Bot`, `Aguardando Humano` e `Em Atendimento`. Cada item da lista deve exibir o avatar do contato, nome/número, última mensagem resumida e horário relativo.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/chat/ConversationList.jsx` — Container com as 3 abas e lista scrollável.
- `src/components/chat/ConversationCard.jsx` — Card individual de cada conversa.

### Componentes de UI a Utilizar
- `@/components/ui/tabs` (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`)
- `@/components/ui/avatar` (`Avatar`, `AvatarFallback`, `AvatarImage`)
- `@/components/ui/badge` (`Badge` para contadores e status)
- `@/components/ui/scroll-area` (ou scroll Tailwind `overflow-y-auto`)

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
type ConversationStatus = 'BOT' | 'WAITING_HUMAN' | 'IN_ATTENDANCE';

interface ConversationSummary {
  id: string;
  contactName: string;
  phoneNumber: string;
  avatarUrl?: string;
  status: ConversationStatus;
  lastMessageText: string;
  lastMessageTimestamp: string;
  unreadCount?: number;
}

interface ConversationListProps {
  conversations: ConversationSummary[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  currentTab: ConversationStatus;
  onTabChange: (tab: ConversationStatus) => void;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. A aba `Aguardando Humano` deve ter um badge visual de alerta (vermelho ou laranja) exibindo a quantidade de conversas pendentes.
2. Cada card deve destacar visualmente quando estiver selecionado (`bg-accent` ou borda destacada).
3. Texto da última mensagem deve ser truncado com `truncate` (ellipsis) para não quebrar o layout.
4. Caso uma aba não possua conversas, renderizar um estado vazio amigável: "Nenhuma conversa nesta fila no momento".

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Alternar entre as 3 abas filtra corretamente a lista de conversas conforme o status.
- [ ] **Critério 2:** O contador de conversas da aba "Aguardando Humano" reflete exatamente a quantidade de itens pendentes.
- [ ] **Critério 3:** Clicar em um card seleciona a conversa e atualiza o estado global/pai.
- [ ] **Critério 4:** Horários exibem formatação amigável (ex: "14:32" ou "Ontem").

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar componente `ConversationCard.jsx` com avatar, dados e truncamento.
- [ ] **Passo 2:** Criar `ConversationList.jsx` com as abas usando `Tabs` de Shadcn/UI.
- [ ] **Passo 3:** Implementar badge dinâmico de contagem em cada trigger da aba.
- [ ] **Passo 4:** Tratar o estado vazio para cada uma das abas.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-002-caixa-de-entrada-transbordo/tasks/TASK-001-fila-conversas-tabs.md`.
Implemente os componentes `ConversationList.jsx` e `ConversationCard.jsx` em `src/components/chat/` utilizando Shadcn UI (Tabs, Avatar, Badge) e Tailwind CSS.
```

