import fs from "fs";
import ttf2woff2 from 'ttf2woff2';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontPath = path.join(__dirname, "../static/fonts");
fs.readdirSync(fontPath).forEach(file => {
    if (file.endsWith('.otf')) {
        const res = ttf2woff2(fs.readFileSync(path.join(fontPath, file)));
        console.log(res);
        fs.writeFileSync(path.join(fontPath, file.replace('.otf', '.woff2')), res);
    }
})

console.log('ok');