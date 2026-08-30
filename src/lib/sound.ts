/**
 * Tiny synthesized UI sounds via Web Audio — no audio files to license or
 * ship. Everything here is a couple of oscillator blips with a short gain
 * envelope, triggered from user-gesture event handlers (tap/reveal), which
 * satisfies the autoplay policies that would otherwise block audio.
 */

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

function tone(ctx: AudioContext, freq: number, startTime: number, duration: number, peakGain: number, type: OscillatorType) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, startTime)
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.008)
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.02)
}

/** A quick, unobtrusive click for tapping a quiz option. */
export function playTapBlip() {
  const ctx = getAudioContext()
  if (!ctx) return
  tone(ctx, 720, ctx.currentTime, 0.09, 0.12, 'sine')
}

/** The result reveal — a short rising chime, bigger for the top tiers. */
export function playRevealChime(big: boolean) {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime
  const notes = big ? [523.25, 659.25, 783.99, 1046.5] : [440, 659.25]
  const step = big ? 0.11 : 0.14
  notes.forEach((freq, i) => tone(ctx, freq, now + i * step, 0.28, 0.14, 'triangle'))
}
