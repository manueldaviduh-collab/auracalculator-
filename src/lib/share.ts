import { renderAuraCardBlob, type ShareCardCopy } from '@/lib/shareCard'
import type { AuraResult } from '@/types'

export type ShareOutcome = 'shared' | 'copied' | 'downloaded' | 'error'

interface ShareCopy extends ShareCardCopy {
  caption: string
}

/**
 * Tries the native share sheet first (best on mobile — the target platform
 * for this quiz), then falls back to copying the image, then to a plain
 * download so the flow never dead-ends.
 */
export async function shareAuraResult(result: AuraResult, copy: ShareCopy): Promise<ShareOutcome> {
  try {
    const blob = await renderAuraCardBlob(result, copy)
    const file = new File([blob], 'my-aura.png', { type: 'image/png' })

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Aura Calculator', text: copy.caption })
      return 'shared'
    }

    if ('clipboard' in navigator && 'write' in navigator.clipboard && 'ClipboardItem' in window) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
      return 'copied'
    }

    downloadBlob(blob, 'my-aura.png')
    return 'downloaded'
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return 'shared'
    }
    console.error('Aura share failed', err)
    return 'error'
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}
