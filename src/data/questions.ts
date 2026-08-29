import type { Question } from '@/types'

/**
 * Content lives here as bilingual data (not i18next keys) because it's quiz
 * copy, not UI chrome — keeping it in one place makes it easy to edit or
 * swap out a question set without touching components.
 *
 * Each question always carries exactly one option per weight (1-4), and the
 * 5 traits rotate so every trait appears in 8 of the 40 option slots. That
 * keeps `lib/scoring.ts` simple: sum the chosen weights, and the trait with
 * the most accumulated weight wins as the dominant aura color.
 */
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: {
      en: "It's midnight and you can't sleep. What are you actually doing?",
      es: 'Es medianoche y no puedes dormir. ¿Qué haces en realidad?',
    },
    options: [
      { id: 'q1-a', trait: 'calm', weight: 1, text: { en: 'Rewatching a comfort show, half asleep', es: 'Reviendo una serie de siempre, medio dormido/a' } },
      { id: 'q1-b', trait: 'energy', weight: 2, text: { en: 'Making a hype playlist for tomorrow', es: 'Armando una playlist de energía para mañana' } },
      { id: 'q1-c', trait: 'mystery', weight: 3, text: { en: "Journaling thoughts I can't quite explain", es: 'Escribiendo pensamientos que no sé explicar' } },
      { id: 'q1-d', trait: 'chaos', weight: 4, text: { en: 'Texting the group chat something unhinged', es: 'Mandando algo random al chat grupal' } },
    ],
  },
  {
    id: 'q2',
    prompt: {
      en: 'Pick the way you walk into a room.',
      es: 'Elige cómo entras a una habitación.',
    },
    options: [
      { id: 'q2-a', trait: 'calm', weight: 2, text: { en: 'Quietly — I scan the room first', es: 'En silencio, primero observo todo' } },
      { id: 'q2-b', trait: 'energy', weight: 3, text: { en: 'Loud — I bring the energy up immediately', es: 'Fuerte, subo la energía al instante' } },
      { id: 'q2-c', trait: 'mystery', weight: 4, text: { en: 'However the room feels, I match it', es: 'Como se sienta el ambiente, así me adapto' } },
      { id: 'q2-d', trait: 'light', weight: 1, text: { en: "Warmly — I say hi to whoever's nearest", es: 'Con calidez, saludo a quien tenga cerca' } },
    ],
  },
  {
    id: 'q3',
    prompt: {
      en: 'You just walked into a party where you know almost nobody. What actually happens?',
      es: 'Llegas a una fiesta donde casi no conoces a nadie. ¿Qué pasa en realidad?',
    },
    options: [
      { id: 'q3-a', trait: 'calm', weight: 3, text: { en: 'I stay quiet and let the room settle', es: 'Me quedo tranquilo/a y dejo que el ambiente se asiente' } },
      { id: 'q3-b', trait: 'energy', weight: 4, text: { en: 'I light the whole place up on entry', es: 'Ilumino todo el lugar apenas entro' } },
      { id: 'q3-c', trait: 'chaos', weight: 1, text: { en: 'I trip over something within 10 seconds', es: 'Me tropiezo con algo en los primeros 10 segundos' } },
      { id: 'q3-d', trait: 'light', weight: 2, text: { en: 'I find the person who needs a smile', es: 'Busco a la persona que necesita una sonrisa' } },
    ],
  },
  {
    id: 'q4',
    prompt: {
      en: "What's most true for you right now, in this exact moment?",
      es: '¿Qué es lo más cierto para ti justo en este momento?',
    },
    options: [
      { id: 'q4-a', trait: 'calm', weight: 4, text: { en: 'Deep stillness — I could sit in silence for hours', es: 'Una calma profunda — podría estar en silencio por horas' } },
      { id: 'q4-b', trait: 'mystery', weight: 1, text: { en: 'A little curiosity about things nobody talks about', es: 'Curiosidad por cosas de las que nadie habla' } },
      { id: 'q4-c', trait: 'chaos', weight: 2, text: { en: "A random impulse I don't overthink", es: 'Un impulso random que no pienso demasiado' } },
      { id: 'q4-d', trait: 'light', weight: 3, text: { en: "A genuine urge to make someone's day better", es: 'Un impulso genuino de alegrarle el día a alguien' } },
    ],
  },
  {
    id: 'q5',
    prompt: {
      en: 'Which feeling has been visiting you lately?',
      es: '¿Qué sentimiento te ha estado visitando últimamente?',
    },
    options: [
      { id: 'q5-a', trait: 'energy', weight: 1, text: { en: 'A small burst of motivation, nothing wild', es: 'Un pequeño empujón de motivación, nada intenso' } },
      { id: 'q5-b', trait: 'mystery', weight: 2, text: { en: "A pull toward something I can't explain", es: 'Una atracción hacia algo que no puedo explicar' } },
      { id: 'q5-c', trait: 'chaos', weight: 3, text: { en: 'A reckless idea that sounds fun in the moment', es: 'Una idea arriesgada que suena divertida en el momento' } },
      { id: 'q5-d', trait: 'light', weight: 4, text: { en: 'An overwhelming need to help someone, anyone', es: 'Una necesidad enorme de ayudar a alguien, a quien sea' } },
    ],
  },
  {
    id: 'q6',
    prompt: {
      en: 'Someone cuts you off in traffic. What actually happens in your head?',
      es: 'Alguien se te cruza feo en el tráfico. ¿Qué pasa en tu cabeza?',
    },
    options: [
      { id: 'q6-a', trait: 'calm', weight: 2, text: { en: 'I let it go before it even lands', es: 'Lo dejo pasar antes de que me afecte' } },
      { id: 'q6-b', trait: 'energy', weight: 3, text: { en: 'It fires me up, I need to move', es: 'Me activa, necesito moverme' } },
      { id: 'q6-c', trait: 'mystery', weight: 4, text: { en: "It feels like a sign I can't ignore", es: 'Se siente como una señal que no puedo ignorar' } },
      { id: 'q6-d', trait: 'chaos', weight: 1, text: { en: 'I laugh it off and forget it in five seconds', es: 'Me río y lo olvido en cinco segundos' } },
    ],
  },
  {
    id: 'q7',
    prompt: {
      en: 'Pick a color that feels like you right now.',
      es: 'Elige un color que se sienta como tú ahora mismo.',
    },
    options: [
      { id: 'q7-a', trait: 'calm', weight: 3, text: { en: 'Soft blue — steady and unbothered', es: 'Azul suave — estable y sin apuros' } },
      { id: 'q7-b', trait: 'energy', weight: 4, text: { en: 'Golden amber — impossible to ignore', es: 'Ámbar dorado — imposible de ignorar' } },
      { id: 'q7-c', trait: 'mystery', weight: 1, text: { en: 'Deep violet — a little unreadable', es: 'Violeta profundo — un poco indescifrable' } },
      { id: 'q7-d', trait: 'light', weight: 2, text: { en: 'Warm white — simple and clear', es: 'Blanco cálido — simple y claro' } },
    ],
  },
  {
    id: 'q8',
    prompt: {
      en: 'What do people usually come to you for?',
      es: '¿Para qué suele buscarte la gente?',
    },
    options: [
      { id: 'q8-a', trait: 'calm', weight: 4, text: { en: "A grounded plan when everyone's spiraling", es: 'Un plan con los pies en la tierra cuando todo es un caos' } },
      { id: 'q8-b', trait: 'energy', weight: 1, text: { en: 'A little push to get things moving', es: 'Un empujón para que las cosas se muevan' } },
      { id: 'q8-c', trait: 'chaos', weight: 2, text: { en: 'The plot twist nobody saw coming', es: 'El giro inesperado que nadie vio venir' } },
      { id: 'q8-d', trait: 'light', weight: 3, text: { en: 'A reason to believe things will work out', es: 'Una razón para creer que todo va a salir bien' } },
    ],
  },
  {
    id: 'q9',
    prompt: {
      en: 'Pick your ideal superpower.',
      es: 'Elige tu superpoder ideal.',
    },
    options: [
      { id: 'q9-a', trait: 'calm', weight: 1, text: { en: 'Time freeze, just to catch my breath', es: 'Congelar el tiempo, solo para respirar' } },
      { id: 'q9-b', trait: 'mystery', weight: 2, text: { en: 'Reading minds, quietly, just to know', es: 'Leer mentes, en silencio, solo para saber' } },
      { id: 'q9-c', trait: 'chaos', weight: 3, text: { en: 'Teleportation, wherever the impulse takes me', es: 'Teletransportarme, a donde el impulso me lleve' } },
      { id: 'q9-d', trait: 'light', weight: 4, text: { en: 'Healing — undoing pain wherever I find it', es: 'Sanar — deshacer el dolor donde lo encuentre' } },
    ],
  },
  {
    id: 'q10',
    prompt: {
      en: 'Last one. What does your future feel like?',
      es: 'Última. ¿Cómo se siente tu futuro?',
    },
    options: [
      { id: 'q10-a', trait: 'energy', weight: 2, text: { en: 'Big, loud, and impossible to miss', es: 'Grande, ruidoso e imposible de ignorar' } },
      { id: 'q10-b', trait: 'mystery', weight: 3, text: { en: "Full of signs I'm still decoding", es: 'Lleno de señales que todavía estoy descifrando' } },
      { id: 'q10-c', trait: 'chaos', weight: 4, text: { en: 'Completely unwritten, and a little wild', es: 'Completamente sin escribir, y un poco salvaje' } },
      { id: 'q10-d', trait: 'light', weight: 1, text: { en: 'Peaceful, simple, and mine', es: 'Tranquilo, simple, y mío' } },
    ],
  },
]
