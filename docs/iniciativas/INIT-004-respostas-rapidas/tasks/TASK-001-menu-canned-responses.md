# [TASK-001] Catálogo de Respostas Prontas e Menu Dropdown

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-004 - Respostas Rápidas](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
Para acelerar o envio de informações recorrentes aos alunos (como chave PIX, prazos de editais e horários de aulas), precisamos de um catálogo local de templates e um menu popover/dropdown posicionado estrategicamente junto ao campo de envio do chat.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/config/cannedResponses.js` — Array de objetos estruturados com categorias, títulos, atalhos e o texto completo.
- `src/components/chat/QuickResponsesPopover.jsx` — Menu suspenso com campo de busca de respostas e listagem por categoria.

### Componentes de UI a Utilizar
- `lucide-react` (`Zap`, `CreditCard`, `FileText`, `Clock`, `Search`)
- `@/components/ui/button`

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
interface CannedResponse {
  id: string;
  category: 'pagamento' | 'edital' | 'horario' | 'geral';
  title: string;
  shortcut: string; // Ex: "/pix", "/edital", "/horarios"
  content: string;
}

interface QuickResponsesPopoverProps {
  responses: CannedResponse[];
  onSelectResponse: (response: CannedResponse) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. O catálogo inicial deve conter no mínimo 4 respostas essenciais:
   - **PIX:** Chave institucional, instruções de envio do comprovante.
   - **Edital:** Link direto para o PDF do edital mais recente.
   - **Turmas:** Horários de início e dias de aula.
   - **Encerramento:** Mensagem amigável de despedida devolvendo o lead ao bot.
2. O popover deve conter uma mini-barra de busca no topo para filtrar respostas rapidamente pelo título ou texto.
3. Se a busca não encontrar nada, exibir: "Nenhuma resposta rápida encontrada".

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Clicar no botão de raio (`Zap`) abre o popover com as opções organizadas por categoria.
- [ ] **Critério 2:** Digitar no campo de busca do popover filtra a lista em tempo real.
- [ ] **Critério 3:** Clicar em uma resposta dispara o callback `onSelectResponse` e fecha o popover.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `src/config/cannedResponses.js` com dados iniciais realistas para o Núcleo3Pro.
- [ ] **Passo 2:** Criar `src/components/chat/QuickResponsesPopover.jsx` com campo de filtro e lista.
- [ ] **Passo 3:** Adicionar suporte a fechar ao clicar fora (`backdrop` ou listener de clique).

---

## 🤖 Prompt para IA

```markdown
Por favor, consulte a spec em `docs/iniciativas/INIT-004-respostas-rapidas/tasks/TASK-001-menu-canned-responses.md`.
Crie o arquivo de configuração `src/config/cannedResponses.js` e o componente `QuickResponsesPopover.jsx` em `src/components/chat/` com pesquisa em tempo real.
```

