# [TASK-002] Sistema de Tags Visuais com Badges Rápidos

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-003 - Mini-CRM](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
Para manter o atendimento organizado e permitir triagem visual rápida, o atendente precisa marcar contatos com etiquetas (tags) como "Dúvida Matrícula", "Material Didático", "Pagamento Pendente" ou "Urgente". Essas tags devem aparecer tanto na sidebar de detalhes quanto no card da conversa na fila.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/crm/TagSelector.jsx` — Componente com badges ativos e dropdown/menu de adição rápida de tags.

### Arquivos a Modificar
- `src/components/crm/ContactInfoSidebar.jsx` — Embutir o seletor de tags.
- `src/components/chat/ConversationCard.jsx` — Exibir mini-badges das tags no card da lista de conversas.

### Componentes de UI a Utilizar
- `@/components/ui/badge`
- `@/components/ui/button`
- `lucide-react` (`Tag`, `Plus`, `X`)

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
interface Tag {
  id: string;
  name: string;
  colorClass: string; // Ex: "bg-blue-100 text-blue-800", "bg-red-100 text-red-800"
}

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTagIds: string[];
  onAddTag: (tagId: string) => void;
  onRemoveTag: (tagId: string) => void;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. **Tags Fixas do MVP:**
   - 🔴 `Urgente` (`bg-red-500/10 text-red-600 border-red-200`)
   - 🎓 `Dúvida Matrícula` (`bg-blue-500/10 text-blue-600 border-blue-200`)
   - 📚 `Material Didático` (`bg-amber-500/10 text-amber-600 border-amber-200`)
   - 💳 `Pagamento Pendente` (`bg-emerald-500/10 text-emerald-600 border-emerald-200`)
2. Um contato pode ter de 0 a 4 tags simultâneas.
3. Clicar no botão `x` de uma tag remove-a imediatamente daquele contato.
4. Clicar em `+ Tag` abre um popover ou menu simples com as tags ainda não aplicadas.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** As tags aplicadas ao contato são renderizadas com cores distintas e ícone de exclusão `x`.
- [ ] **Critério 2:** Adicionar uma tag atualiza o contato em tempo real na sidebar e reflete no card da lista de conversas.
- [ ] **Critério 3:** Não permitir adicionar tags duplicadas ao mesmo contato.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `TagSelector.jsx` com a lista de tags e lógica de toggle.
- [ ] **Passo 2:** Estilizar os badges com classes Tailwind semânticas.
- [ ] **Passo 3:** Conectar as tags à conversa ativa no estado local/global.
- [ ] **Passo 4:** Exibir as tags ativas de forma compacta em `ConversationCard.jsx`.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-003-mini-crm-contexto-contato/tasks/TASK-002-sistema-tags-badges.md`.
Implemente o componente `TagSelector.jsx` em `src/components/crm/` utilizando o componente `Badge` do Shadcn/UI e permita adicionar e remover tags visuais rapidamente.
```

