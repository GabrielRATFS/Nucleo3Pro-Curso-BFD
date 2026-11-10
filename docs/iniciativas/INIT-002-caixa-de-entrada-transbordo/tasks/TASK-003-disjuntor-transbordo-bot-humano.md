# [TASK-003] Disjuntor de Transbordo (Assumir e Encerrar Atendimento)

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-002 - Caixa de Entrada](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Crítica |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
O ponto mais sensível de uma operação híbrida (Bot + Humano) é garantir que o bot não envie respostas automáticas enquanto o atendente estiver conversando com o lead, e vice-versa. O controle de estado, apelidado de **"Disjuntor"**, deve ser um botão visual e inequívoco no cabeçalho do chat que permite alternar o controle entre a IA e o humano com segurança.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/chat/CircuitBreakerControl.jsx` — Barra de controle do transbordo com botões de ação e status atual.

### Arquivos a Modificar
- `src/components/chat/ChatWindow.jsx` — Integrar o controle ao topo do chat.
- `src/components/chat/ChatInput.jsx` — Habilitar ou avisar o operador quando o bot estiver ativo.

### Componentes de UI a Utilizar
- `@/components/ui/button`
- `@/components/ui/badge`
- `lucide-react` (`UserCheck`, `Bot`, `Power`, `CheckCircle2`, `AlertTriangle`)

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
type AttendanceState = 'BOT' | 'WAITING_HUMAN' | 'HUMAN';

interface CircuitBreakerControlProps {
  state: AttendanceState;
  onTakeOver: () => Promise<void>; // Assumir atendimento (pausa bot)
  onReturnToBot: () => Promise<void>; // Encerrar atendimento humano e devolver ao bot
  isLoading?: boolean;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. **Estado `WAITING_HUMAN` ou `BOT`:**
   - Exibe botão verde em destaque: **"Assumir Atendimento"** (com ícone `UserCheck`).
   - Se o operador tentar digitar e enviar uma mensagem enquanto o bot ainda está ativo, o sistema pode perguntar se ele deseja assumir o atendimento automaticamente antes de enviar.
2. **Estado `HUMAN`:**
   - O cabeçalho exibe aviso: *"Você está no controle desta conversa. Respostas automáticas do bot estão pausadas."*
   - Exibe botão secundário/outline: **"Encerrar Atendimento (Devolver ao Bot)"**.
3. **Confirmação:**
   - Ao clicar em "Encerrar Atendimento", pode ser exibido um toast de confirmação avisando que o fluxo de IA foi reativado para aquele número.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Quando o estado for `WAITING_HUMAN`, o botão "Assumir Atendimento" fica em evidência.
- [ ] **Critério 2:** Ao clicar em "Assumir Atendimento", o status da conversa muda para `IN_ATTENDANCE` e a conversa migra de aba no menu lateral.
- [ ] **Critério 3:** Ao clicar em "Encerrar", o webhook do bot é reativado e a conversa volta para a aba `Com o Bot`.
- [ ] **Critério 4:** Estados de loading nos botões para evitar múltiplos cliques rápidos.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `CircuitBreakerControl.jsx` com visual adaptável ao estado atual.
- [ ] **Passo 2:** Integrar a barra de status e botões de ação no topo de `ChatWindow.jsx`.
- [ ] **Passo 3:** Adicionar feedback visual (toast ou banner) informando o estado da automação.
- [ ] **Passo 4:** Conectar a lógica de alternância de estado à lista de conversas.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-002-caixa-de-entrada-transbordo/tasks/TASK-003-disjuntor-transbordo-bot-humano.md`.
Implemente o componente `CircuitBreakerControl.jsx` e conecte-o ao `ChatWindow.jsx`, gerenciando as ações de "Assumir Atendimento" e "Encerrar Atendimento (Devolver ao Bot)" com feedbacks visuais claros.
```

