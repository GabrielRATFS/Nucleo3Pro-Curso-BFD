import React from "react"
import { ShieldCheck, ShieldAlert, RefreshCw, KeyRound, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * ConnectionBadge: Indicador de status da conexão WhatsApp Business Cloud API (Meta Oficial) no cabeçalho.
 * - Ponto verde se conectado ("WhatsApp Oficial: +55...")
 * - Ponto vermelho/alerta se desconectado ("WhatsApp Desconectado")
 * - Ponto âmbar se validando credenciais ("Validando Meta API...")
 * - Clicar no badge abre o modal de configuração oficial da Cloud API.
 */
export function ConnectionBadge({
  status = "DISCONNECTED",
  phoneNumber,
  onOpenModal,
  className,
}) {
  const isConnected = status === "CONNECTED"
  const isConnecting = status === "CONNECTING"
  const isUnauthorized = status === "UNAUTHORIZED"
  const isDisconnected = status === "DISCONNECTED"

  const getStatusConfig = () => {
    if (isConnected) {
      return {
        dotClass: "bg-emerald-500 shadow-xs shadow-emerald-500/50",
        containerClass:
          "bg-emerald-500/10 hover:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/25",
        icon: <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />,
        text: phoneNumber ? `WhatsApp Oficial: ${phoneNumber}` : "WhatsApp Cloud API Conectado",
        description: "Conexão oficial Meta Graph API v21.0 ativa",
      }
    }

    if (isConnecting) {
      return {
        dotClass: "bg-amber-500 animate-ping",
        containerClass:
          "bg-amber-500/10 hover:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/25",
        icon: <RefreshCw className="size-3.5 animate-spin" />,
        text: "Validando Meta API...",
        description: "Verificando token e webhook com os servidores da Meta",
      }
    }

    if (isUnauthorized) {
      return {
        dotClass: "bg-amber-500 animate-pulse",
        containerClass:
          "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30",
        icon: <ShieldAlert className="size-3.5" />,
        text: "Token Meta Expirado",
        description: "Clique para renovar o token da Graph API",
      }
    }

    // Default: DISCONNECTED
    return {
      dotClass: "bg-rose-500 animate-pulse",
      containerClass:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/30 ring-1 ring-rose-500/10",
      icon: <KeyRound className="size-3.5" />,
      text: "WhatsApp Desconectado",
      description: "Clique para configurar as credenciais oficiais da Meta",
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

      <span className="font-semibold tracking-tight truncate max-w-[200px] sm:max-w-none">
        {config.text}
      </span>

      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
        {config.icon}
      </span>
    </button>
  )
}

export default ConnectionBadge