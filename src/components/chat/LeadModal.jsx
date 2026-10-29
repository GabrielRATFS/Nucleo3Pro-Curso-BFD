import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CheckCircle2,
  Phone,
  User,
  GraduationCap,
  ArrowRight,
} from "lucide-react"

export function LeadModal({ isOpen, onClose, onSubmitLead }) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [targetContest, setTargetContest] = useState("EBSERH")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !whatsapp.trim()) return

    onSubmitLead({
      name,
      whatsapp,
      targetContest,
    })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setName("")
      setWhatsapp("")
      onClose()
    }, 1800)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md border-teal-100 bg-white p-6 shadow-lg">
        {isSubmitted ? (
          /* Success State */
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
              <CheckCircle2 className="size-7" />
            </div>
            <h3 className="text-base font-semibold text-slate-800">
              Vaga e Condição Reservadas!
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Obrigado, {name.split(" ")[0]}! Enviamos os detalhes e o cupom de primeiro lote para seu WhatsApp.
            </p>
          </div>
        ) : (
          /* Lead Capture Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogHeader className="space-y-1.5 text-left">
              <div>
                <Badge
                  variant="outline"
                  className="border-teal-200 bg-teal-50/70 text-[11px] font-medium text-teal-700"
                >
                  Condição Especial de 1º Lote
                </Badge>
              </div>
              <DialogTitle className="text-lg font-semibold text-slate-800">
                Matrícula PreparaPRO com Profª Lena
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500 leading-relaxed">
                Preencha para receber o desconto exclusivo, cronograma de estudos e tirar dúvidas diretamente com a equipe.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 pt-1">
              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-slate-700">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ex: Mariana Silva"
                    className="pl-9 text-xs h-9 border-slate-200 focus-visible:border-teal-400 focus-visible:ring-teal-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-slate-700">
                  WhatsApp com DDD
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <Input
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    placeholder="(11) 98765-4321"
                    className="pl-9 text-xs h-9 border-slate-200 focus-visible:border-teal-400 focus-visible:ring-teal-500/10"
                  />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-medium text-slate-700">
                  Concurso de Interesse
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-2.5 size-4 text-slate-400 z-10" />
                  <Select value={targetContest} onValueChange={setTargetContest}>
                    <SelectTrigger className="w-full pl-9 text-xs h-9 border-slate-200 focus-visible:border-teal-400 focus-visible:ring-teal-500/10 text-slate-700">
                      <SelectValue placeholder="Selecione o concurso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EBSERH">EBSERH (Hospital Universitário)</SelectItem>
                      <SelectItem value="Residência">Residência em Enfermagem</SelectItem>
                      <SelectItem value="Forças Armadas">Forças Armadas (Marinha / FAB / Exército)</SelectItem>
                      <SelectItem value="Prefeitura / SES">Prefeituras e Secretarias Estaduais (SES)</SelectItem>
                      <SelectItem value="Tribunais / Federal">Tribunais e Concursos Federais</SelectItem>
                      <SelectItem value="Outro">Outro Edital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-9 gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs rounded-lg shadow-xs transition-all cursor-pointer mt-2"
            >
              <span>Garantir Condição Especial</span>
              <ArrowRight className="size-3.5" />
            </Button>

            <p className="text-[10px] text-slate-400 text-center">
              🔒 Seus dados estão seguros e não enviamos spam.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
