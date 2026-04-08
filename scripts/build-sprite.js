import SVGSpriter from "svg-sprite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spriter = new SVGSpriter({
    mode: {
        symbol: true,
    }
});

const iconsDir = path.join(__dirname, '../assets/icons');
fs.readdirSync(iconsDir).forEach(file => {
    if (file.endsWith('.svg')) {
        const filePath = path.join(iconsDir, file);
        spriter.add(
            filePath,
            file,
            fs.readFileSync(filePath, 'utf-8')
        );
    }
});

spriter.compile((error, result) => {
    if (error) throw error;
    fs.writeFileSync('static/sprite.svg', result.symbol.sprite.contents);
});

console.log('ok');