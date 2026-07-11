const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname);

const idToLocal = {
  '1503177119275-0aa32b3a9368': 'images/pyramids-aerial.jpg',
  '1539768942893-daf53e448371': 'images/about-pyramids.jpg',
  '1568605114967-8130f3a36994': 'images/pkg-cairo.jpg',
  '1528360983277-13d401cdc186': 'images/pkg-nile-cruise.jpg',
  '1572252009286-268acec5ca0a': 'images/pkg-alexandria.jpg',
  '1583437934698-9db09e68ffca': 'images/pkg-ultimate.jpg',
  '1544551763-46a013bb70d5':    'images/pkg-hurghada.jpg',
  '1553409313-90b51ee8e0b4':    'images/nile-felucca.jpg',
  '1601432764174-7c7d0c4c03e4': 'images/gallery-aswan.jpg',
  '1509316785289-025f5b846b35': 'images/gallery-valley.jpg',
};

function replaceUrls(content, cssMode) {
  for (const [id, local] of Object.entries(idToLocal)) {
    // Escape special regex chars in the ID
    const escaped = id.replace(/[-]/g, '\\-');
    const re = new RegExp('https://images\\.unsplash\\.com/photo-' + escaped + '[^\'")]*', 'g');
    const replacement = cssMode ? ('../' + local) : local;
    content = content.replace(re, replacement);
  }
  return content;
}

// Update index.html
let html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
html = replaceUrls(html, false);
fs.writeFileSync(path.join(baseDir, 'index.html'), html);
console.log('index.html updated');

// Update css/style.css
let css = fs.readFileSync(path.join(baseDir, 'css/style.css'), 'utf8');
css = replaceUrls(css, true);
fs.writeFileSync(path.join(baseDir, 'css/style.css'), css);
console.log('style.css updated');

// Verify
const remaining = (html + css).match(/images\.unsplash\.com\/photo-[^'"]+/g) || [];
console.log('Remaining Unsplash CDN URLs:', remaining.length);
if (remaining.length) remaining.slice(0, 5).forEach(r => console.log(' ', r.substring(0, 80)));
