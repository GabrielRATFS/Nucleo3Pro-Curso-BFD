# [TASK-002] Interface de Mensageria com Suporte a Mídia e Tempo Real

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-002 - Caixa de Entrada](../spec.md) |
| **Status** | 🚀 Pronta |
| **Prioridade** | Crítica |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |

---

## 1. 📖 Contexto & Motivação
A área central do painel é a janela de chat da conversa selecionada. Ela deve exibir o fluxo cronológico das mensagens recebidas e enviadas, diferenciando visualmente mensagens do aluno, do bot e do atendente humano. Deve ainda suportar renderização de mídias básicas (imagens em thumbnail expansível e arquivos PDF com link de download).

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos a Criar/Atualizar
- `src/components/chat/ChatWindow.jsx` — Container principal da janela de chat (Header da conversa, Área de Mensagens e Input).
- `src/components/chat/MessageBubble.jsx` — Balão individual com suporte a texto, imagem, PDF e autor.
- `src/components/chat/ChatInput.jsx` — Campo de input com botão de envio e tecla de atalho (`Enter` para enviar).

### Componentes de UI a Utilizar
- `lucide-react` (`Send`, `FileText`, `Image`, `Bot`, `UserCheck`, `Download`).
- `@/components/ui/button` e scroll container com auto-scroll para a última mensagem.

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
type MessageSender = 'lead' | 'bot' | 'human_agent';
type MessageMediaType = 'image' | 'pdf' | 'none';

interface ChatMessage {
  id: string;
  sender: MessageSender;
  senderName?: string; // Ex: "Bot IA" ou "Atendente Brenda"
  text?: string;
  mediaType: MessageMediaType;
  mediaUrl?: string;
  mediaFileName?: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  conversationId: string;
  contactName: string;
  phoneNumber: string;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isInputDisabled?: boolean;
}
```

---

## 4. ⚖️ Regras de Negócio & Casos de Borda

1. **Diferenciação Visual dos Balões:**
   - **Aluno/Lead:** Alinhado à esquerda, fundo cinza/neutro (`bg-slate-100` ou `bg-muted`).
   - **Bot:** Alinhado à direita, fundo azul suave com badge discreto "🤖 Bot".
   - **Atendente Humano:** Alinhado à direita, fundo primário da marca com badge "👤 Você / Atendente".
2. **Auto-Scroll:** Ao abrir uma conversa ou receber nova mensagem, o scroll deve descer suavemente para a última mensagem (`scrollIntoView`).
3. **Mídias:**
   - Imagens devem exibir prévia com bordas arredondadas e clique para abrir em tamanho real.
   - PDFs devem exibir ícone de documento, nome do arquivo e botão de download/abrir.
4. **Envio:** `Shift + Enter` insere nova linha; `Enter` simples dispara o envio.

---

## 5. ✅ Critérios de Aceite

- [ ] **Critério 1:** Mensagens renderizam na ordem correta com seus respectivos remetentes claramente identificados.
- [ ] **Critério 2:** Imagens e PDFs são exibidos de forma organizada sem quebrar a proporção do balão.
- [ ] **Critério 3:** O campo de texto limpa imediatamente após o envio e a nova mensagem é renderizada na tela.
- [ ] **Critério 4:** Estado vazio com ilustração amigável quando nenhuma conversa estiver selecionada.

---

## 6. 🛠️ Checklist de Implementação Passo a Passo

- [ ] **Passo 1:** Criar componente `MessageBubble.jsx` com suporte a texto e mídias (`image`, `pdf`).
- [ ] **Passo 2:** Criar `ChatInput.jsx` com suporte a `Enter` e `Shift+Enter`.
- [ ] **Passo 3:** Montar `ChatWindow.jsx` integrando cabeçalho, lista com auto-scroll e input.
- [ ] **Passo 4:** Tratar estado vazio "Selecione uma conversa para iniciar o atendimento".

---

## 🤖 Prompt para IA

```markdown
Por favor, leia a spec em `docs/iniciativas/INIT-002-caixa-de-entrada-transbordo/tasks/TASK-002-interface-chat-mensageria.md`.
Implemente os componentes `ChatWindow.jsx`, `MessageBubble.jsx` e `ChatInput.jsx` em `src/components/chat/` garantindo auto-scroll, suporte a imagem/PDF e diferenciação clara entre Lead, Bot e Atendente Humano.
```

