# [TASK-001] Interface de Conexão WhatsApp Business Cloud API (Meta Oficial)

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-001 - Conexão WhatsApp](../spec.md) |
| **Status** | ✅ Concluída |
| **Prioridade** | Alta |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |
| **Última Atualização** | 2026-11-11 |

---

## 1. 📖 Contexto & Motivação
Com a adoção da **API Oficial do WhatsApp (Meta Cloud API)**, a autenticação deixa de usar QR Code e passa a utilizar as chaves de integração corporativa da Meta (`Phone Number ID`, `WABA ID` e `Permanent Access Token`) ou o fluxo de **Embedded Signup** (Facebook Login for Business).

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos Criados/Atualizados
- `src/components/connection/WhatsAppCloudCard.jsx` — Card com formulário de credenciais da Meta, alternância de abas (Chaves de API vs. Facebook Login), diagnóstico da linha e teste de disparo.
- `src/components/connection/QRCodeCard.jsx` — Re-exportação do componente atualizado para compatibilidade retroativa.
- `src/components/connection/ConnectionModal.jsx` — Modal flutuante de configurações da Cloud API.

### Arquivos Modificados
- `src/App.jsx` — Integração do componente oficial com alternador de estados simulados da Meta.

---

## 3. 🧩 Contratos de Dados & Interfaces

```typescript
type CloudConnectionStatus = 'CONNECTED' | 'CONNECTING' | 'UNAUTHORIZED' | 'DISCONNECTED';

interface MetaCloudCredentials {
  wabaId: string;
  phoneNumberId: string;
  accessToken: string;
  verifyToken: string;
  phoneNumber?: string;
  businessName?: string;
  qualityRating?: 'GREEN' | 'YELLOW' | 'RED';
  messagingTier?: string;
  webhookStatus?: 'ACTIVE' | 'FAILING';
}
```

---

## 4. ✅ Critérios de Aceite

- [x] **Critério 1:** Formulário limpo com campos para `Phone Number ID`, `WABA ID`, `Token` (com toggle de ocultar/mostrar) e botão de copiar Webhook URL.
- [x] **Critério 2:** Suporte à aba de "Login com Facebook (Embedded Signup)".
- [x] **Critério 3:** Painel de diagnóstico exibindo status oficial quando conectado (`Qualidade da Linha: GREEN`, `Limite de Mensagens: Tier 1`, `Número Verificado`).
- [x] **Critério 4:** Botão "Testar Disparo" com feedback visual imediato.
