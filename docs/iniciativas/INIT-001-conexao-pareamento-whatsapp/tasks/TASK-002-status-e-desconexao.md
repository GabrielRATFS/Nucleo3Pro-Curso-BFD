# [TASK-002] Gerenciador de Status da Conexão Oficial e Revogação

| Metadado | Detalhe |
| :--- | :--- |
| **Iniciativa Relacionada** | [INIT-001 - Conexão WhatsApp](../spec.md) |
| **Status** | ✅ Concluída |
| **Prioridade** | Média |
| **Responsável** | Dev / AI |
| **Data de Criação** | 2026-11-10 |
| **Última Atualização** | 2026-11-11 |

---

## 1. 📖 Contexto & Motivação
A saúde da conexão oficial com a Meta deve ser visível continuamente no painel para que a equipe saiba se o canal oficial está ativo, se o token expirou ou se há restrições. A ação de desconexão revoga as credenciais da API com segurança.

---

## 2. 🗂️ Escopo Técnico & Arquivos Afetados

### Arquivos Criados/Atualizados
- `src/components/connection/ConnectionBadge.jsx` — Badge com status da Meta Cloud API (Ponto verde `WhatsApp Oficial Conectado`, amarelo `Token Expirado`, vermelho `Desconectado`).
- `src/components/connection/DisconnectDialog.jsx` — Diálogo com aviso de impacto na automação de IA e webhooks.

### Arquivos Modificados
- `src/App.jsx` — Inserção do badge no cabeçalho e controle de estados de validação.

---

## 3. ✅ Critérios de Aceite

- [x] **Critério 1:** Badge visível no header indicando se a API Oficial está conectada ou desconectada.
- [x] **Critério 2:** Clique no badge abre o modal de configurações e diagnóstico da Cloud API.
- [x] **Critério 3:** Diálogo de confirmação para revogação das credenciais com aviso de interrupção dos webhooks.
