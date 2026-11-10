# [TASK-002] Gerenciador de Status da Conexão e Desconexão

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-001 - Conexão WhatsApp](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
O atendente ou administrador precisa saber a qualquer momento se a conexão com o WhatsApp está operacional ou se caiu, sem sair da tela principal de atendimento. Além disso, em caso de troca de número ou falha de sessão, deve ser possível desconectar a instância pelo próprio painel.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/connection/ConnectionBadge.jsx` — Indicador compacto (ponto verde/vermelho + texto) para o header da aplicação.
- `src/components/connection/DisconnectDialog.jsx` — Diálogo de confirmação para deslogar a sessão do WhatsApp.

### Arquivos a Modificar
- `src/App.jsx` ou layout principal — Inserir o badge de conexão no topo.

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
interface ConnectionBadgeProps {
  status: 'CONNECTED' | 'DISCONNECTED' | 'CONNECTING';
  phoneNumber?: string;
  onOpenModal: () => void;
}

interface DisconnectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDisconnect: () => Promise<void>;
  isDisconnecting: boolean;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. Se `status === 'CONNECTED'`, o badge exibe ponto verde e o texto "WhatsApp Conectado" (ou número conectado).
2. Se `status === 'DISCONNECTED'`, o badge exibe ponto vermelho com texto pulsante "WhatsApp Desconectado".
3. Clicar no badge desconectado deve abrir diretamente o modal do QR Code.
4. Desconectar requer confirmação no diálogo para evitar quedas acidentais do bot em horário comercial.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Badge visível no cabeçalho ou menu lateral em todas as telas.
- [ ] **Critério 2:** O botão de desconectar exibe diálogo de confirmação com aviso de impacto.
- [ ] **Critério 3:** Ao confirmar desconexão, o estado global/local muda para `DISCONNECTED` e o QR Code pode ser gerado novamente.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `ConnectionBadge.jsx` com suporte às variantes de cores do status.
- [ ] **Passo 2:** Criar `DisconnectDialog.jsx` com modal de confirmação.
- [ ] **Passo 3:** Integrar os componentes ao layout principal em `src/App.jsx`.
- [ ] **Passo 4:** Simular alternância de status para validar a reatividade da interface.

---

## 🤖 Prompt para IA

```markdown
Por favor, consulte a spec em `docs/iniciativas/INIT-001-conexao-pareamento-whatsapp/tasks/TASK-002-status-e-desconexao.md`.
Crie o componente `ConnectionBadge.jsx` e o `DisconnectDialog.jsx` integrando-os ao topo da aplicação para sinalizar o status da conexão do WhatsApp.
```

