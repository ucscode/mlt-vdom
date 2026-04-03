import { MltParser } from '../src/libs/parser.js';
import { getMltRegistry } from '../src/libs/registry.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// This points to /home/ucscode/Projects/mlt-vdom/sample/shotcut.mlt
const filePath = path.join(__dirname, 'xml/shotcut.mlt');
const dumpPath = path.join(__dirname, 'xml/dump.mlt');

const parser = new MltParser(getMltRegistry());
const nodes = await parser.parseFromFile(filePath);
console.log(nodes);
const string = await nodes[0].dump(true, dumpPath)
