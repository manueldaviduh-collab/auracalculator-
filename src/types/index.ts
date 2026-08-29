export type Language = 'en' | 'es'

export type Screen = 'home' | 'quiz' | 'calculating' | 'result'

export type Trait = 'energy' | 'calm' | 'mystery' | 'chaos' | 'light'

export type AuraTier = 'dormant' | 'balanced' | 'vibrant' | 'radiant' | 'legendary' | 'mythic'

/** Faces the mascot can pull — one per option (reacting to the tap) and one per tier (the final reveal). */
export type Expression =
  | 'neutral'
  | 'shy'
  | 'chaotic'
  | 'friendly'
  | 'hype'
  | 'smug'
  | 'cool'
  | 'deadpan'
  | 'love'
  | 'shocked'
  | 'sad'
  | 'evil'
  | 'crying-laughing'
  | 'thinking'

export interface QuestionOption {
  id: string
  text: Record<Language, string>
  trait: Trait
  /** 1 (mild) to 4 (intense) — feeds the hidden score, never shown to the user. */
  weight: 1 | 2 | 3 | 4
  /** The mascot's reaction when this option is tapped. */
  expression: Expression
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
