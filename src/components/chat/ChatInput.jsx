import React, { useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, Paperclip } from "lucide-react"

export function ChatInput({ input, setInput, onSend, disabled }) {
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !disabled) {
        onSend(input)
      }
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`
    }
  }, [input])

  return (
    <div className="w-full max-w-2xl px-4 pb-4">
      <Card className="rounded-2xl border-slate-200/90 bg-white p-2.5 shadow-xs transition-all focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-500/10 hover:border-slate-300">
        <CardContent className="p-0">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua dúvida sobre o concurso, edital ou matrícula..."
            rows={1}
            className="min-h-[44px] max-h-32 w-full resize-none border-0 bg-transparent px-2 py-1 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-0 shadow-none"
          />

          <div className="flex items-center justify-between pt-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="text-slate-400 hover:text-slate-600 rounded-md"
              title="Anexar edital ou imagem"
            >
              <Paperclip className="size-4" />
            </Button>

            <Button
              onClick={() => onSend(input)}
              disabled={!input.trim() || disabled}
              size="icon-xs"
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-xs rounded-lg disabled:opacity-30 transition-all cursor-pointer"
            >
              <Send className="size-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <p className="mt-2 text-center text-[10px] text-slate-400">
        PreparaPRO Concursos • Mentoria Profª Lena para Enfermagem
      </p>
    </div>
  )
}
