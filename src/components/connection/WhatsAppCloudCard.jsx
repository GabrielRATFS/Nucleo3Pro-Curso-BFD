import React, { useState } from "react"
import {
  ShieldCheck,
  Key,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LogOut,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Eye,
  EyeOff,
  Radio,
  Send,
  Zap,
  HelpCircle,
  Layers,
  PhoneCall,
  Activity,
  Globe,
  Settings2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/**
 * WhatsAppCloudCard: Componente de Conexão com o WhatsApp Business Cloud API (Oficial da Meta).
 * Substitui o fluxo legado de QR Code por autenticação via Graph API da Meta (WABA ID, Phone Number ID e Token de Acesso).
 */
export function WhatsAppCloudCard({
  status = "CONNECTED",
  credentials = {
    wabaId: "109283746501928",
    phoneNumberId: "102938475610293",
    accessToken: "EAAG...m4ZBQZDZD",
    verifyToken: "nucleo3pro_secret_token_2026",
    phoneNumber: "+55 (11) 98765-4321",
    businessName: "Núcleo3Pro Cursos & Treinamentos",
    qualityRating: "GREEN", // GREEN | YELLOW | RED | UNKNOWN
    messagingTier: "TIER_1K", // 1.000 conversas / 24h
    webhookStatus: "ACTIVE", // ACTIVE | FAILING | PENDING
  },
  onSaveCredentials,
  onDisconnect,
  onTestConnection,
  className,
}) {
  const [activeTab, setActiveTab] = useState("api_keys") // 'api_keys' | 'embedded_signup'
  const [showToken, setShowToken] = useState(false)
  const [isCopiedWebhook, setIsCopiedWebhook] = useState(false)
  const [isCopiedToken, setIsCopiedToken] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [isTestingMessage, setIsTestingMessage] = useState(false)
  const [testSuccessMessage, setTestSuccessMessage] = useState(null)

  // Formulário editável de credenciais
  const [formValues, setFormValues] = useState({
    wabaId: credentials.wabaId || "",
    phoneNumberId: credentials.phoneNumberId || "",
    accessToken: credentials.accessToken || "",
    verifyToken: credentials.verifyToken || "nucleo3pro_verify_token_2026",
    webhookUrl: "https://api.nucleo3pro.com.br/api/webhooks/whatsapp",
  })

  const [formErrors, setFormErrors] = useState({})

  const isConnected = status === "CONNECTED"
  const isConnecting = status === "CONNECTING"
  const isUnauthorized = status === "UNAUTHORIZED"

  const handleCopy = (text, setCopiedFn) => {
    navigator.clipboard?.writeText(text)
    setCopiedFn(true)
    setTimeout(() => setCopiedFn(false), 2000)
  }

  const handleValidateAndSave = async (e) => {
    e?.preventDefault()
    const errors = {}

    if (!formValues.wabaId.trim()) errors.wabaId = "Informe o WABA ID (ID da Conta do WhatsApp)"
    if (!formValues.phoneNumberId.trim()) errors.phoneNumberId = "Informe o Phone Number ID"
    if (!formValues.accessToken.trim()) errors.accessToken = "Informe o Token Permanente de Acesso"

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    setIsValidating(true)
    try {
      if (onSaveCredentials) {
        await onSaveCredentials(formValues)
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200))
      }
    } finally {
      setIsValidating(false)
    }
  }

  const handleRunTestMessage = async () => {
    setIsTestingMessage(true)
    setTestSuccessMessage(null)
    try {
      if (onTestConnection) {
        await onTestConnection()
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }
      setTestSuccessMessage("Mensagem de teste de template enviada com sucesso pela Graph API v21.0!")
      setTimeout(() => setTestSuccessMessage(null), 4000)
    } catch {
      // Ignora erro simulado
    } finally {
      setIsTestingMessage(false)
    }
  }

  return (
    <Card className={cn("overflow-hidden border-border/80 shadow-md", className)}>
      {/* Top Banner de Integração Oficial da Meta */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 px-6 py-4 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-xs">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base tracking-tight">WhatsApp Business Cloud API</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  Meta Oficial
                </span>
              </div>
              <p className="text-xs text-white/80">
                Conexão direta com os servidores oficiais da Meta (Graph API v21.0)
              </p>
            </div>
          </div>

          {/* Badge de Status no Banner */}
          <div className="self-start sm:self-auto">
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/25 border border-white/20 text-white backdrop-blur-md">
                <span className="size-2 rounded-full bg-emerald-300 animate-pulse" />
                API Conectada & Operacional
              </span>
            ) : isUnauthorized ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/30 border border-rose-200/30 text-white backdrop-blur-md">
                <AlertCircle className="size-3" />
                Token Expirado / Inválido
              </span>
            ) : isConnecting ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/25 border border-white/20 text-white backdrop-blur-md">
                <RefreshCw className="size-3 animate-spin" />
                Validando com a Meta...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/20 text-white/90">
                <Radio className="size-3" />
                Aguardando Configuração
              </span>
            )}
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* ============================================================== */}
        {/* ESTADO CONECTADO: Painel de Diagnóstico & Saúde da Linha Oficial */}
        {/* ============================================================== */}
        {isConnected ? (
          <div className="space-y-6">
            {/* Header da Conta Conectada */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/80 gap-4">
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg ring-4 ring-emerald-500/10">
                  <PhoneCall className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-foreground">
                      {credentials.phoneNumber || "+55 (11) 98765-4321"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="size-3" />
                      Número Verificado
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Nome Comercial: <strong className="text-foreground">{credentials.businessName}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRunTestMessage}
                  disabled={isTestingMessage}
                  className="text-xs gap-1.5"
                >
                  {isTestingMessage ? (
                    <RefreshCw className="size-3.5 animate-spin text-primary" />
                  ) : (
                    <Send className="size-3.5 text-primary" />
                  )}
                  <span>Testar Disparo</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDisconnect}
                  className="text-xs text-destructive hover:bg-destructive/10 border-destructive/30 gap-1.5"
                >
                  <LogOut className="size-3.5" />
                  <span>Desconectar</span>
                </Button>
              </div>
            </div>

            {/* Alerta de Feedback de Teste */}
            {testSuccessMessage && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{testSuccessMessage}</span>
              </div>
            )}

            {/* Grid com Indicadores Oficiais da Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Qualidade do Número */}
              <div className="p-4 rounded-xl border border-border/80 bg-card space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Activity className="size-3.5 text-emerald-500" />
                    Qualidade da Linha
                  </span>
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-base font-bold text-foreground flex items-center gap-1.5">
                  Alta (GREEN)
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Sem bloqueios ou denúncias de spam pela Meta.
                </p>
              </div>

              {/* Limite de Mensagens (Tier) */}
              <div className="p-4 rounded-xl border border-border/80 bg-card space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Zap className="size-3.5 text-amber-500" />
                    Limite de Conversas
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted font-medium">Tier 1</span>
                </div>
                <div className="text-base font-bold text-foreground">
                  1.000 / 24h
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Conversas iniciadas por dia (expansível via uso).
                </p>
              </div>

              {/* Status do Webhook */}
              <div className="p-4 rounded-xl border border-border/80 bg-card space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Globe className="size-3.5 text-blue-500" />
                    Webhook em Tempo Real
                  </span>
                  <span className="size-2 rounded-full bg-blue-500" />
                </div>
                <div className="text-base font-bold text-foreground flex items-center gap-1.5">
                  Ativo & Saudável
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Eventos de mensagens e status recebidos com sucesso.
                </p>
              </div>
            </div>

            {/* Detalhes Técnicos dos Identificadores da Meta */}
            <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-3">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="size-3.5 text-primary" />
                Identificadores da Conta Meta
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-background border border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">Phone Number ID</span>
                    <code className="font-mono text-xs font-semibold text-foreground">
                      {credentials.phoneNumberId}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => handleCopy(credentials.phoneNumberId, () => {})}
                    title="Copiar Phone Number ID"
                  >
                    <Copy className="size-3.5 text-muted-foreground" />
                  </Button>
                </div>

                <div className="p-2.5 rounded-lg bg-background border border-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">WABA ID (WhatsApp Business)</span>
                    <code className="font-mono text-xs font-semibold text-foreground">
                      {credentials.wabaId}
                    </code>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={() => handleCopy(credentials.wabaId, () => {})}
                    title="Copiar WABA ID"
                  >
                    <Copy className="size-3.5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================== */
          /* ESTADO NÃO CONECTADO / CONFIGURAÇÃO DE CREDENCIAIS OFICIAIS    */
          /* ============================================================== */
          <div className="space-y-6">
            {/* Seletor de Método de Conexão */}
            <div className="flex border-b border-border/80">
              <button
                type="button"
                onClick={() => setActiveTab("api_keys")}
                className={cn(
                  "pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2",
                  activeTab === "api_keys"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Key className="size-3.5" />
                <span>Chaves da API Cloud (Recomendado)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("embedded_signup")}
                className={cn(
                  "pb-2.5 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2",
                  activeTab === "embedded_signup"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <ShieldCheck className="size-3.5" />
                <span>Login com Facebook (Embedded Signup)</span>
              </button>
            </div>

            {/* ABA 1: FORMULÁRIO DE CHAVES DE API */}
            {activeTab === "api_keys" && (
              <form onSubmit={handleValidateAndSave} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground flex items-start gap-2.5">
                  <HelpCircle className="size-4 text-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Obtenha as credenciais oficiais no painel do{" "}
                    <a
                      href="https://developers.facebook.com/apps"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary font-semibold underline underline-offset-2 inline-flex items-center gap-1 hover:text-primary/80"
                    >
                      Meta for Developers <ExternalLink className="size-3" />
                    </a>{" "}
                    em <strong>WhatsApp &gt; Configuração da API</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                      <span>Phone Number ID <span className="text-destructive">*</span></span>
                      <span className="text-[10px] text-muted-foreground">ID do Telefone na Meta</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 102938475610293"
                      value={formValues.phoneNumberId}
                      onChange={(e) =>
                        setFormValues({ ...formValues, phoneNumberId: e.target.value })
                      }
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border text-xs bg-background transition-all outline-hidden font-mono",
                        formErrors.phoneNumberId
                          ? "border-destructive focus:ring-1 focus:ring-destructive"
                          : "border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      )}
                    />
                    {formErrors.phoneNumberId && (
                      <p className="text-[11px] text-destructive">{formErrors.phoneNumberId}</p>
                    )}
                  </div>

                  {/* WABA ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                      <span>WABA ID <span className="text-destructive">*</span></span>
                      <span className="text-[10px] text-muted-foreground">WhatsApp Business Account</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 109283746501928"
                      value={formValues.wabaId}
                      onChange={(e) => setFormValues({ ...formValues, wabaId: e.target.value })}
                      className={cn(
                        "w-full px-3 py-2 rounded-lg border text-xs bg-background transition-all outline-hidden font-mono",
                        formErrors.wabaId
                          ? "border-destructive focus:ring-1 focus:ring-destructive"
                          : "border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      )}
                    />
                    {formErrors.wabaId && (
                      <p className="text-[11px] text-destructive">{formErrors.wabaId}</p>
                    )}
                  </div>
                </div>

                {/* Permanent Access Token */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground">
                      Token de Acesso Permanente (System User Token) <span className="text-destructive">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      {showToken ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                      <span>{showToken ? "Ocultar" : "Mostrar"}</span>
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showToken ? "text" : "password"}
                      placeholder="EAAG... (Token gerado pelo Usuário do Sistema da Meta)"
                      value={formValues.accessToken}
                      onChange={(e) =>
                        setFormValues({ ...formValues, accessToken: e.target.value })
                      }
                      className={cn(
                        "w-full pl-3 pr-10 py-2 rounded-lg border text-xs bg-background transition-all outline-hidden font-mono",
                        formErrors.accessToken
                          ? "border-destructive focus:ring-1 focus:ring-destructive"
                          : "border-border/80 focus:border-primary focus:ring-1 focus:ring-primary/20"
                      )}
                    />
                    <Key className="size-3.5 text-muted-foreground absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                  {formErrors.accessToken && (
                    <p className="text-[11px] text-destructive">{formErrors.accessToken}</p>
                  )}
                  <p className="text-[11px] text-muted-foreground">
                    Requer permissões: <code className="text-[10px] bg-muted px-1 rounded">whatsapp_business_messaging</code> e <code className="text-[10px] bg-muted px-1 rounded">whatsapp_business_management</code>.
                  </p>
                </div>

                {/* Configuração do Webhook */}
                <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Globe className="size-3.5 text-primary" />
                    Configuração de Webhook na Meta (Callback URL)
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Cole este endereço no campo de Webhook do seu aplicativo da Meta para receber as mensagens enviadas pelos alunos:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={formValues.webhookUrl}
                      className="w-full px-3 py-1.5 rounded-lg border border-border/80 bg-background text-xs text-muted-foreground font-mono"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(formValues.webhookUrl, setIsCopiedWebhook)}
                      className="shrink-0 text-xs gap-1"
                    >
                      {isCopiedWebhook ? (
                        <>
                          <Check className="size-3.5 text-emerald-600" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copiar URL</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Botão de Envio / Teste */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    disabled={isValidating}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-5 py-2 h-9 gap-2 shadow-xs"
                  >
                    {isValidating ? (
                      <>
                        <RefreshCw className="size-3.5 animate-spin" />
                        <span>Validando junto à Graph API...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        <span>Salvar e Conectar WhatsApp Oficial</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}

            {/* ABA 2: EMBEDDED SIGNUP (LOGIN COM FACEBOOK) */}
            {activeTab === "embedded_signup" && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
                <div className="size-14 rounded-2xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center font-bold text-2xl shadow-xs">
                  f
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    Conectar via Facebook Login for Business
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    O fluxo oficial de Embedded Signup permite selecionar a conta comercial e o número de WhatsApp diretamente na janela segura da Meta, sem necessidade de copiar chaves manualmente.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleValidateAndSave}
                  disabled={isValidating}
                  className="bg-[#1877F2] hover:bg-[#166fe5] text-white font-medium text-xs px-6 py-2.5 h-10 gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  {isValidating ? (
                    <RefreshCw className="size-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="size-4" />
                  )}
                  <span>Continuar com o Facebook</span>
                </Button>

                <p className="text-[11px] text-muted-foreground">
                  Ambiente em conformidade com as Políticas Comerciais da Meta.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default WhatsAppCloudCard
