import React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  GraduationCap,
  Percent,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react"

export function ChatLanding({
  input,
  setInput,
  onSend,
  onSelectPrompt,
  onOpenLeadCapture,
}) {
  const suggestions = [
    {
      icon: GraduationCap,
      label: "Como funciona a mentoria da Profª Lena?",
      prompt: "Como funciona a mentoria e a metodologia de estudos da Profª Lena para concursos?",
    },
    {
      icon: FileCheck,
      label: "Editais atendidos (EBSERH, Residências...)",
      prompt: "Quais editais e bancas o curso preparatório abrange? Serve para EBSERH e Residências?",
    },
    {
      icon: CreditCard,
      label: "Valores e formas de pagamento",
      prompt: "Quais são os planos, valores e opções de parcelamento da Turma 2026?",
    },
    {
      icon: Percent,
      label: "Quero me matricular com desconto",
      prompt: "Quero garantir minha vaga na turma da Profª Lena com condição especial de matrícula.",
    },
  ]

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim()) {
        onSend(input)
      }
    }
  }

  return (
    <div className="mx-auto flex min-h-[76vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-8">
      {/* Minimal Brand Badge */}
      <Badge
        variant="outline"
        className="mb-4 border-teal-200/70 bg-teal-50/70 px-3 py-1 text-xs font-medium text-teal-800"
      >
        Mentoria Profª Lena • Concursos de Enfermagem
      </Badge>

      {/* Main Headline */}
      <div className="text-center space-y-2 mb-7 max-w-xl">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
          Olá, futuro(a) enfermeiro(a) concursado(a)!
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Tire suas dúvidas sobre editais abertos, metodologia da Profª Lena, valores e garanta sua vaga na turma preparatória.
        </p>
      </div>

      {/* Central Input Box using Shadcn Card */}
      <Card className="w-full rounded-2xl border-slate-200/90 bg-white p-3 shadow-xs transition-all focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/10 hover:border-slate-300">
        <CardContent className="p-0 space-y-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte sobre valores, cronograma, editais ou como se matricular..."
            rows={2}
            className="min-h-[56px] w-full resize-none border-0 bg-transparent px-2 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-0 shadow-none"
          />

          <div className="flex items-center justify-between pt-1">
            <Button
              variant="link"
              size="sm"
              onClick={onOpenLeadCapture}
              className="h-auto p-0 text-xs text-teal-700 hover:text-teal-800 font-medium"
            >
              Garantir matrícula com desconto
            </Button>

            <Button
              onClick={() => onSend(input)}
              disabled={!input.trim()}
              size="icon-sm"
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-xs rounded-lg disabled:opacity-30 transition-all cursor-pointer"
            >
              <Send className="size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Minimalist Lead Capture & Question Chips using Shadcn Button */}
      <div className="mt-6 flex w-full flex-wrap justify-center gap-2">
        {suggestions.map((item) => {
          const IconComp = item.icon
          return (
            <Button
              key={item.label}
              variant="outline"
              size="sm"
              onClick={() => onSelectPrompt(item.prompt)}
              className="h-auto rounded-full border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-normal text-slate-600 shadow-2xs hover:border-teal-300 hover:bg-teal-50/40 hover:text-teal-800 transition-all gap-2"
            >
              <IconComp className="size-3.5 text-slate-400" />
              <span>{item.label}</span>
            </Button>
          )
        })}
      </div>

      {/* Trust & Proof Line with Shadcn Separator */}
      <div className="w-full max-w-md mt-10">
        <Separator className="bg-slate-100 mb-5" />
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Award className="size-3.5 text-teal-600" />
            <span>+87% de aprovação</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-teal-600" />
            <span>Garantia de 7 dias</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="size-3.5 text-teal-600" />
            <span>Acompanhamento direto</span>
          </div>
        </div>
      </div>
    </div>
  )
}
