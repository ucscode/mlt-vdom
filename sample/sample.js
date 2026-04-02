import fs from 'node:fs';
import path from 'node:path';
import { Mlt } from '../index.js';

// 1. Ensure a directory exists to hold the output
const outputDir = path.join(process.cwd(), 'sample');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const outputFile = path.join(outputDir, 'output.mlt');

console.log('🚀 Generating MLT Project...');

// 2. Create the Root MLT container
const mlt = new Mlt({ id: 'main_project', title: 'Automated Export 2026' });

// 3. Define a Producer (The Source)
const videoSource = new Mlt.Producer({ id: 'producer_0' });

videoSource.add(new Mlt.Property({ name: 'resource' }, 'sample_video.mp4'));
videoSource.add(new Mlt.Property({ name: 'mlt_service' }, 'avformat'));

// 4. Define a Playlist with an Entry
const playlist = new Mlt.Playlist({ id: 'main_bin' });
const entry = new Mlt.Entry({ in: '0', out: '250' });

// This triggers the automatic producer="producer_0" attribute sync
entry.link(videoSource);
playlist.add(entry);

// 5. Build a Tractor/Multitrack (The Timeline Structure)
const tractor = new Mlt.Tractor({ id: 'timeline_1' });
const multitrack = new Mlt.Multitrack();
const track = new Mlt.Track();

// Link the track to the playlist
track.link(playlist);
multitrack.add(track);
tractor.add(multitrack);

// 6. Assemble the final VDOM tree
mlt.add(videoSource);
mlt.add(playlist);
mlt.add(tractor);

// 7. Render to XML String
const xmlString = mlt.build(true);

// 8. Write to disk
try {
    fs.writeFileSync(outputFile, xmlString, 'utf8');
    console.log(`✅ Success! File generated at: ${outputFile}`);
    console.log('--- File Preview ---');
    console.log(xmlString.substring(0, 300) + '...');
} catch (err) {
    console.error('❌ Failed to write file:', err);
}
