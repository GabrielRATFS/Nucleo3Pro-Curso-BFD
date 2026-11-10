# 🏛️ Arquitetura & Decisões Técnicas (ADRs)

Este diretório armazena a visão técnica global do projeto **Núcleo3Pro** e seus **Architectural Decision Records (ADRs)**.

---

## 🎯 Por que registramos decisões de arquitetura?

Ao trabalhar em equipe e especialmente ao utilizar **Inteligência Artificial (IA)** para desenvolvimento de código:
1. **Evita Regressão de Padrões:** A IA não tentará sugerir outra biblioteca de UI, outro bundler ou outra biblioteca de ícones se o padrão estiver documentado aqui.
2. **Contexto Permanente:** Qualquer novo integrante compreende o *porquê* de termos escolhido determinada tecnologia e quais foram os trade-offs avaliados.
3. **Decisões Conscientes:** Mudanças estruturais exigem a criação de uma nova ADR ou atualização das existentes.

---

## 📑 Registro de Decisões de Arquitetura (ADRs)

| ADR ID | Título | Status | Data | Link |
| :--- | :--- | :--- | :--- | :--- |
| `ADR-001` | Adoção de React 19, Vite, Tailwind CSS v4 e Shadcn/UI | ✅ Aceito | 2026-11-10 | [ADR-001.md](./adrs/ADR-001-stack-frontend-tailwind-shadcn.md) |
| `ADR-002` | *Próxima decisão técnica (ex: Estado Global ou API Client)* | 📝 Proposto | - | *(Criar a partir do template)* |

---

## 🛠️ Como criar uma nova ADR:

1. Copie o arquivo [`docs/templates/03-ADR-TEMPLATE.md`](../templates/03-ADR-TEMPLATE.md) para a pasta `docs/arquitetura/adrs/`.
2. Nomeie o arquivo com o padrão `ADR-XXX-nome-da-decisao.md`.
3. Preencha o contexto, a decisão e os prós/contras.
4. Adicione o novo registro na tabela acima.

