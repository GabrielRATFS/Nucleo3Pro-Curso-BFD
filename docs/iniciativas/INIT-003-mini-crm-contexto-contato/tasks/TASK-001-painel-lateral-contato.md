# [TASK-001] Painel Lateral de Contato com Dados Básicos

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-003 - Mini-CRM](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
A coluna direita da interface de atendimento deve acomodar o painel de contexto do contato (Mini-CRM). Quando uma conversa está aberta, ela exibe o avatar grande, nome extraído do perfil do WhatsApp, número de telefone formatado e atalhos rápidos de navegação.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/crm/ContactInfoSidebar.jsx` — Coluna lateral fixa/colapsável.
- `src/components/crm/ContactProfileHeader.jsx` — Bloco de avatar, nome e telefone.

### Componentes de UI a Utilizar
- `@/components/ui/avatar`
- `@/components/ui/button`
- `lucide-react` (`Phone`, `ExternalLink`, `Calendar`, `Hash`, `User`, `X`)

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
interface ContactProfile {
  id: string;
  name: string;
  phone: string;
  avatarUrl?: string;
  createdAt: string;
  messageCount: number;
}

interface ContactInfoSidebarProps {
  contact: ContactProfile | null;
  isOpen: boolean;
  onClose?: () => void;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. O número de telefone deve ser formatado (ex: `+55 (81) 98765-4321`) e contar com botão de copiar para o clipboard.
2. Link externo para abrir o WhatsApp Web diretamente com o número caso necessário (`https://wa.me/55...`).
3. Em telas menores (tablets ou notebooks compactos), o painel pode ser recolhível (toggle via ícone no topo do chat).

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** O painel lateral renderiza as informações do contato atualmente selecionado.
- [ ] **Critério 2:** Botão de copiar número exibe feedback visual rápido (ícone de check).
- [ ] **Critério 3:** Layout harmonioso com a tela central de chat sem espremer o campo de digitação.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `ContactProfileHeader.jsx` com avatar e dados do WhatsApp.
- [ ] **Passo 2:** Montar a estrutura da sidebar em `ContactInfoSidebar.jsx`.
- [ ] **Passo 3:** Adicionar função de cópia do telefone com feedback visual.
- [ ] **Passo 4:** Permitir ocultar/exibir a sidebar com botão toggle.

---

## 🤖 Prompt para IA

```markdown
Por favor, consulte a spec em `docs/iniciativas/INIT-003-mini-crm-contexto-contato/tasks/TASK-001-painel-lateral-contato.md`.
Crie o componente `ContactInfoSidebar.jsx` e `ContactProfileHeader.jsx` em `src/components/crm/` utilizando Tailwind CSS e componentes de `@/components/ui/avatar`.
```

