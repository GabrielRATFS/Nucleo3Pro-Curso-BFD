import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { QRCodeCard } from "@/components/connection/QRCodeCard"

/**
 * Modal de Conexão WhatsApp.
 * Oferece interface flutuante para pareamento via QR Code e gestão do status da instância.
 */
export function ConnectionModal({
  isOpen,
  onClose,
  status = "SCAN_QR_CODE",
  qrcode = null,
  onRefreshQRCode,
  onDisconnect,
  expiresInSeconds = 60,
  phoneConnected,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose && onClose()}>
      <DialogContent className="max-w-2xl sm:max-w-2xl p-0 overflow-hidden rounded-2xl border-border/80 bg-background">
        <div className="sr-only">
          <DialogHeader>
            <DialogTitle>Conexão WhatsApp</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code para conectar a instância do WhatsApp do Núcleo3Pro
            </DialogDescription>
          </DialogHeader>
        </div>
        <QRCodeCard
          status={status}
          qrcode={qrcode}
          onRefreshQRCode={onRefreshQRCode}
          onDisconnect={onDisconnect}
          expiresInSeconds={expiresInSeconds}
          phoneConnected={phoneConnected}
          className="border-0 shadow-none rounded-none"
        />
      </DialogContent>
    </Dialog>
  )
}

export default ConnectionModal
