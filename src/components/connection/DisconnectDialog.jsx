import React from "react"
import { AlertTriangle, LogOut, Loader2, ShieldAlert } from "lucide-react"
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
 * DisconnectDialog: Diálogo de confirmação para desconexão segura das credenciais
 * da Meta Cloud API (WhatsApp Business Platform), prevenindo desativação acidental do bot.
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
            <ShieldAlert className="size-6 stroke-[2.2]" />
          </div>
          <div className="space-y-1.5 flex-1">
            <DialogHeader className="mb-0">
              <DialogTitle className="text-lg font-semibold text-foreground">
                Revogar Acesso à Meta Cloud API?
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Ao revogar a conexão oficial, o sistema do <strong className="text-foreground">Núcleo3Pro</strong>{" "}
                removerá as chaves de acesso (Token e Phone Number ID) e interromperá os webhooks em tempo real.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-xs text-destructive/90 flex items-start gap-2">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Impacto Imediato:</span>
            <span>O atendimento automatizado da IA e o transbordo para atendentes serão pausados até que uma nova chave seja inserida.</span>
          </div>
        </div>

        <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDisconnecting}
            className="text-xs"
          >
            Cancelar
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDisconnecting}
            className="text-xs gap-1.5"
          >
            {isDisconnecting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Revogando credenciais...</span>
              </>
            ) : (
              <>
                <LogOut className="size-3.5" />
                <span>Sim, Revogar Conexão</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DisconnectDialog