import React, { useState } from "react"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QRCodeCard } from "@/components/connection/QRCodeCard"
import { ConnectionModal } from "@/components/connection/ConnectionModal"

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("SCAN_QR_CODE") // 'DISCONNECTED' | 'SCAN_QR_CODE' | 'CONNECTING' | 'CONNECTED'
  const [phoneNumber] = useState("+55 (11) 98765-4321")

  const handleRefreshQRCode = async () => {
    // Simula requisição à API para gerar novo QR Code
    await new Promise((resolve) => setTimeout(resolve, 800))
  }

  const handleDisconnect = async () => {
    setConnectionStatus("DISCONNECTED")
  }

  const handleSimulateScan = () => {
    setConnectionStatus("CONNECTED")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground flex flex-col">
      {/* Header Superior do Painel */}
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm">
              N3
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-foreground">Núcleo3Pro</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                Curso BFD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="gap-2 border-border/80 hover:bg-muted/80 shadow-xs"
            >
              <QrCode className="size-4 text-primary" />
              <span>Conectar WhatsApp</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl space-y-6">
          {/* Card de Pareamento Principal */}
          <QRCodeCard
            status={connectionStatus}
            onRefreshQRCode={handleRefreshQRCode}
            onDisconnect={handleDisconnect}
            phoneConnected={phoneNumber}
          />

          {/* Barra de Controles de Demonstração / Teste da TASK-001 */}
          <div className="rounded-xl border border-border/60 bg-card p-4 text-xs text-muted-foreground shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <span className="size-2 rounded-full bg-primary" />
              Simulador de Estados (Ambiente de Teste):
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={connectionStatus === "SCAN_QR_CODE" ? "default" : "outline"}
                size="xs"
                onClick={() => setConnectionStatus("SCAN_QR_CODE")}
              >
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
                variant={connectionStatus === "CONNECTED" ? "default" : "outline"}
                size="xs"
                onClick={handleSimulateScan}
                className={connectionStatus === "CONNECTED" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
              >
                Conectado (Simular Leitura)
              </Button>
              <Button
                variant={connectionStatus === "DISCONNECTED" ? "default" : "outline"}
                size="xs"
                onClick={handleDisconnect}
              >
                Desconectado
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Conexão */}
      <ConnectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={connectionStatus}
        onRefreshQRCode={handleRefreshQRCode}
        onDisconnect={handleDisconnect}
        phoneConnected={phoneNumber}
      />
    </div>
  )
}
