export const APP_NAME = 'Aura Calculator'

/** The bare domain — used for the card's visual watermark, which isn't a tappable link anyway. */
export const APP_URL = 'auracalculator-two.vercel.app'

/**
 * The full, protocol-qualified URL. Share captions must use this one, not
 * APP_URL: WhatsApp (and most apps) only auto-linkify a URL in shared text
 * when it starts with a scheme — a bare domain just renders as plain text,
 * which is exactly the "people have to copy-paste it" problem this fixes.
 */
export const APP_FULL_URL = `https://${APP_URL}`

/**
 * Kill switches for the next milestones. The MVP goal is validating whether
 * people enjoy the quiz + share loop, so both stay off until that's proven.
 */
export const FEATURES = {
  ads: false,
  profiles: false,
} as const

export const SHARE_CARD_SIZE = { width: 1080, height: 1920 } as const

/**
 * AdSense readiness. `FEATURES.ads` is the master switch (stays off until
 * the share loop is validated); `clientId`/`slotId` are the two values
 * AdSlot needs once there's an approved AdSense account — paste them in and
 * flip the flag, no other code changes required.
 */
export const ADSENSE = {
  clientId: '', // e.g. 'ca-pub-XXXXXXXXXXXXXXXX'
  slotId: '', // e.g. '1234567890'
} as const
