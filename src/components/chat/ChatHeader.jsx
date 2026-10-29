import React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ChatHeader({ onResetChat, onOpenLeadCapture }) {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b border-slate-100 bg-white/80 px-4 backdrop-blur-xs sm:px-6">
      {/* Left: Branding */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="text-slate-400 hover:text-teal-700 hover:bg-teal-50/50" />
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetChat}
          className="h-8 gap-2 px-2 hover:bg-teal-50/50"
        >
          <span className="text-sm font-semibold tracking-tight text-slate-800">
            Prepara<span className="text-teal-600">PRO</span>
          </span>
          <Badge
            variant="outline"
            className="border-teal-100 bg-teal-50 text-[10px] font-medium text-teal-700"
          >
            Concursos de Enfermagem
          </Badge>
        </Button>
      </div>

      {/* Right: Quick Lead CTA */}
      <div className="flex items-center gap-2">
        <Badge
          variant="outline"
          className="hidden sm:inline-flex items-center gap-1.5 border-teal-100 bg-teal-50/70 px-2.5 py-1 text-[11px] font-medium text-teal-800"
        >
          <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>Turma 2026: Matrículas Abertas</span>
        </Badge>

        <Button
          onClick={onOpenLeadCapture}
          size="sm"
          className="h-8 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium rounded-lg shadow-xs transition-all cursor-pointer px-3"
        >
          <span>Garantir Vaga</span>
        </Button>
      </div>
    </header>
  )
}
