const sharp = require('sharp');
const fs = require('fs');

async function optimize(file) {
    console.log(`Optimizing ${file}...`);
    const buffer = fs.readFileSync(file);
    await sharp(buffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 60, progressive: true })
        .toFile(file);
    console.log(`Successfully optimized ${file}`);
}

async function run() {
    await optimize('couples_bg.jpg');
    await optimize('IMG-20260728-WA0118.jpg');
    await optimize('IMG-20260728-WA0119.jpg');
}
run();
