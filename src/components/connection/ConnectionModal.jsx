import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { WhatsAppCloudCard } from "@/components/connection/WhatsAppCloudCard"

/**
 * Modal de Conexão WhatsApp Business Cloud API (Meta Oficial).
 * Oferece interface modal para configuração de chaves (WABA ID, Phone Number ID, Access Token)
 * ou diagnóstico da conta oficial conectada.
 */
export function ConnectionModal({
  isOpen,
  onClose,
  status = "CONNECTED",
  credentials,
  onSaveCredentials,
  onDisconnect,
  onTestConnection,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
      <DialogContent className="max-w-3xl sm:max-w-3xl p-0 overflow-hidden rounded-2xl border-border/80 bg-background">
        <div className="sr-only">
          <DialogHeader>
            <DialogTitle>WhatsApp Business Cloud API (Meta Oficial)</DialogTitle>
            <DialogDescription>
              Configurações e diagnóstico de conexão oficial via Graph API da Meta
            </DialogDescription>
          </DialogHeader>
        </div>
        <WhatsAppCloudCard
          status={status}
          credentials={credentials}
          onSaveCredentials={onSaveCredentials}
          onDisconnect={onDisconnect}
          onTestConnection={onTestConnection}
          className="border-0 shadow-none rounded-none"
        />
      </DialogContent>
    </Dialog>
  )
}

export default ConnectionModal