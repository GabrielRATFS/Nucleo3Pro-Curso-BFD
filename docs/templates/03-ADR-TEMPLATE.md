# [ADR-XXX] Título da Decisão de Arquitetura

| Metadado | Detalhe |
| :--- | :--- |
| **Status** | 📝 Proposto \| ✅ Aceito \| ❌ Rejeitado \| 🔄 Substituído por [ADR-YYY] |
| **Data** | AAAA-MM-DD |
| **Autores** | Nome dos participantes |
| **Iniciativa Relacionada** | [INIT-XXX](../iniciativas/INIT-XXX/spec.md) (opcional) |

---

## 1. 🔍 Contexto & Problema
> Qual é a questão técnica, arquitetural ou de infraestrutura que precisamos resolver? Quais restrições, requisitos técnicos ou dores de negócio motivaram esta discussão?

---

## 2. 💡 Decisão Proposta
> O que decidimos adotar, mudar ou padronizar? Seja claro e direto. Ex: "Decidimos utilizar Tailwind CSS em conjunto com Shadcn/UI para todos os componentes do Painel Administrativo".

---

## 3. ⚖️ Consequências

### Pontos Positivos (Ganhos)
- Ganho 1 (ex: Aceleração da prototipagem com componentes padronizados e acessíveis).
- Ganho 2 (ex: Facilidade para modelos de IA gerarem código consistente com o design system).

### Pontos Negativos / Trade-offs (Custos & Riscos)
- Custo 1 (ex: Necessidade de customização manual de temas via CSS variables).
- Custo 2 (ex: Curva de aprendizado inicial para quem não conhece Tailwind).

---

## 4. 🔄 Alternativas Consideradas & Motivo do Descarte

| Alternativa | Prós | Contras | Por que foi descartada? |
| :--- | :--- | :--- | :--- |
| **Opção A (ex: Material UI)** | Componentes prontos e maduros | Pacote pesado, estilização rígida | Dificuldade de customização visual fina para a marca Núcleo3Pro |
| **Opção B (ex: CSS Modules puros)** | Zero dependências externas | Muito código boilerplate para criar modais, dropdowns e acessibilidade | Tempo de desenvolvimento muito elevado |

---

## 5. 📌 Diretrizes de Aplicação Prática

Orientações para os desenvolvedores e para as IAs aplicarem esta decisão no dia a dia do código:
1. Sempre priorizar componentes de `@/components/ui/...`.
2. Não adicionar dependências de CSS duplicadas.
3. Manter a configuração centralizada em `tailwind.config.js`.

