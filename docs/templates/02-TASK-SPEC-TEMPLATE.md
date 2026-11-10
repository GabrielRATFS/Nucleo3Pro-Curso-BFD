# [TASK-XXX] Título da Tarefa

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-XXX - Título](../spec.md) |
| **Branch da Iniciativa** | `feature/INIT-XXX-nome` |
| **Padrão de Commit** | `feat(INIT-XXX): TASK-YYY - descrição` |
| **Status** | 📝 Rascunho \| 🚀 Pronta \| ⚙️ Em Progresso \| 🔍 Em Revisão \| ✅ Concluída |
| **Prioridade** | Baixa \| Média \| Alta \| Crítica |
| **Responsável** | Dev / AI |
| **Data de Criação** | AAAA-MM-DD |

---

## 1. 📖 Contexto & Motivação
> Explique brevemente o que precisa ser feito e por que essa task é necessária para a iniciativa. Forneça o contexto suficiente para que a IA ou outro dev entenda o objetivo em menos de 1 minuto de leitura.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

Indique explicitamente quais arquivos devem ser tocados. Isso reduz o tempo de busca e evita modificações indevidas pela IA.

### Arquivos a Criar
- `src/.../NomeDoNovoComponente.jsx`
- `src/.../serviceOuHook.js`

### Arquivos a Modificar
- `src/App.jsx` — Adicionar nova rota ou importar novo componente.
- `src/components/.../Existente.jsx` — Ajustar estilização ou props.

### Dependências & Bibliotecas
- Bibliotecas já existentes utilizadas (ex: `lucide-react`, `tailwind`, componentes Shadcn/UI de `@/components/ui/*`).
- Novos pacotes necessários (se houver, justifique): `npm install ...`

---

## 3. 🧩 Contratos de Dados & Interfaces

Defina a estrutura de dados esperada para garantir conformidade entre backend, frontend e componentes.

```typescript
// Exemplo de tipagem / contrato de dados (JSDoc ou TypeScript):
interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  courseOfInterest: string;
  status: 'NOVO' | 'EM_CONTATO' | 'AGUARDANDO_PAGAMENTO' | 'CONVERTIDO' | 'PERDIDO';
  createdAt: string;
  updatedAt: string;
}

// Props do componente:
interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSave: (updatedLead: Lead) => Promise<void>;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda (Edge Cases)

### Regras de Negócio
1. O campo `phone` deve ser formatado com máscara internacional/nacional `(XX) XXXXX-XXXX`.
2. Se o status for alterado para `CONVERTIDO`, a data de conversão deve ser gravada automaticamente.
3. Não permitir salvar caso o campo obrigatório `courseOfInterest` esteja em branco.

### Casos de Borda & Estados de UI
- [ ] **Estado Vazio (Empty State):** Exibir mensagem amigável e ação clara quando não houver dados.
- [ ] **Estado de Carregamento (Loading State):** Utilizar Skeleton loaders ou botões com spinner desabilitados durante requisições.
- [ ] **Tratamento de Erros:** Exibir feedback visual (toast ou alert) em caso de falha de rede/API, sem quebrar a aplicação.
- [ ] **Responsividade:** Garantir uso fluído em dispositivos móveis (telas a partir de 360px).

---

## 5. ✅ Critérios de Aceite

Critérios que definem quando a tarefa é considerada 100% finalizada:

- [ ] **Critério 1:** Dado que o usuário clica no botão "Ver Detalhes do Lead", Quando o modal abrir, Então os dados corretos do lead selecionado devem ser exibidos.
- [ ] **Critério 2:** Dado que o usuário tenta salvar com campos obrigatórios vazios, Quando submeter o formulário, Então mensagens de validação em vermelho devem ser exibidas e a submissão deve ser bloqueada.
- [ ] **Critério 3:** As alterações visuais devem respeitar as diretrizes de cores e componentes da biblioteca de UI existente.
- [ ] **Critério 4:** Nenhum erro ou warning deve ser impresso no console do navegador (`F12`).

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

Etapas sequenciais para guiar a execução (você ou o agente de IA pode marcar à medida que avança):

- [ ] **Passo 1:** Criar/ajustar a estrutura base do componente `...`.
- [ ] **Passo 2:** Implementar lógica de estado local e validações.
- [ ] **Passo 3:** Conectar aos componentes de UI existentes (`@/components/ui/...`).
- [ ] **Passo 4:** Tratar estados de loading, erro e validações de borda.
- [ ] **Passo 5:** Executar testes manuais de responsividade e fluxo de usuário.
- [ ] **Passo 6 (Commit Atômico):** Atualizar este arquivo marcando os critérios com `[x]` e realizar o commit:
  ```bash
  git add .
  git commit -m "feat(INIT-XXX): TASK-YYY - resumo claro do que foi implementado"
  ```

---

## 7. 🧪 Guia de Teste e Validação

1. Iniciar o servidor de desenvolvimento: `npm run dev`.
2. Acessar a rota: `http://localhost:5173/...`.
3. Testar o fluxo principal:
   - Clicar em ...
   - Preencher com dados de teste: ...
   - Verificar se o resultado em tela é ...
4. Testar o caso de erro:
   - Forçar estado de erro ...
   - Verificar se o toast de erro aparece adequadamente.

---

## 🤖 Prompt para IA (Copiar e Colar)

> Use este bloco para iniciar uma sessão de desenvolvimento com a IA (Antigravity, Cursor, etc.):

```markdown
Olá! Por favor, leia com atenção a especificação da tarefa definida no arquivo:
`docs/iniciativas/INIT-XXX/tasks/TASK-YYY.md`

Diretrizes obrigatórias de execução:
1. Verifique se está na branch da iniciativa (`feature/INIT-XXX-...`). Se não estiver, crie ou alterne para ela.
2. Analise os arquivos listados na seção "Escopo Técnico & Arquivos Afetados".
3. Siga rigorosamente as "Regras de Negócio & Casos de Borda" e os "Contratos de Dados".
4. Execute a implementação seguindo o "Checklist de Implementação Passo a Passo".
5. Verifique todos os "Critérios de Aceite" e execute `npm run lint`.
6. Finalize marcando os itens concluídos com `[x]` neste documento e faça o commit atômico exclusivo desta task:
   `git commit -m "feat(INIT-XXX): TASK-YYY - descrição objetiva"`
```

