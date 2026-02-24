const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inDir = path.join(__dirname, 'source_images');
const outDir = path.join(__dirname, 'public', 'sequence', 'matcha');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(inDir).filter(f => f.endsWith('.jpg')).sort();

(async () => {
  for (let [i, file] of files.entries()) {
    const num = String(i).padStart(3, '0');
    const outFile = path.join(outDir, `matcha_${num}.webp`);
    await sharp(path.join(inDir, file))
      .webp({ quality: 80 })
      .toFile(outFile);
    console.log(`Converted ${file} to matcha_${num}.webp`);
  }
  console.log('Conversion complete.');
})();
