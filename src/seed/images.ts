import sharp from 'sharp'

/**
 * Generates abstract placeholder images so the demo site has no third-party or copied media.
 * Replace them with the client's approved photography before launch.
 */
export async function placeholderImage(seed: number, width = 1600, height = 1000): Promise<Buffer> {
  const hues = [205, 190, 160, 215, 25, 260, 175, 200]
  const h1 = hues[seed % hues.length]
  const h2 = (h1 + 35) % 360
  const shapes = Array.from({ length: 7 }, (_, i) => {
    const x = ((seed * 97 + i * 211) % 100) / 100
    const y = ((seed * 53 + i * 137) % 100) / 100
    const r = 80 + ((seed * 31 + i * 71) % 260)
    return `<circle cx="${x * width}" cy="${y * height}" r="${r}" fill="hsla(${(h1 + i * 12) % 360},70%,${55 + (i % 3) * 10}%,0.35)"/>`
  }).join('')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h1},65%,32%)"/><stop offset="1" stop-color="hsl(${h2},70%,55%)"/>
    </linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>${shapes}
    <path d="M0 ${height * 0.78} Q ${width * 0.3} ${height * 0.62} ${width * 0.6} ${height * 0.8} T ${width} ${height * 0.74} V ${height} H 0 Z" fill="hsla(${h1},40%,15%,0.35)"/>
  </svg>`
  return sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toBuffer()
}

export async function placeholderLogo(label: string, hue: number): Promise<Buffer> {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="160">
    <rect x="10" y="30" width="100" height="100" rx="22" fill="hsl(${hue},60%,40%)"/>
    <rect x="135" y="55" width="${80 + label.length * 9}" height="20" rx="10" fill="hsl(${hue},20%,35%)"/>
    <rect x="135" y="90" width="${50 + label.length * 6}" height="14" rx="7" fill="hsl(${hue},15%,60%)"/>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}
