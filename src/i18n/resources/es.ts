import type { en } from './en'

export const es: typeof en = {
  common: {
    langEn: 'EN',
    langEs: 'ES',
  },
  home: {
    eyebrow: 'Gratis · 10 preguntas rápidas',
    title: '¿Cómo se ve tu aura hoy?',
    subtitle: 'Responde 10 preguntas rápidas y leeremos la energía que estás transmitiendo.',
    cta: 'Calcular Mi Aura',
    footer: 'Sin registro. Sin respuestas incorrectas. Solo vibra.',
  },
  quiz: {
    question: 'Pregunta {{current}} de {{total}}',
    back: 'Atrás',
  },
  calculating: {
    title: 'Calculando Tu Aura',
    lines: [
      'Leyendo tu energía...',
      'Alineando tus frecuencias...',
      'Midiendo el brillo...',
      'Ya casi...',
    ],
  },
  result: {
    scoreLabel: 'Puntaje de Aura',
    dominantTrait: 'Energía dominante',
    share: 'Compartir Mi Aura',
    retake: 'Repetir el quiz',
    tiers: {
      dormant: 'Dormida',
      balanced: 'Equilibrada',
      vibrant: 'Vibrante',
      radiant: 'Radiante',
      legendary: 'Legendaria',
      mythic: 'Mítica',
    },
    taglines: {
      dormant: 'Tu aura apenas está despertando. Hay mucho espacio para brillar.',
      balanced: 'Estable, con los pies en la tierra y silenciosamente poderosa.',
      vibrant: 'La gente siente tu energía antes de que digas una palabra.',
      radiant: 'Entras y la sala cambia.',
      legendary: 'Aire poco común. Casi nadie llega aquí.',
      mythic: 'Fuera de escala. Esto no se ve dos veces.',
    },
    traits: {
      energy: 'Energía',
      calm: 'Calma',
      mystery: 'Misterio',
      chaos: 'Caos',
      light: 'Luz',
    },
  },
  adSlot: {
    label: 'Espacio patrocinado',
  },
  share: {
    success: '¡Listo! Compártela donde quieras.',
    copied: 'Tarjeta de aura copiada',
    downloaded: 'Tarjeta de aura descargada',
    error: 'No se pudo generar la tarjeta. Intenta de nuevo.',
    caption: 'Mi puntaje de Aura es {{score}} {{tier}}. Calcula el tuyo en {{url}}',
  },
}
