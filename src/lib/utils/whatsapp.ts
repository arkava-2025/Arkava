// Número oficial de Arkava (se usa si el CMS no trae uno)
export const ARKAVA_WHATSAPP = '573207672761';

// Normaliza el número del CMS a formato internacional sin símbolos: "57XXXXXXXXXX".
// Acepta "3207672761", "573207672761", "+57 320 767 2761", etc.
export function normalizeWhatsapp(raw?: string | number | null): string {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (digits.length === 10) return `57${digits}`;
  if (digits.length === 12 && digits.startsWith('57')) return digits;
  return ARKAVA_WHATSAPP;
}

export function whatsappLink(raw: string | number | null | undefined, text: string): string {
  return `https://wa.me/${normalizeWhatsapp(raw)}?text=${encodeURIComponent(text)}`;
}
