# [TASK-002] Integração com Input do Chat e Atalho de Teclado (/)

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-004 - Respostas Rápidas](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
Para que o operador não precise tirar as mãos do teclado durante um atendimento veloz, digitar `/` no início ou no corpo da mensagem no chat deve abrir sugestões inline de respostas rápidas, ou selecionar a resposta rápida desejada para preencher automaticamente o campo de texto.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Modificar
- `src/components/chat/ChatInput.jsx` — Detectar o caractere `/` e embutir o botão de acionamento do `QuickResponsesPopover.jsx`.

### Componentes de UI a Utilizar
- `lucide-react` (`Zap`)
- `@/components/ui/button`

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
// Fluxo de inserção no ChatInput:
function handleSelectCannedResponse(response: CannedResponse) {
  // Substitui atalho digitado (ex: "/pix") ou anexa o texto no textarea
  setMessageText((prev) => {
    if (prev.trim().startsWith('/')) {
      return response.content;
    }
    return prev ? `${prev}\n${response.content}` : response.content;
  });
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. Inserir a resposta rápida deve manter o foco do cursor dentro do textarea para que o operador possa personalizar o texto antes do envio (ex: adicionar o nome do aluno no início).
2. Se o operador digitar `/pix` e pressionar `Tab` ou `Enter`, o texto correspondente é preenchido automaticamente.
3. Tecla `Escape` fecha o popover de respostas rápidas caso esteja aberto sem limpar o texto digitado.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** O botão de raio (`Zap`) fica posicionado no canto inferior/esquerdo da caixa de texto do chat.
- [ ] **Critério 2:** Selecionar uma resposta preenche o input imediatamente e mantém o foco no textarea.
- [ ] **Critério 3:** Suporte a personalização: o operador pode editar o texto inserido antes de clicar em Enviar.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Conectar o botão `Zap` e o `QuickResponsesPopover.jsx` ao `ChatInput.jsx`.
- [ ] **Passo 2:** Implementar lógica de substituição de texto e foco no textarea.
- [ ] **Passo 3:** Adicionar listener de teclado para tecla de atalho `/`.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-004-respostas-rapidas/tasks/TASK-002-atalhos-e-insercao-chat.md`.
Integre o `QuickResponsesPopover.jsx` ao `ChatInput.jsx` permitindo que respostas rápidas sejam selecionadas pelo botão de raio ou atalho e inseridas com foco no textarea.
```

