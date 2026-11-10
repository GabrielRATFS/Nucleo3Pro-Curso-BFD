import React, { useState, useEffect } from "react"
import {
  QrCode,
  RefreshCw,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  LogOut,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * Componente que renderiza a imagem do QR Code
 * Suporta data:image base64, URL remota, ou padrão SVG vetorial de alta definição.
 */
function QRCodeImage({ qrcode, isExpired, isLoading }) {
  // Padrão vetorial de QR Code nítido e visualmente fiel ao WhatsApp
  const renderFallbackSVG = () => (
    <svg
      viewBox="0 0 200 200"
      className="size-full p-2 select-none"
      fill="currentColor"
    >
      {/* Marcador Canto Superior Esquerdo */}
      <rect x="12" y="12" width="46" height="46" rx="6" fill="#111827" />
      <rect x="20" y="20" width="30" height="30" rx="3" fill="#ffffff" />
      <rect x="28" y="28" width="14" height="14" rx="2" fill="#111827" />

      {/* Marcador Canto Superior Direito */}
      <rect x="142" y="12" width="46" height="46" rx="6" fill="#111827" />
      <rect x="150" y="20" width="30" height="30" rx="3" fill="#ffffff" />
      <rect x="158" y="28" width="14" height="14" rx="2" fill="#111827" />

      {/* Marcador Canto Inferior Esquerdo */}
      <rect x="12" y="142" width="46" height="46" rx="6" fill="#111827" />
      <rect x="20" y="150" width="30" height="30" rx="3" fill="#ffffff" />
      <rect x="28" y="158" width="14" height="14" rx="2" fill="#111827" />

      {/* Marcador de Alinhamento Menor */}
      <rect x="146" y="146" width="26" height="26" rx="4" fill="#111827" />
      <rect x="152" y="152" width="14" height="14" rx="2" fill="#ffffff" />
      <rect x="156" y="156" width="6" height="6" fill="#111827" />

      {/* Linhas de sincronismo */}
      <line x1="62" y1="26" x2="138" y2="26" stroke="#111827" strokeWidth="6" strokeDasharray="6 6" />
      <line x1="26" y1="62" x2="26" y2="138" stroke="#111827" strokeWidth="6" strokeDasharray="6 6" />

      {/* Módulos de dados simulados em malha densa */}
      <g fill="#111827">
        <rect x="68" y="40" width="8" height="8" rx="1.5" />
        <rect x="84" y="40" width="8" height="8" rx="1.5" />
        <rect x="100" y="40" width="16" height="8" rx="1.5" />
        <rect x="124" y="40" width="8" height="8" rx="1.5" />

        <rect x="68" y="54" width="16" height="8" rx="1.5" />
        <rect x="92" y="54" width="8" height="8" rx="1.5" />
        <rect x="108" y="54" width="8" height="8" rx="1.5" />
        <rect x="124" y="54" width="12" height="8" rx="1.5" />

        <rect x="40" y="68" width="8" height="8" rx="1.5" />
        <rect x="56" y="68" width="8" height="16" rx="1.5" />
        <rect x="72" y="68" width="8" height="8" rx="1.5" />
        <rect x="120" y="68" width="16" height="8" rx="1.5" />
        <rect x="144" y="68" width="8" height="8" rx="1.5" />

        <rect x="40" y="84" width="16" height="8" rx="1.5" />
        <rect x="72" y="84" width="12" height="8" rx="1.5" />
        <rect x="128" y="84" width="16" height="8" rx="1.5" />
        <rect x="152" y="84" width="8" height="16" rx="1.5" />

        <rect x="40" y="100" width="8" height="16" rx="1.5" />
        <rect x="56" y="100" width="16" height="8" rx="1.5" />
        <rect x="136" y="100" width="8" height="8" rx="1.5" />
        <rect x="152" y="108" width="12" height="8" rx="1.5" />

        <rect x="40" y="124" width="12" height="8" rx="1.5" />
        <rect x="60" y="124" width="8" height="8" rx="1.5" />
        <rect x="76" y="124" width="16" height="8" rx="1.5" />
        <rect x="120" y="124" width="8" height="8" rx="1.5" />
        <rect x="136" y="124" width="16" height="8" rx="1.5" />

        <rect x="68" y="144" width="16" height="8" rx="1.5" />
        <rect x="92" y="144" width="8" height="8" rx="1.5" />
        <rect x="108" y="144" width="16" height="8" rx="1.5" />

        <rect x="68" y="160" width="8" height="8" rx="1.5" />
        <rect x="84" y="160" width="16" height="8" rx="1.5" />
        <rect x="116" y="160" width="8" height="16" rx="1.5" />

        <rect x="72" y="176" width="12" height="8" rx="1.5" />
        <rect x="92" y="176" width="16" height="8" rx="1.5" />
        <rect x="132" y="176" width="12" height="8" rx="1.5" />
      </g>

      {/* Emblema Central WhatsApp */}
      <circle cx="100" cy="100" r="22" fill="#ffffff" stroke="#25D366" strokeWidth="3" />
      <g transform="translate(86, 86) scale(0.7)">
        <path
          d="M17.507 14.307l-.009.075c-2.199-1.096-2.429-1.242-2.713-.823-.284.42-.99 1.242-1.213 1.493-.223.251-.446.284-.827.093-.38-.191-1.605-.591-3.056-1.886-1.129-1.007-1.89-2.251-2.113-2.632-.223-.382-.024-.588.167-.778.172-.172.381-.446.572-.669.191-.223.254-.382.381-.636.127-.254.064-.476-.032-.668-.096-.191-.858-2.069-1.176-2.833-.309-.744-.624-.643-.858-.655l-.731-.01c-.254 0-.668.096-1.018.477-.35.382-1.336 1.304-1.336 3.181s1.368 3.69 1.559 3.945c.191.254 2.693 4.113 6.525 5.766 2.766 1.194 3.844 1.05 4.542.985.939-.088 2.213-.905 2.524-1.78.311-.875.311-1.625.217-1.78-.094-.156-.348-.251-.729-.441z"
          fill="#25D366"
        />
      </g>
    </svg>
  )

  const isDataUrl = qrcode && (qrcode.startsWith("data:") || qrcode.startsWith("http"));

  return (
    <div className="relative size-60 sm:size-64 rounded-2xl bg-white p-3 shadow-md border border-slate-200 flex items-center justify-center overflow-hidden">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 text-slate-500">
          <div className="size-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
          <span className="text-xs font-medium animate-pulse">Gerando QR Code...</span>
        </div>
      ) : isDataUrl ? (
        <img
          src={qrcode}
          alt="WhatsApp QR Code"
          className={cn(
            "size-full object-contain transition-all duration-300",
            isExpired && "blur-xs opacity-25 scale-95"
          )}
        />
      ) : (
        <div
          className={cn(
            "size-full text-slate-900 transition-all duration-300",
            isExpired && "blur-xs opacity-25 scale-95"
          )}
        >
          {renderFallbackSVG()}
        </div>
      )}
    </div>
  )
}

/**
 * QRCodeCard: Interface de pareamento com suporte a countdown,
 * atualização sob demanda, regras de expiração e adaptação responsiva.
 */
export function QRCodeCard({
  status = "SCAN_QR_CODE",
  qrcode = null,
  onRefreshQRCode,
  onDisconnect,
  expiresInSeconds = 60,
  phoneConnected = "+55 (11) 98765-4321",
  className,
}) {
  const [timeLeft, setTimeLeft] = useState(expiresInSeconds)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasError, setHasError] = useState(false)

  const isExpired = timeLeft <= 0
  const isConnecting = status === "CONNECTING"
  const isConnected = status === "CONNECTED"

  // Contador regressivo para expiração do QR Code
  useEffect(() => {
    if (isConnected || isConnecting || isExpired) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isConnected, isConnecting, isExpired])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    setHasError(false)
    try {
      if (onRefreshQRCode) {
        await onRefreshQRCode()
      }
      // Simula pequeno delay de rede para feedback visual se a promise resolver instantaneamente
      await new Promise((res) => setTimeout(res, 600))
      setTimeLeft(expiresInSeconds)
    } catch (err) {
      console.error("Erro ao atualizar QR Code:", err)
      setHasError(true)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Percentual do countdown para barra de progresso
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / expiresInSeconds) * 100))

  return (
    <Card className={cn("w-full max-w-2xl mx-auto overflow-hidden border-border/70", className)}>
      <CardHeader className="border-b border-border/40 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <QrCode className="size-5" />
            </div>
            <div>
              <CardTitle>Conectar WhatsApp</CardTitle>
              <CardDescription>
                Pareie a instância do Núcleo3Pro para habilitar o envio e recebimento de mensagens
              </CardDescription>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
              isConnected
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : isConnecting
                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                : "bg-blue-500/10 text-blue-600 border-blue-500/20"
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                isConnected
                  ? "bg-emerald-500"
                  : isConnecting
                  ? "bg-amber-500 animate-ping"
                  : "bg-blue-500"
              )}
            />
            {isConnected ? "Conectado" : isConnecting ? "Reconectando..." : "Aguardando leitura"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Caso de Borda: Falha na Conexão */}
        {hasError && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3.5 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Erro ao obter novo QR Code</p>
              <p className="text-xs text-destructive/80 mt-0.5">
                Não foi possível se comunicar com o servidor da instância. Verifique sua conexão e tente novamente.
              </p>
            </div>
            <Button
              variant="outline"
              size="xs"
              onClick={handleRefresh}
              className="text-destructive border-destructive/30 hover:bg-destructive/10"
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Estado 1: CONECTADO COM SUCESSO */}
        {isConnected ? (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="size-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center animate-in zoom-in-95">
                <CheckCircle2 className="size-10 stroke-[2.2]" />
              </div>
              <div className="absolute -bottom-1 -right-1 size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="size-4" />
              </div>
            </div>

            <div className="space-y-1.5 max-w-sm">
              <h4 className="text-lg font-semibold text-foreground">
                WhatsApp Conectado com Sucesso!
              </h4>
              <p className="text-sm text-muted-foreground">
                Sua instância está ativa e pronta para enviar e receber mensagens em tempo real.
              </p>
            </div>

            <div className="w-full max-w-xs rounded-xl bg-muted/50 border border-border/60 p-3.5 text-left text-xs space-y-1.5">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Número Vinculado:</span>
                <span className="font-semibold text-foreground">{phoneConnected}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Status da Sessão:</span>
                <span className="text-emerald-600 font-medium inline-flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Operacional
                </span>
              </div>
            </div>

            {onDisconnect && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onDisconnect}
                className="mt-2"
              >
                <LogOut className="size-4 mr-1.5" />
                Desconectar Sessão
              </Button>
            )}
          </div>
        ) : (
          /* Estado 2: AGUARDANDO LEITURA / SCAN_QR_CODE */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Coluna Esquerda: QR Code com Overlay de Expiração */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <QRCodeImage
                  qrcode={qrcode}
                  isExpired={isExpired}
                  isLoading={isRefreshing || isConnecting}
                />

                {/* Overlay de QR Code Expirado */}
                {isExpired && !isRefreshing && (
                  <div className="absolute inset-0 rounded-2xl bg-slate-900/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white animate-in fade-in duration-200">
                    <div className="size-11 rounded-full bg-white/10 flex items-center justify-center mb-2 text-amber-400">
                      <Clock className="size-6" />
                    </div>
                    <p className="text-sm font-semibold">QR Code Expirado</p>
                    <p className="text-xs text-slate-300 mt-1 max-w-[190px]">
                      Por segurança, o código expira a cada minuto.
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleRefresh}
                      className="mt-3.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                    >
                      <RefreshCw className="size-3.5 mr-1.5" />
                      Gerar Novo Código
                    </Button>
                  </div>
                )}
              </div>

              {/* Barra de Progresso e Timer */}
              {!isConnected && !isConnecting && (
                <div className="w-60 sm:w-64 mt-3 space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {isExpired ? "Expirado" : `Expira em ${timeLeft}s`}
                    </span>
                    <button
                      type="button"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={cn("size-3", isRefreshing && "animate-spin")} />
                      Atualizar
                    </button>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-1000 rounded-full",
                        timeLeft > 20
                          ? "bg-emerald-500"
                          : timeLeft > 10
                          ? "bg-amber-500"
                          : "bg-destructive"
                      )}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Direita: Instruções de Uso em 3 Passos */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Smartphone className="size-4 text-primary" />
                  Como conectar seu WhatsApp
                </h4>
                <p className="text-xs text-muted-foreground">
                  Siga os 3 passos abaixo no aplicativo oficial do WhatsApp no seu telefone:
                </p>
              </div>

              <ol className="space-y-3.5 text-sm text-foreground">
                <li className="flex items-start gap-3">
                  <span className="size-6 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <span className="font-medium">Abra o WhatsApp</span> no seu celular.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="size-6 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    Toque em <strong className="font-semibold text-foreground">Mais opções (⋮)</strong> no Android ou{" "}
                    <strong className="font-semibold text-foreground">Ajustes / Configurações</strong> no iPhone e selecione{" "}
                    <span className="font-semibold text-primary">Aparelhos Conectados</span>.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="size-6 rounded-full bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    Toque em <strong className="font-semibold text-foreground">Conectar um aparelho</strong> e aponte a câmera para o QR Code ao lado.
                  </div>
                </li>
              </ol>

              <div className="pt-2 border-t border-border/50 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                <span>Conexão criptografada de ponta a ponta via API Oficial / Baileys.</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QRCodeCard
