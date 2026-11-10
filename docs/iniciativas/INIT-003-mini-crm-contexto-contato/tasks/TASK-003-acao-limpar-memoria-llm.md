# [TASK-003] Botão e Ação de Limpar Contexto do LLM

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-003 - Mini-CRM](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
Durante testes de prompts ou em situações em que um lead fica preso em um fluxo repetitivo do chatbot, é fundamental que o operador ou desenvolvedor possa resetar a memória de contexto do LLM/bot para aquele número sem precisar deletar a conversa inteira do banco de dados.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/crm/ResetContextDialog.jsx` — Diálogo modal com confirmação e explicação da ação.

### Arquivos a Modificar
- `src/components/crm/ContactInfoSidebar.jsx` — Inserir a seção "Ações Avançadas" com o botão "Resetar Memória do Bot".

### Componentes de UI a Utilizar
- `@/components/ui/button`
- `@/components/ui/dialog` (ou modal existente)
- `lucide-react` (`RotateCcw`, `Sparkles`, `AlertTriangle`)

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
interface ResetContextDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  phoneNumber: string;
  onConfirmReset: () => Promise<void>;
  isLoading: boolean;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. A ação de reset deve exibir um alerta explicativo: *"Isso irá reiniciar a memória do chatbot para este contato. O histórico visual do chat será preservado, mas a IA responderá à próxima mensagem como um novo contato."*
2. Durante a execução da requisição de reset, o botão de confirmação exibe um spinner desabilitado.
3. Ao finalizar com sucesso, emitir notificação tipo Toast: *"Contexto do bot reiniciado com sucesso para este contato."*

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** O botão "Resetar Memória da IA" está acessível no rodapé da sidebar de contato.
- [ ] **Critério 2:** Clicar no botão abre o modal de confirmação explicando o impacto.
- [ ] **Critério 3:** Confirmar o reset dispara o callback assíncrono e fecha o diálogo com feedback de sucesso.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `ResetContextDialog.jsx` com modal de confirmação.
- [ ] **Passo 2:** Inserir o botão de acionamento em `ContactInfoSidebar.jsx`.
- [ ] **Passo 3:** Conectar o estado de loading e feedback de toast.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-003-mini-crm-contexto-contato/tasks/TASK-003-acao-limpar-memoria-llm.md`.
Implemente o componente `ResetContextDialog.jsx` e o botão correspondente em `src/components/crm/ContactInfoSidebar.jsx`, permitindo resetar o contexto de conversa do bot com diálogo de confirmação.
```

