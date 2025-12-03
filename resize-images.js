const sharp = require('sharp');
const path = require('path');

async function resizeImages() {
  const publicDir = path.join(__dirname, 'public');
  
  try {
    // Resize dark mode map
    console.log('Resizing world_dark.png...');
    await sharp(path.join(publicDir, 'world_dark.png'), { limitInputPixels: false })
      .resize(2880, null, { fit: 'inside' })
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'world_dark_web.png'));
    console.log('✓ world_dark_web.png created');

    // Resize light mode map
    console.log('Resizing world_light.png...');
    await sharp(path.join(publicDir, 'world_light.png'), { limitInputPixels: false })
      .resize(2880, null, { fit: 'inside' })
      .png({ quality: 90 })
      .toFile(path.join(publicDir, 'world_light_web.png'));
    console.log('✓ world_light_web.png created');

    console.log('\nDone! Use world_dark_web.png and world_light_web.png in your code.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

resizeImages();
