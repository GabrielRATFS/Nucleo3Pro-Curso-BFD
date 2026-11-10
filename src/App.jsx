import React, { useState } from "react"
import { QrCode, LogOut, CheckCircle2, Bot, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCodeCard } from "@/components/connection/QRCodeCard"
import { ConnectionModal } from "@/components/connection/ConnectionModal"
import { ConnectionBadge } from "@/components/connection/ConnectionBadge"
import { DisconnectDialog } from "@/components/connection/DisconnectDialog"

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("CONNECTED") // Inicia demonstrando o estado conectado ou conforme interação
  const [phoneNumber] = useState("+55 (11) 98765-4321")

  const handleRefreshQRCode = async () => {
    // Simula chamada de backend para gerar novo QR Code
    await new Promise((resolve) => setTimeout(resolve, 800))
  }

  const handleTriggerDisconnect = () => {
    setIsDisconnectDialogOpen(true)
  }

  const handleConfirmDisconnect = async () => {
    setIsDisconnecting(true)
    try {
      // Simula chamada de backend para logout da instância WhatsApp
      await new Promise((resolve) => setTimeout(resolve, 900))
      setConnectionStatus("DISCONNECTED")
      setIsDisconnectDialogOpen(false)
    } finally {
      setIsDisconnecting(false)
    }
  }

  const handleBadgeClick = () => {
    if (connectionStatus === "CONNECTED") {
      setIsDisconnectDialogOpen(true)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground flex flex-col font-sans">
      {/* Header Superior do Painel com ConnectionBadge Visível */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo e Nome da Plataforma */}
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm">
              N3
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-foreground">Núcleo3Pro</span>
              <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                Curso BFD
              </span>
            </div>
          </div>

          {/* Área de Ações e Status da Conexão */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Badge de Status Permanente do WhatsApp */}
            <ConnectionBadge
              status={connectionStatus}
              phoneNumber={phoneNumber}
              onOpenModal={handleBadgeClick}
            />

            {/* Botão de Conectar / Desconectar */}
            {connectionStatus === "CONNECTED" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleTriggerDisconnect}
                className="hidden md:inline-flex gap-1.5 text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
              >
                <LogOut className="size-3.5" />
                <span>Desconectar</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex gap-1.5 text-xs border-border/80 shadow-xs"
              >
                <QrCode className="size-3.5 text-primary" />
                <span className="hidden sm:inline">Parear WhatsApp</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal do Painel */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-6">
          {/* Card de Pareamento / Status da Sessão */}
          <QRCodeCard
            status={connectionStatus}
            onRefreshQRCode={handleRefreshQRCode}
            onDisconnect={handleTriggerDisconnect}
            phoneConnected={phoneNumber}
          />

          {/* Painel Informativo de Funcionalidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-border/60 bg-card p-4 shadow-xs flex items-start gap-3">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Bot className="size-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground">Disjuntor & Bot</h4>
                <p className="text-xs text-muted-foreground">
                  O bot de IA opera em conjunto com a instância pareada para qualificar leads e orientar alunos.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-card p-4 shadow-xs flex items-start gap-3">
              <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageSquare className="size-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-foreground">Caixa de Entrada</h4>
                <p className="text-xs text-muted-foreground">
                  Mensagens recebidas são despachadas instantaneamente para a fila de transbordo humano.
                </p>
              </div>
            </div>
          </div>

          {/* Controles de Simulação & Testes Rápidos */}
          <div className="rounded-xl border border-border/60 bg-card/60 p-4 text-xs text-muted-foreground shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <Sparkles className="size-3.5 text-primary" />
              <span>Alternar Estados da Conexão (Ambiente de Validação):</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Button
                variant={connectionStatus === "CONNECTED" ? "default" : "outline"}
                size="xs"
                onClick={() => setConnectionStatus("CONNECTED")}
                className={connectionStatus === "CONNECTED" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                <CheckCircle2 className="size-3 mr-1" />
                Conectado
              </Button>
              <Button
                variant={connectionStatus === "SCAN_QR_CODE" ? "default" : "outline"}
                size="xs"
                onClick={() => setConnectionStatus("SCAN_QR_CODE")}
              >
                <QrCode className="size-3 mr-1" />
                Aguardando QR Code
              </Button>
              <Button
                variant={connectionStatus === "CONNECTING" ? "default" : "outline"}
                size="xs"
                onClick={() => setConnectionStatus("CONNECTING")}
              >
                Conectando...
              </Button>
              <Button
                variant={connectionStatus === "DISCONNECTED" ? "destructive" : "outline"}
                size="xs"
                onClick={() => setConnectionStatus("DISCONNECTED")}
              >
                Desconectado
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Conexão WhatsApp */}
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={connectionStatus}
        onRefreshQRCode={handleRefreshQRCode}
        onDisconnect={handleTriggerDisconnect}
        phoneConnected={phoneNumber}
      />

      {/* Diálogo de Confirmação de Desconexão */}
      <DisconnectDialog
        isOpen={isDisconnectDialogOpen}
        onClose={() => setIsDisconnectDialogOpen(false)}
        onConfirmDisconnect={handleConfirmDisconnect}
        isDisconnecting={isDisconnecting}
      />
    </div>
  )
}
