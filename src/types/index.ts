export type Language = 'en' | 'es'

export type Screen = 'home' | 'quiz' | 'calculating' | 'result'

export type Trait = 'energy' | 'calm' | 'mystery' | 'chaos' | 'light'

export type AuraTier = 'dormant' | 'balanced' | 'vibrant' | 'radiant' | 'legendary' | 'mythic'

export interface QuestionOption {
  id: string
  text: Record<Language, string>
  trait: Trait
  /** 1 (mild) to 4 (intense) — feeds the hidden score, never shown to the user. */
  weight: 1 | 2 | 3 | 4
}

export interface Question {
  id: string
  prompt: Record<Language, string>
  options: QuestionOption[]
}

export interface AuraAnswer {
  questionId: string
  optionId: string
}

export interface TraitBreakdown {
  trait: Trait
  points: number
}

export interface AuraResult {
  id: string
  createdAt: number
  answers: AuraAnswer[]
  rawScore: number
  displayScore: number
  tier: AuraTier
  dominantTrait: Trait
  traitBreakdown: TraitBreakdown[]
}

/**
 * Not used yet — the store and storage layer already shape data around it
 * so avatars/accounts can be added later without a rewrite.
 */
export interface UserProfile {
  id: string
  displayName?: string
  avatarUrl?: string
  createdAt: number
  history: AuraResult[]
}
