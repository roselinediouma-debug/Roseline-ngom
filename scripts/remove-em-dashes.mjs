/**
 * Remplace " — " par ", " dans les fichiers source.
 * Exclut node_modules, .next, .claude/worktrees, .git.
 * Tables markdown (|---|) épargnées car le pattern cible " — " (avec espaces autour).
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const EXTS = new Set(['.tsx', '.ts', '.jsx', '.js', '.md', '.mdx', '.json'])
const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', '.claude', 'dist', 'build', '.vercel'])

let filesTouched = 0
let totalReplacements = 0

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.has(entry.name)) continue
      walk(path.join(dir, entry.name))
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name)
      if (!EXTS.has(ext)) continue
      const full = path.join(dir, entry.name)
      const content = fs.readFileSync(full, 'utf-8')
      if (!content.includes('—')) continue
      // Stratégie :
      //  " — " (avec espaces)      -> ", "
      //  "—" en début de ligne puis espace (puce)  -> "-"
      //  "—" restants isolés       -> "-"
      let out = content
      const before = out
      out = out.replace(/ — /g, ', ')
      out = out.replace(/^— /gm, '- ')
      // ne pas toucher aux séparateurs de tables markdown (|---|) : pas d'em-dash dans ces tables
      out = out.replace(/—/g, '-')
      if (out !== before) {
        const count = (before.match(/—/g) || []).length
        try {
          fs.writeFileSync(full, out, 'utf-8')
          filesTouched += 1
          totalReplacements += count
          console.log(`  · ${path.relative(ROOT, full)} (${count})`)
        } catch (e) {
          console.log(`  ⚠️  SKIP (verrouillé) ${path.relative(ROOT, full)}: ${e.code}`)
        }
      }
    }
  }
}

console.log('Remplacement des em-dash (—) ...\n')
walk(ROOT)
console.log(`\n✅ ${filesTouched} fichiers modifiés, ${totalReplacements} em-dash retirés.`)
