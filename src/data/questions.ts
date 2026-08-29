import type { Question } from '@/types'

/**
 * Content lives here as bilingual data (not i18next keys) because it's quiz
 * copy, not UI chrome — keeping it in one place makes it easy to edit or
 * swap out a question set without touching components.
 *
 * Each question always carries exactly one option per weight (1-4), and the
 * 5 traits rotate so every trait appears in 8 of the 40 option slots. That
 * keeps `lib/scoring.ts` simple: sum the chosen weights, and the trait with
 * the most accumulated weight wins as the dominant aura color. The height
 * question (q2) is the one deliberate exception — its weights are pinned to
 * height order (taller = more points), not the rotation, per spec.
 *
 * `expression` drives the mascot's reaction (see components/AuraFace.tsx)
 * when that option is tapped — purely cosmetic, no effect on scoring.
 */
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: {
      en: "You walk into a party where you don't know anyone. What do you do?",
      es: 'Entras a una fiesta donde no conoces a nadie. ¿Qué haces?',
    },
    options: [
      { id: 'q1-a', trait: 'calm', weight: 1, expression: 'shy', text: { en: 'Try to go completely unnoticed', es: 'Tratar de pasar totalmente desapercibido' } },
      { id: 'q1-b', trait: 'energy', weight: 2, expression: 'chaotic', text: { en: 'Open Clash Royale in the middle of the crowd', es: 'Abrir Clash Royale en medio de la multitud' } },
      { id: 'q1-c', trait: 'mystery', weight: 3, expression: 'friendly', text: { en: "Talk to whoever's standing closest to you", es: 'Hablarle a la persona más cercana a ti' } },
      { id: 'q1-d', trait: 'chaos', weight: 4, expression: 'hype', text: { en: 'Start dancing to the beat', es: 'Empezar a bailar al ritmo de la música' } },
    ],
  },
  {
    id: 'q2',
    prompt: {
      en: 'How tall are you?',
      es: '¿Cuánto mides?',
    },
    options: [
      { id: 'q2-a', trait: 'calm', weight: 1, expression: 'neutral', text: { en: '55–62 in', es: '140–159 cm' } },
      { id: 'q2-b', trait: 'mystery', weight: 2, expression: 'neutral', text: { en: '63–66 in', es: '160–169 cm' } },
      { id: 'q2-c', trait: 'light', weight: 3, expression: 'smug', text: { en: '67–70 in', es: '170–179 cm' } },
      { id: 'q2-d', trait: 'energy', weight: 4, expression: 'cool', text: { en: '71–74 in', es: '180–189 cm' } },
    ],
  },
  {
    id: 'q3',
    prompt: {
      en: 'You see a therian on the street. What do you do?',
      es: 'Ves a un therian en la calle. ¿Qué haces?',
    },
    options: [
      { id: 'q3-a', trait: 'calm', weight: 3, expression: 'deadpan', text: { en: 'Ignore them', es: 'Lo ignoras' } },
      { id: 'q3-b', trait: 'energy', weight: 4, expression: 'chaotic', text: { en: 'Feed them animal food', es: 'Lo alimentas con comida para animales' } },
      { id: 'q3-c', trait: 'chaos', weight: 1, expression: 'love', text: { en: 'Pet them', es: 'Lo acaricias' } },
      { id: 'q3-d', trait: 'light', weight: 2, expression: 'shocked', text: { en: 'Call animal control', es: 'Llamas a control de animales' } },
    ],
  },
  {
    id: 'q4',
    prompt: {
      en: 'If your partner breaks up with you, what do you do?',
      es: 'Si tu novio o novia te deja, ¿qué haces?',
    },
    options: [
      { id: 'q4-a', trait: 'calm', weight: 4, expression: 'sad', text: { en: 'Beg them to come back', es: 'Ruegas para que vuelva' } },
      { id: 'q4-b', trait: 'mystery', weight: 1, expression: 'cool', text: { en: 'Ignore it and let them move on', es: 'Lo ignoras y dejas que siga con su vida' } },
      { id: 'q4-c', trait: 'chaos', weight: 2, expression: 'evil', text: { en: 'Silently follow them everywhere', es: 'Lo sigues en silencio a todas partes' } },
      { id: 'q4-d', trait: 'light', weight: 3, expression: 'evil', text: { en: 'Catfish them online as someone else to win them back', es: 'Te haces pasar por otra persona en línea para reconquistarla' } },
    ],
  },
  {
    id: 'q5',
    prompt: {
      en: 'What would you do if you were invisible for a day?',
      es: '¿Qué harías si fueras invisible por un día?',
    },
    options: [
      { id: 'q5-a', trait: 'energy', weight: 1, expression: 'chaotic', text: { en: 'Illegal stuff', es: 'Cosas ilegales' } },
      { id: 'q5-b', trait: 'mystery', weight: 2, expression: 'evil', text: { en: 'Scare people', es: 'Asustar a las personas' } },
      { id: 'q5-c', trait: 'chaos', weight: 3, expression: 'evil', text: { en: 'Stalk your crush', es: 'Acosar a tu crush' } },
      { id: 'q5-d', trait: 'light', weight: 4, expression: 'shocked', text: { en: 'Freak out and want to go back to normal', es: 'Asustarte y querer volver a la normalidad' } },
    ],
  },
  {
    id: 'q6',
    prompt: {
      en: 'If your aura had a phonk, which one would it be?',
      es: 'Si tu aura tuviera un phonk, ¿cuál sería?',
    },
    options: [
      { id: 'q6-a', trait: 'calm', weight: 2, expression: 'cool', text: { en: '3 AM drift phonk 🏎️💨', es: 'Phonk de drift a las 3 AM 🏎️💨' } },
      { id: 'q6-b', trait: 'energy', weight: 3, expression: 'smug', text: { en: 'Sigma villain-arc phonk 😤', es: 'Phonk sigma de villano 😤' } },
      { id: 'q6-c', trait: 'mystery', weight: 4, expression: 'hype', text: { en: 'Nonstop cowbell phonk 🔔', es: 'Phonk de cencerro sin parar 🔔' } },
      { id: 'q6-d', trait: 'chaos', weight: 1, expression: 'chaotic', text: { en: 'Brazilian funk at full volume 🇧🇷🔥', es: 'Funk brasileño a todo volumen 🇧🇷🔥' } },
    ],
  },
  {
    id: 'q7',
    prompt: {
      en: "You need a bathroom and you're not at home. What do you do?",
      es: 'Necesitas ir al baño y estás fuera de casa. ¿Qué haces?',
    },
    options: [
      { id: 'q7-a', trait: 'calm', weight: 3, expression: 'shocked', text: { en: 'You just go in your pants', es: 'Te cagas encima' } },
      { id: 'q7-b', trait: 'energy', weight: 4, expression: 'deadpan', text: { en: 'Hold it until you find a bathroom', es: 'Te aguantas hasta encontrar un baño' } },
      { id: 'q7-c', trait: 'mystery', weight: 1, expression: 'evil', text: { en: 'Make the person next to you smell it', es: 'Haces que la persona de al lado huela tus desechos' } },
      { id: 'q7-d', trait: 'light', weight: 2, expression: 'crying-laughing', text: { en: 'You eat it', es: 'Te lo comes' } },
    ],
  },
  {
    id: 'q8',
    prompt: {
      en: 'If you had to be born on one continent, which would you choose?',
      es: 'Si tuvieras que nacer en un continente, ¿cuál elegirías?',
    },
    options: [
      { id: 'q8-a', trait: 'calm', weight: 4, expression: 'neutral', text: { en: 'Europe', es: 'Europa' } },
      { id: 'q8-b', trait: 'energy', weight: 1, expression: 'friendly', text: { en: 'The Americas', es: 'América' } },
      { id: 'q8-c', trait: 'chaos', weight: 2, expression: 'smug', text: { en: 'Asia', es: 'Asia' } },
      { id: 'q8-d', trait: 'light', weight: 3, expression: 'hype', text: { en: 'Africa', es: 'África' } },
    ],
  },
  {
    id: 'q9',
    prompt: {
      en: "You're invited to an aura battle. What's your move?",
      es: 'Te invitan a una batalla de aura. ¿Qué movimiento haces?',
    },
    options: [
      { id: 'q9-a', trait: 'calm', weight: 1, expression: 'chaotic', text: { en: "Spam '6-7'", es: "Spamear '6-7'" } },
      { id: 'q9-b', trait: 'mystery', weight: 2, expression: 'hype', text: { en: 'Bust a dance move', es: 'Bailar' } },
      { id: 'q9-c', trait: 'chaos', weight: 3, expression: 'smug', text: { en: 'Start mewing', es: 'Hacer mewing' } },
      { id: 'q9-d', trait: 'light', weight: 4, expression: 'cool', text: { en: 'Just stand there, staring your opponent down with pure confidence', es: 'Quedarte parado mirando fijamente a tu oponente con seguridad' } },
    ],
  },
  {
    id: 'q10',
    prompt: {
      en: 'If you had to cut one thing from your life forever, what would it be?',
      es: 'Si tuvieras que eliminar algo de tu vida para siempre, ¿qué sería?',
    },
    options: [
      { id: 'q10-a', trait: 'energy', weight: 2, expression: 'sad', text: { en: 'Video games', es: 'Los videojuegos' } },
      { id: 'q10-b', trait: 'mystery', weight: 3, expression: 'shocked', text: { en: 'Music', es: 'La música' } },
      { id: 'q10-c', trait: 'chaos', weight: 4, expression: 'crying-laughing', text: { en: 'Drinking water', es: 'Tomar agua' } },
      { id: 'q10-d', trait: 'light', weight: 1, expression: 'shocked', text: { en: 'Food', es: 'La comida' } },
    ],
  },
]
