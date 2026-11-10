import React from "react"
import { Wifi, WifiOff, RefreshCw, QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ConnectionBadge: Indicador compacto de status da conexão WhatsApp no cabeçalho.
 * - Ponto verde se conectado ("WhatsApp Conectado" ou número vinculado)
 * - Ponto vermelho pulsante se desconectado ("WhatsApp Desconectado")
 * - Clicar no badge abre o modal de conexão/pareamento.
 */
export function ConnectionBadge({
  status = "DISCONNECTED",
  phoneNumber,
  onOpenModal,
  className,
}) {
  const isConnected = status === "CONNECTED"
  const isConnecting = status === "CONNECTING"
  const isScanning = status === "SCAN_QR_CODE"
  const isDisconnected = status === "DISCONNECTED"

  const getStatusConfig = () => {
    if (isConnected) {
      return {
        dotClass: "bg-emerald-500 shadow-xs shadow-emerald-500/50",
        containerClass:
          "bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
        icon: <Wifi className="size-3.5" />,
        text: phoneNumber ? `WhatsApp: ${phoneNumber}` : "WhatsApp Conectado",
        description: "Instância sincronizada e ativa",
      }
    }

    if (isConnecting) {
      return {
        dotClass: "bg-amber-500 animate-ping",
        containerClass:
          "bg-amber-500/10 hover:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
        icon: <RefreshCw className="size-3.5 animate-spin" />,
        text: "Reconectando WhatsApp...",
        description: "Tentando restabelecer sinal com o servidor",
      }
    }

    if (isScanning) {
      return {
        dotClass: "bg-blue-500 animate-pulse",
        containerClass:
          "bg-blue-500/10 hover:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/25",
        icon: <QrCode className="size-3.5" />,
        text: "Aguardando Leitura do QR Code",
        description: "Abra o WhatsApp e escaneie o código",
      }
    }

    // Default: DISCONNECTED
    return {
      dotClass: "bg-rose-500 animate-pulse",
      containerClass:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/30 ring-1 ring-rose-500/10",
      icon: <WifiOff className="size-3.5" />,
      text: "WhatsApp Desconectado",
      description: "Clique para conectar sua conta via QR Code",
    }
  }

  const config = getStatusConfig()

  return (
    <button
      type="button"
      onClick={onOpenModal}
      title={config.description}
      aria-label={`Status da conexão: ${config.text}`}
      className={cn(
        "group relative inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 select-none",
        config.containerClass,
        className
      )}
    >
      <span className="relative flex size-2 items-center justify-center">
        {isDisconnected && (
          <span className="absolute inline-flex size-3 rounded-full bg-rose-400 opacity-60 animate-ping" />
        )}
        <span className={cn("size-2 rounded-full transition-colors", config.dotClass)} />
      </span>

      <span className="font-semibold tracking-tight truncate max-w-[190px] sm:max-w-none">
        {config.text}
      </span>

      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {config.icon}
      </span>
    </button>
  )
}

export default ConnectionBadge
