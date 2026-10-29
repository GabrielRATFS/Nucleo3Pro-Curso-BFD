import React, { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GraduationCap, Copy, Check, RotateCcw, ArrowRight } from "lucide-react"

export function ChatMessages({ messages, onResetToLanding, onOpenLeadCapture }) {
  const [copiedId, setCopiedId] = useState(null)

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(typeof text === "string" ? text : "Informações copiadas.")
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6">
      {/* Top return button */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetToLanding}
          className="h-7 gap-1.5 text-xs text-slate-400 hover:text-teal-700 hover:bg-teal-50/50"
        >
          <RotateCcw className="size-3" />
          <span>Voltar à tela inicial</span>
        </Button>
      </div>

      {/* Messages */}
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-2">
          {msg.role === "user" ? (
            <div className="flex items-start justify-end gap-2.5">
              <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-teal-600 px-4 py-2.5 text-sm text-white shadow-xs">
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Avatar className="size-7 border border-teal-100">
                <AvatarFallback className="bg-teal-600 text-white">
                  <GraduationCap className="size-3.5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <Card className="rounded-2xl rounded-tl-xs border-slate-100 bg-white p-4 shadow-xs">
                  <CardContent className="p-0 space-y-3">
                    <div className="space-y-3 leading-relaxed text-slate-700 text-sm">
                      {msg.content}
                    </div>

                    <Separator className="bg-slate-100 mt-3 mb-2" />

                    {/* Inline Conversion CTA for Leads */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={onOpenLeadCapture}
                        className="h-7 border-teal-200 bg-teal-50/70 text-teal-800 hover:bg-teal-100/70 text-xs gap-1.5 rounded-lg cursor-pointer"
                      >
                        <span>Quero garantir minha vaga</span>
                        <ArrowRight className="size-3 text-teal-600" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="h-6 text-[11px] text-slate-400 hover:text-teal-700 gap-1 px-1.5 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="size-3 text-teal-600" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
