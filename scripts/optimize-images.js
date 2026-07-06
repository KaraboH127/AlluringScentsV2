import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Optimizes images in public/ by producing .webp and .avif derivatives.
// NOTE: This requires `sharp` to be installed. It preserves original files.

const publicDir = path.resolve(process.cwd(), 'public');
const exts = ['.jpg', '.jpeg', '.png'];

async function processFile(file) {
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);
  const full = path.join(publicDir, file);
  if (!exts.includes(ext)) return;

  try {
    const img = sharp(full);
    // Produce WebP
    await img.toFile(path.join(publicDir, `${name}.webp`));
    // Produce AVIF
    await img.toFile(path.join(publicDir, `${name}.avif`));
    console.log('Optimized', file);
  } catch (err) {
    console.warn('Failed to optimize', file, err.message);
  }
}

async function main() {
  const files = fs.readdirSync(publicDir).filter((f) => exts.includes(path.extname(f).toLowerCase()));
  for (const f of files) {
    // Skip if optimized already exists
    const name = path.basename(f, path.extname(f));
    const webp = path.join(publicDir, `${name}.webp`);
    if (fs.existsSync(webp)) continue;
    await processFile(f);
  }
  console.log('Image optimization complete');
}

main().catch((e) => {
  console.error('Image optimization failed', e);
  process.exit(1);
});
