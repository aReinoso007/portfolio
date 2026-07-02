import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sharp from 'sharp'
import { readdir, stat, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

function resolveSiteUrl(): string {
  if (process.env.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`
  }
  return ''
}

function injectSiteUrl(): Plugin {
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      const siteUrl = resolveSiteUrl()
      return html.replaceAll('__SITE_URL__', siteUrl)
    },
  }
}

function generateWebpVariants(rootDirs: string[]): Plugin {
  let publicDir = ''
  async function walkGenerate(dir: string) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await walkGenerate(full)
        continue
      }
      if (!/\.png$/i.test(entry.name)) continue
      const webp = full.replace(/\.png$/i, '.webp')
      if (existsSync(webp)) {
        const [pngStat, webpStat] = await Promise.all([stat(full), stat(webp)])
        if (webpStat.mtimeMs >= pngStat.mtimeMs) continue
      }
      const buf = await sharp(full)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer()
      await writeFile(webp, buf)
      console.log(`  generated ${path.relative(publicDir, webp)}`)
    }
  }
  return {
    name: 'generate-webp-variants',
    async buildStart() {
      publicDir = path.resolve('public')
      for (const sub of rootDirs) {
        const dir = path.join(publicDir, sub)
        if (existsSync(dir)) await walkGenerate(dir)
      }
    },
    async closeBundle() {
      const distDir = path.resolve('dist')
      let stripped = 0
      async function walkAndStrip(dir: string) {
        if (!existsSync(dir)) return
        const entries = await readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const full = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            await walkAndStrip(full)
            continue
          }
          if (!/\.png$/i.test(entry.name)) continue
          const webp = full.replace(/\.png$/i, '.webp')
          if (existsSync(webp)) {
            await unlink(full)
            stripped++
          }
        }
      }
      for (const sub of rootDirs) {
        await walkAndStrip(path.join(distDir, sub))
      }
      if (stripped > 0) console.log(`  stripped ${stripped} png files (webp siblings used at runtime)`)
    },
  }
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    tailwindcss(),
    injectSiteUrl(),
    generateWebpVariants(['allsci_images', 'chullav-images']),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
