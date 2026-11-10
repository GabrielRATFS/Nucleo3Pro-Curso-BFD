# [TASK-001] Interface de Pareamento com QR Code e Countdown

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-001 - Conexão WhatsApp](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Alta |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
A primeira etapa operacional do sistema é autenticar a conta de WhatsApp da Núcleo3Pro. O operador necessita de uma tela ou modal que solicite o QR Code ao backend e o renderize na tela com instruções passo a passo (ex: "Abra o WhatsApp > Aparelhos Conectados > Conectar um aparelho").

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar
- `src/components/connection/QRCodeCard.jsx` — Card com imagem do QR Code, spinner de carregamento e botão de recarregar.
- `src/components/connection/ConnectionModal.jsx` (ou página de setup).

### Arquivos a Modificar
- `src/App.jsx` — Adicionar acesso à visualização de conexão (botão na barra superior/sidebar).
- `src/components/ui/` — Garantir disponibilidade de `Button`, `Dialog` ou `Card`.

### Dependências
- `lucide-react` para ícones (`QrCode`, `RefreshCw`, `Smartphone`, `CheckCircle2`, `AlertCircle`).

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
type ConnectionStatus = 'DISCONNECTED' | 'SCAN_QR_CODE' | 'CONNECTING' | 'CONNECTED';

interface InstanceState {
  status: ConnectionStatus;
  qrcode: string | null; // Base64 string ou raw string
  expiresInSeconds?: number;
  phoneConnected?: string;
}

interface QRCodeCardProps {
  status: ConnectionStatus;
  qrcode: string | null;
  onRefreshQRCode: () => Promise<void>;
  onDisconnect?: () => Promise<void>;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

### Regras de Negócio
1. Enquanto o status for `CONNECTING` ou estiver requisitando o QR Code, exibir skeleton ou spinner centralizado.
2. O QR Code expira tipicamente a cada 45-60 segundos. Quando expirar, exibir overlay com mensagem "QR Code expirado" e botão "Gerar novo QR Code".
3. Quando o status mudar para `CONNECTED`, esconder o QR Code e exibir mensagem de sucesso com ícone verde.

### Casos de Borda
- [ ] **Falha de rede/API offline:** Exibir toast ou mensagem de alerta caso o backend não responda.
- [ ] **QR Code inválido/vazio:** Não quebrar a tela; exibir placeholder e permitir tentar novamente.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Ao abrir a tela/modal no estado `SCAN_QR_CODE`, a imagem do QR Code é renderizada nítida no centro do card.
- [ ] **Critério 2:** Instruções claras de escaneamento em 3 passos aparecem ao lado ou abaixo do código.
- [ ] **Critério 3:** Clicar no botão "Atualizar" dispara a requisição e exibe estado de loading no botão.
- [ ] **Critério 4:** Totalmente adaptável para telas desktop e mobile.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar `src/components/connection/QRCodeCard.jsx` com suporte aos estados (`loading`, `ready`, `expired`).
- [ ] **Passo 2:** Integrar container de diálogo/modal ou seção de conexão em `src/App.jsx`.
- [ ] **Passo 3:** Adicionar timer simulado ou real de expiração (countdown) para UX fluida.
- [ ] **Passo 4:** Adicionar tratamento visual quando o aparelho for autenticado com sucesso.

---

## 7. 🧪 Guia de Teste e Validação

1. Iniciar servidor: `npm run dev`.
2. Acessar a tela/modal de conexão.
3. Verificar a renderização do card com o QR Code mockado/real.
4. Clicar em "Atualizar" e observar a transição do spinner.

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-001-conexao-pareamento-whatsapp/tasks/TASK-001-tela-pareamento-qrcode.md`.
Implemente o componente `QRCodeCard.jsx` em `src/components/connection/` com suporte aos estados de carregamento, QR Code ativo e expiração, utilizando Tailwind CSS e componentes de `@/components/ui/`.
```

