export const APP_NAME = 'Aura Calculator'

/** Used for share captions and the card watermark. Update if the domain ever changes. */
export const APP_URL = 'auracalculator-two.vercel.app'

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
