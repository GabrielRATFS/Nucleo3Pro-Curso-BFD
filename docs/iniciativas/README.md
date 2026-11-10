# 🚀 Hub de Iniciativas (Roadmap & Épicos do MVP)

Este diretório concentra todas as **Iniciativas** do projeto Núcleo3Pro. Cada iniciativa representa um épico ou módulo de entrega com objetivo de negócio claro e quebra em tarefas atômicas preparadas para desenvolvimento com IA.

---

## 📋 Roadmap de Iniciativas do MVP v1.0

O MVP está desenhado para validar a operação no menor tempo possível, priorizando a transição suave entre a automação (bot) e o atendimento humano (transbordo).

| ID | Iniciativa | Módulo | Status | Target | Link da Spec |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `INIT-001` | **Conexão & Pareamento WhatsApp** | Configuração / Setup | ✅ Concluída | MVP v1.0 | [Ver Spec](./INIT-001-conexao-pareamento-whatsapp/spec.md) |
| `INIT-002` | **Caixa de Entrada & Transbordo Humano** | Core / Atendimento | 🚀 Pronta | MVP v1.0 | [Ver Spec](./INIT-002-caixa-de-entrada-transbordo/spec.md) |
| `INIT-003` | **Contexto Mínimo do Contato (Mini-CRM)** | Contexto / Operação | 🚀 Pronta | MVP v1.0 | [Ver Spec](./INIT-003-mini-crm-contexto-contato/spec.md) |
| `INIT-004` | **Respostas Rápidas (Canned Responses)** | Produtividade | 🚀 Pronta | MVP v1.0 | [Ver Spec](./INIT-004-respostas-rapidas/spec.md) |
| `INIT-000` | *Exemplo: Gestão e Qualificação de Leads* | Referência Didática | ✅ Concluída | MVP v1.0 | [Ver Spec](./INIT-000-exemplo-painel-leads/spec.md) |

---

## 🚫 O que está expressamente FORA do MVP (V2):

Para manter a entrega ágil e focada em resultados operacionais imediatos, os seguintes itens não fazem parte destas iniciativas do MVP:
- Dashboards gráficos e métricas de tempo médio de espera.
- Perfis de acesso complexos com permissões granulares (Admin vs Operador).
- Divisão da fila por múltiplos departamentos ou roteamento round-robin.
- Envio de campanhas e disparos em massa (broadcast).

---

## 🛠️ Como executar qualquer uma dessas iniciativas com a IA:

1. Acesse a pasta da iniciativa correspondente (ex: `docs/iniciativas/INIT-002-caixa-de-entrada-transbordo/`).
2. Abra a primeira task em `tasks/TASK-001-...md`.
3. Copie o bloco pronto **"🤖 Prompt para IA"** no rodapé da task e envie para o agente de IA (Antigravity, Cursor, etc.).
4. Acompanhe a geração do código, valide no navegador e marque `[x]` nos critérios de aceite concluídos.
