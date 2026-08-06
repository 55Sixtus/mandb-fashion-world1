const { Jimp } = require("jimp");
const fs = require("fs");

async function optimizeImage(filename) {
    try {
        console.log(`Optimizing ${filename}...`);
        const image = await Jimp.read(filename);
        
        // Resize if it's too large (e.g. max width 1200)
        if (image.bitmap.width > 1200) {
            image.resize({ w: 1200 });
        }
        
        // Lower quality to 60 for better compression
        await image.write(filename, { quality: 60 });
        console.log(`Successfully optimized ${filename}`);
    } catch (e) {
        console.error(`Error optimizing ${filename}:`, e);
    }
}

async function run() {
    await optimizeImage("couples_bg.jpg");
    await optimizeImage("IMG-20260728-WA0118.jpg");
    await optimizeImage("IMG-20260728-WA0119.jpg");
}

run();
