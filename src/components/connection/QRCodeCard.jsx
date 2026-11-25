import React from "react"
import { WhatsAppCloudCard } from "./WhatsAppCloudCard"

/**
 * QRCodeCard (Legado / Refatorado):
 * Na versão com a API Oficial da Meta (WhatsApp Business Cloud API),
 * a conexão por leitura de QR Code é substituída pela autenticação via Graph API (WABA ID + Phone Number ID + Token).
 * Este arquivo reexporta o WhatsAppCloudCard para compatibilidade retroativa.
 */
export function QRCodeCard(props) {
  return <WhatsAppCloudCard {...props} />
}

export { WhatsAppCloudCard }
export default QRCodeCard