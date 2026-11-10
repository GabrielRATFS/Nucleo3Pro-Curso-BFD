import React from "react"
import { AlertTriangle, LogOut, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

/**
 * DisconnectDialog: Diálogo de confirmação para desconexão segura da sessão do WhatsApp,
 * prevenindo encerramento acidental do bot em horário comercial.
 */
export function DisconnectDialog({
  isOpen,
  onClose,
  onConfirmDisconnect,
  isDisconnecting = false,
}) {
  const handleConfirm = async () => {
    if (onConfirmDisconnect) {
      await onConfirmDisconnect()
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDisconnecting && onClose && onClose()}>
      <DialogContent className="max-w-md p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle className="size-6 stroke-[2.2]" />
          </div>
          <div className="space-y-1.5 flex-1">
            <DialogHeader className="mb-0">
              <DialogTitle className="text-lg font-semibold text-foreground">
                Desconectar Sessão do WhatsApp?
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ao encerrar a conexão, o robô do <strong className="text-foreground">Núcleo3Pro</strong>{" "}
                não poderá receber ou enviar mensagens até que um novo pareamento por QR Code seja realizado.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-xs text-destructive/90 flex items-center gap-2">
          <span className="font-semibold">Impacto:</span>
          <span>Atendimento automático de leads e notificações de cursos serão pausados.</span>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDisconnecting}
            className="w-full sm:w-auto"
          >
            Manter Conectado
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDisconnecting}
            className="w-full sm:w-auto gap-2"
          >
            {isDisconnecting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Desconectando...</span>
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                <span>Sim, Desconectar</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DisconnectDialog
