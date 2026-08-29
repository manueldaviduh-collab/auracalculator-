import { QUESTIONS } from '@/data/questions'
import type { AuraAnswer, AuraResult, AuraTier, Trait, TraitBreakdown } from '@/types'

export const TRAITS: Trait[] = ['energy', 'calm', 'mystery', 'chaos', 'light']

/** Hex + soft glow color per dominant trait — drives the orb, the result screen and the share card. */
export const TRAIT_COLORS: Record<Trait, { core: string; glow: string }> = {
  energy: { core: '#ffc26b', glow: 'rgba(255, 194, 107, 0.45)' },
  calm: { core: '#7cd6f9', glow: 'rgba(124, 214, 249, 0.45)' },
  mystery: { core: '#b57cf9', glow: 'rgba(181, 124, 249, 0.45)' },
  chaos: { core: '#ff6ba3', glow: 'rgba(255, 107, 163, 0.45)' },
  light: { core: '#7cf9d8', glow: 'rgba(124, 249, 216, 0.45)' },
}

const RAW_MIN = QUESTIONS.length * 1
const RAW_MAX = QUESTIONS.length * 4
const DISPLAY_BASE = 900
const DISPLAY_MULTIPLIER = 205
const VARIANCE_RANGE = 300

const TIER_THRESHOLDS: { max: number; tier: AuraTier }[] = [
  { max: 3999, tier: 'dormant' },
  { max: 5299, tier: 'balanced' },
  { max: 6599, tier: 'vibrant' },
  { max: 7899, tier: 'radiant' },
  { max: 8999, tier: 'legendary' },
  { max: Infinity, tier: 'mythic' },
]

/** Deterministic djb2-style hash so retaking with the same answers reproduces the same flashy number. */
function hashAnswers(answers: AuraAnswer[]): number {
  const key = answers.map((a) => `${a.questionId}:${a.optionId}`).join('|')
  let hash = 5381
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 33) ^ key.charCodeAt(i)
  }
  return Math.abs(hash)
}

function tierForScore(score: number): AuraTier {
  return TIER_THRESHOLDS.find((t) => score <= t.max)?.tier ?? 'mythic'
}

export function computeAuraResult(answers: AuraAnswer[]): AuraResult {
  const traitPoints = new Map<Trait, number>(TRAITS.map((t) => [t, 0]))
  let rawScore = 0

  for (const answer of answers) {
    const question = QUESTIONS.find((q) => q.id === answer.questionId)
    const option = question?.options.find((o) => o.id === answer.optionId)
    if (!option) continue
    rawScore += option.weight
    traitPoints.set(option.trait, (traitPoints.get(option.trait) ?? 0) + option.weight)
  }

  const traitBreakdown: TraitBreakdown[] = TRAITS.map((trait) => ({
    trait,
    points: traitPoints.get(trait) ?? 0,
  })).sort((a, b) => b.points - a.points)

  const dominantTrait = traitBreakdown[0]?.trait ?? 'light'

  const clampedRaw = Math.min(Math.max(rawScore, RAW_MIN), RAW_MAX)
  const variance = hashAnswers(answers) % VARIANCE_RANGE
  const displayScore = DISPLAY_BASE + clampedRaw * DISPLAY_MULTIPLIER + variance
  const tier = tierForScore(displayScore)

  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    answers,
    rawScore: clampedRaw,
    displayScore,
    tier,
    dominantTrait,
    traitBreakdown,
  }
}

export function formatDisplayScore(score: number): string {
  return `+${new Intl.NumberFormat('en-US').format(score)}`
}
