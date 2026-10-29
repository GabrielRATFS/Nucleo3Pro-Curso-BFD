import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Plus,
  HelpCircle,
  GraduationCap,
  ArrowRight,
} from "lucide-react"

export function SidebarNav({ onSelectPrompt, onNewChat, onOpenLeadCapture }) {
  const commonQuestions = [
    {
      title: "Como funciona a mentoria da Profª Lena?",
      prompt: "Como funciona a mentoria e o método de aprovação da Profª Lena?",
    },
    {
      title: "Valores e formas de pagamento",
      prompt: "Quais são os planos, valores e opções de parcelamento disponíveis?",
    },
    {
      title: "Editais atendidos (EBSERH, SES, etc.)",
      prompt: "Quais concursos o preparatório abrange? Serve para EBSERH e Residências?",
    },
    {
      title: "Acesso a simulados e banco de questões",
      prompt: "O curso inclui simulados comentados e cronograma de estudos?",
    },
    {
      title: "Garantia e cancelamento",
      prompt: "Como funciona a garantia incondicional de 7 dias?",
    },
  ]

  return (
    <Sidebar className="border-r border-slate-100 bg-white">
      {/* Brand Header */}
      <SidebarHeader className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-teal-600 text-white shadow-2xs">
            <GraduationCap className="size-4.5" />
          </div>
          <div>
            <span className="font-semibold text-sm tracking-tight text-slate-800">
              Prepara<span className="text-teal-600">PRO</span>
            </span>
            <p className="text-[10px] text-slate-400">Profª Lena Concursos</p>
          </div>
        </div>

        <Button
          onClick={onNewChat}
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 border-slate-200 text-xs font-normal text-slate-600 hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-800"
        >
          <Plus className="size-3.5 text-teal-600" />
          <span>Nova conversa</span>
        </Button>
      </SidebarHeader>

      {/* Main Navigation Content */}
      <SidebarContent className="px-3 py-2 space-y-4">
        {/* Lead Conversion Callout Box using Shadcn Card and Button */}
        <Card className="rounded-xl border-teal-100 bg-gradient-to-b from-teal-50/60 to-sky-50/30 p-3 shadow-none">
          <CardContent className="p-0 space-y-2 text-left">
            <div className="flex items-center gap-1.5 text-teal-800 font-medium text-xs">
              <span className="size-1.5 rounded-full bg-teal-500" />
              <span>Turma 2026 Confirmada</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Vagas com valor de primeiro lote e bônus exclusivo da Profª Lena.
            </p>
            <Button
              onClick={onOpenLeadCapture}
              size="sm"
              className="w-full justify-between h-7 bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-medium px-2.5 rounded-lg transition-colors cursor-pointer"
            >
              <span>Fazer Matrícula</span>
              <ArrowRight className="size-3" />
            </Button>
          </CardContent>
        </Card>

        {/* FAQ Navigation */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 text-[11px] font-medium text-slate-400">
            Principais Dúvidas
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-1">
            <SidebarMenu className="space-y-0.5">
              {commonQuestions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onSelectPrompt(item.prompt)}
                    className="flex h-auto py-2 w-full items-start gap-2 rounded-md px-2 text-left text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900 leading-snug cursor-pointer"
                  >
                    <HelpCircle className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator className="bg-slate-100" />

      {/* Teacher Profile Footer */}
      <SidebarFooter className="p-3">
        <div className="flex items-center gap-2.5 px-1 py-0.5">
          <Avatar className="size-8 border border-teal-100">
            <AvatarFallback className="bg-teal-600 text-white text-xs font-semibold">
              PL
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-800">
              Profª Lena
            </p>
            <p className="text-[10px] text-teal-700 font-medium">
              Mentora em Concursos de Enfermagem
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
