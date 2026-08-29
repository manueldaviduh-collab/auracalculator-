import { APP_URL, SHARE_CARD_SIZE } from '@/config'
import { TRAIT_COLORS, formatDisplayScore } from '@/lib/scoring'
import type { AuraResult } from '@/types'

export interface ShareCardCopy {
  tierLabel: string
  traitLabel: string
  tagline: string
}

/**
 * Renders the shareable aura card to a PNG blob via canvas — no DOM
 * screenshot library needed, which keeps the bundle small and avoids
 * font/CORS quirks that come with html-to-image style tools.
 */
export async function renderAuraCardBlob(result: AuraResult, copy: ShareCardCopy): Promise<Blob> {
  await document.fonts.ready

  const { width, height } = SHARE_CARD_SIZE
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas is not supported in this browser')

  const colors = TRAIT_COLORS[result.dominantTrait]
  const cx = width / 2

  drawBackground(ctx, width, height)
  drawOrb(ctx, cx, height * 0.32, width * 0.24, colors.core)
  drawScoreBlock(ctx, cx, width, height, colors.core, result, copy)
  drawReservedFooterBand(ctx, width, height)

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Failed to encode the aura card image'))
    }, 'image/png')
  })
}

function drawBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const bg = ctx.createLinearGradient(0, 0, 0, height)
  bg.addColorStop(0, '#180f2c')
  bg.addColorStop(0.5, '#0b0a14')
  bg.addColorStop(1, '#05040a')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, width, height)
}

function drawOrb(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, core: string) {
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.6)
  glow.addColorStop(0, hexToRgba(core, 0.5))
  glow.addColorStop(1, hexToRgba(core, 0))
  ctx.fillStyle = glow
  ctx.fillRect(cx - radius * 2.6, cy - radius * 2.6, radius * 5.2, radius * 5.2)

  const orbGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.35, radius * 0.08, cx, cy, radius)
  orbGrad.addColorStop(0, '#ffffff')
  orbGrad.addColorStop(0.35, core)
  orbGrad.addColorStop(1, core)
  ctx.fillStyle = orbGrad
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2)
  ctx.stroke()
}

function drawScoreBlock(
  ctx: CanvasRenderingContext2D,
  cx: number,
  width: number,
  height: number,
  core: string,
  result: AuraResult,
  copy: ShareCardCopy,
) {
  ctx.textAlign = 'center'

  ctx.fillStyle = '#f4f2ff'
  ctx.font = '700 118px "Space Grotesk", sans-serif'
  ctx.shadowColor = hexToRgba(core, 0.65)
  ctx.shadowBlur = 44
  ctx.fillText(formatDisplayScore(result.displayScore), cx, height * 0.58)
  ctx.shadowBlur = 0

  ctx.font = '700 54px "Space Grotesk", sans-serif'
  ctx.fillStyle = core
  ctx.fillText(copy.tierLabel.toUpperCase(), cx, height * 0.635)

  ctx.font = '400 32px "Inter", sans-serif'
  ctx.fillStyle = '#a6a3bf'
  wrapText(ctx, copy.tagline, cx, height * 0.685, width * 0.72, 42)

  ctx.font = '600 26px "Inter", sans-serif'
  ctx.fillStyle = '#f4f2ff'
  ctx.fillText(copy.traitLabel.toUpperCase(), cx, height * 0.76)
}

function drawReservedFooterBand(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const bandHeight = height * 0.11
  const bandY = height - bandHeight
  ctx.fillStyle = 'rgba(255,255,255,0.03)'
  ctx.fillRect(0, bandY, width, bandHeight)
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.beginPath()
  ctx.moveTo(0, bandY)
  ctx.lineTo(width, bandY)
  ctx.stroke()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '600 28px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#f4f2ff'
  ctx.fillText(APP_URL, width / 2, bandY + bandHeight / 2)
  ctx.textBaseline = 'alphabetic'
}

function hexToRgba(hex: string, alpha: number): string {
  const parsed = hex.replace('#', '')
  const value = Number.parseInt(parsed, 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(' ')
  let line = ''
  let currentY = y
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, currentY)
      line = word
      currentY += lineHeight
    } else {
      line = testLine
    }
  }
  if (line) ctx.fillText(line, x, currentY)
}
