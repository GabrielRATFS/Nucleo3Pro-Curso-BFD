import React, { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { SidebarNav } from "@/components/chat/SidebarNav"
import { ChatLanding } from "@/components/chat/ChatLanding"
import { ChatInput } from "@/components/chat/ChatInput"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { LeadModal } from "@/components/chat/LeadModal"

export default function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)

  // Consultative answers tailored for Lena's nursing contest preparation
  const getCourseConsultationReply = (query) => {
    const q = query.toLowerCase()

    if (q.includes("como funciona") || q.includes("metodologia") || q.includes("método") || q.includes("mentoria")) {
      return (
        <div className="space-y-3">
          <p className="font-semibold text-slate-800 text-sm">
            🎓 Como funciona a Mentoria e o Método da Profª Lena:
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            O preparatório foi estruturado especialmente para enfermeiros e técnicos que conciliam plantões com os estudos. O método é baseado em 4 pilares:
          </p>
          <div className="rounded-lg bg-teal-50/50 p-3 text-xs space-y-2 font-normal text-slate-700 border border-teal-100/60">
            <div><strong>1. Teoria Direcionada:</strong> Conteúdo enxuto e focado no que realmente cai (Legislação do SUS, Deontologia, Urgência, Farmacologia e Saúde Coletiva).</div>
            <div><strong>2. Engenharia Reversa por Bancas:</strong> Mais de 4.000 questões comentadas item a item (FGV, Cebraspe, IBFC, Vunesp, etc.).</div>
            <div><strong>3. Simulados Periódicos:</strong> Diagnóstico de pontos fracos e evolução do seu percentual de acertos.</div>
            <div><strong>4. Acompanhamento da Profª Lena:</strong> Encontros quinzenais ao vivo para tirar dúvidas e grupo exclusivo no WhatsApp.</div>
          </div>
          <p className="text-xs text-slate-600">
            💡 <em>Alunos da mentoria têm taxa de aprovação superior a 87% nas primeiras posições de Enfermagem.</em>
          </p>
        </div>
      )
    }

    if (q.includes("edital") || q.includes("ebserh") || q.includes("residência") || q.includes("banca")) {
      return (
        <div className="space-y-3 text-xs text-slate-700">
          <p className="font-semibold text-slate-800 text-sm">
            📋 Editais e Carreiras Atendidas no PreparaPRO:
          </p>
          <p className="leading-relaxed">
            O curso oferece trilhas personalizadas de acordo com o seu objetivo:
          </p>
          <ul className="list-disc pl-4 space-y-1.5 text-slate-600">
            <li><strong>EBSERH Nacional:</strong> Módulos específicos para hospitais universitários federais (Assistencial e Administrativo).</li>
            <li><strong>Residências em Enfermagem:</strong> Foco em instituições de excelência (USP, UNIFESP, Einstein, Sírio-Libanês e SES).</li>
            <li><strong>Forças Armadas:</strong> Preparação para Marinha (CP-CSM), Aeronáutica (EAOAP) e Exército (EsFCEx).</li>
            <li><strong>Prefeituras & Secretarias Estaduais de Saúde:</strong> Cobertura completa das matérias básicas e específicas mais exigidas.</li>
          </ul>
          <p className="text-slate-500">
            Você tem acesso ilimitado a todas as trilhas na assinatura da Turma 2026.
          </p>
        </div>
      )
    }

    if (q.includes("valor") || q.includes("preço") || q.includes("pagamento") || q.includes("parcel")) {
      return (
        <div className="space-y-3 text-xs text-slate-700">
          <p className="font-semibold text-slate-800 text-sm">
            💳 Valores e Condições de Matrícula (Turma 2026):
          </p>
          <div className="rounded-lg bg-teal-50/60 p-3 border border-teal-100 text-slate-800 space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="font-semibold">Plano Anual Completo + Mentoria:</span>
              <span className="text-sm font-bold text-teal-700">12x de R$ 79,90</span>
            </div>
            <p className="text-[11px] text-slate-500">ou com 15% de desconto à vista no PIX.</p>
          </div>
          <ul className="list-disc pl-4 space-y-1 text-slate-600">
            <li>Acesso completo por 12 meses a todas as aulas e atualizações pós-edital.</li>
            <li>Banco com 5.000 questões comentadas e simulados com ranking.</li>
            <li><strong>Garantia Incondicional de 7 dias:</strong> Teste sem compromisso. Se não amar, devolvemos 100% do valor.</li>
          </ul>
        </div>
      )
    }

    if (q.includes("matrícula") || q.includes("desconto") || q.includes("vaga") || q.includes("inscrição")) {
      return (
        <div className="space-y-2.5 text-xs text-slate-700">
          <p className="font-semibold text-teal-800 text-sm">
            Garanta sua vaga com condição especial de 1º Lote!
          </p>
          <p className="leading-relaxed">
            As vagas com valor promocional e acesso direto à mentoria da Profª Lena são limitadas para garantir o acompanhamento individualizado de cada aluno.
          </p>
          <p className="text-slate-600">
            Clique no botão abaixo para preencher seus dados de contato e receber imediatamente o link de inscrição com o cupom aplicado:
          </p>
        </div>
      )
    }

    // Default friendly response
    return (
      <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
        <p className="font-semibold text-slate-800 text-sm">
          Informações da Mentoria PreparaPRO com Profª Lena:
        </p>
        <p>
          Entendi a sua dúvida sobre: <em>"{query}"</em>.
        </p>
        <p>
          Nosso preparatório é 100% focado na aprovação em concursos de Enfermagem, com acompanhamento próximo da Profª Lena, cronograma semanal e simulados focados na sua banca.
        </p>
        <p className="text-slate-500">
          Deseja conhecer os valores da turma, o cronograma das aulas ou garantir sua vaga com condição especial?
        </p>
      </div>
    )
  }

  const handleSendMessage = (textToSend) => {
    const trimmed = textToSend.trim()
    if (!trimmed) return

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: trimmed,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const assistantMsg = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: getCourseConsultationReply(trimmed),
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    }, 450)
  }

  const handleSelectPrompt = (promptText) => {
    handleSendMessage(promptText)
  }

  const handleResetToLanding = () => {
    setMessages([])
    setInput("")
  }

  const handleLeadSubmit = ({ name, whatsapp, targetContest }) => {
    const confirmMsg = {
      id: `lead-${Date.now()}`,
      role: "assistant",
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p className="font-semibold text-teal-800 text-sm">
            🎉 Parabéns, {name.split(" ")[0]}! Vaga pré-reservada com sucesso!
          </p>
          <p>
            Registramos seu interesse no concurso para <strong>{targetContest}</strong>.
          </p>
          <div className="rounded-lg bg-teal-50/70 p-3 border border-teal-100 space-y-1 text-slate-800">
            <div>• <strong>Cupom ativado:</strong> 15% OFF de 1º Lote</div>
            <div>• <strong>WhatsApp cadastrado:</strong> {whatsapp}</div>
          </div>
          <p className="text-slate-600">
            A equipe da Profª Lena acabou de enviar os detalhes de acesso e o cronograma para seu WhatsApp. Seja muito bem-vindo(a) ao time de futuros concursados!
          </p>
        </div>
      ),
    }
    setMessages((prev) => [...prev, confirmMsg])
  }

  return (
    <TooltipProvider delay={200}>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-white text-slate-800 font-sans">
          {/* Collapsible Minimal Sidebar */}
          <SidebarNav
            onSelectPrompt={handleSelectPrompt}
            onNewChat={handleResetToLanding}
            onOpenLeadCapture={() => setIsLeadModalOpen(true)}
          />

          {/* Main Stage */}
          <SidebarInset className="flex flex-1 flex-col overflow-x-hidden bg-white">
            <ChatHeader
              onResetChat={handleResetToLanding}
              onOpenLeadCapture={() => setIsLeadModalOpen(true)}
            />

            <main className="flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                /* Ultra-clean Minimalist Lead Capture Landing */
                <ChatLanding
                  input={input}
                  setInput={setInput}
                  onSend={handleSendMessage}
                  onSelectPrompt={handleSelectPrompt}
                  onOpenLeadCapture={() => setIsLeadModalOpen(true)}
                />
              ) : (
                /* Conversation View */
                <ChatMessages
                  messages={messages}
                  onResetToLanding={handleResetToLanding}
                  onOpenLeadCapture={() => setIsLeadModalOpen(true)}
                />
              )}
            </main>

            {/* Bottom Input in conversation view */}
            {messages.length > 0 && (
              <footer className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-white via-white/95 to-transparent pt-2">
                <div className="flex justify-center">
                  <ChatInput
                    input={input}
                    setInput={setInput}
                    onSend={handleSendMessage}
                    disabled={isTyping}
                  />
                </div>
              </footer>
            )}
          </SidebarInset>
        </div>

        {/* Lead Capture Modal */}
        <LeadModal
          isOpen={isLeadModalOpen}
          onClose={() => setIsLeadModalOpen(false)}
          onSubmitLead={handleLeadSubmit}
        />
      </SidebarProvider>
    </TooltipProvider>
  )
}
