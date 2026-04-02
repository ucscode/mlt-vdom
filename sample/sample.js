import fs from 'node:fs';
import path from 'node:path';
import { Mlt } from '../index.js';

const outputDir = path.join(process.cwd(), 'sample');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
const outputFile = path.join(outputDir, 'output.mlt');

console.log('🚀 Generating Rich MLT Project...');

// 1. Root & Global Profile
const mlt = new Mlt({ id: 'main_project', title: 'Rich Export 2026' });
const profile = new Mlt.Profile({
    description: 'HD 1080p 29.97fps',
    width: 1920,
    height: 1080,
    progressive: 1,
    sample_aspect_num: 1,
    sample_aspect_den: 1,
    display_aspect_num: 16,
    display_aspect_den: 9,
    frame_rate_num: 30000,
    frame_rate_den: 1001
});

// 2. Define Producers (Sources)
const video01 = new Mlt.Producer({ id: 'vid_01' })
    .add(new Mlt.Property({ name: 'resource' }, 'forest_4k.mp4'))
    .add(new Mlt.Property({ name: 'mlt_service' }, 'avformat'));

const audio01 = new Mlt.Producer({ id: 'bg_music' })
    .add(new Mlt.Property({ name: 'resource' }, 'ambient_track.wav'))
    .add(new Mlt.Property({ name: 'mlt_service' }, 'avformat'));

// 3. Playlists (Bin Management)
const videoBin = new Mlt.Playlist({ id: 'video_bin' });
const musicBin = new Mlt.Playlist({ id: 'music_bin' });

// Create an entry with a localized filter (Fade In)
const videoEntry = new Mlt.Entry({ in: '0', out: '300' }).bind(video01);
const fadeIn = new Mlt.Filter({ id: 'fade_01' })
    .add(new Mlt.Property({ name: 'mlt_service' }, 'brightness'))
    .add(new Mlt.Property({ name: 'level' }, '0'))
    .add(new Mlt.Property({ name: 'alpha' }, '0=0; 30=1'));

videoEntry.add(fadeIn); // Entry acts as a container for its own effects
videoBin.add(videoEntry);

// Create audio entry
const audioEntry = new Mlt.Entry({ in: '50', out: '350' }).bind(audio01);
musicBin.add(audioEntry);

// 4. The Timeline (Tractor & Multitrack)
const timeline = new Mlt.Tractor({ id: 'main_timeline' });
const multitrack = new Mlt.Multitrack();

// Background Track (Audio)
const track1 = new Mlt.Track().bind(musicBin);
// Foreground Track (Video)
const track2 = new Mlt.Track().bind(videoBin);

multitrack.add(track1).add(track2);
timeline.add(multitrack);

// 5. Transitions (Cross-track logic)
// A simple "composite" transition so we can see both tracks
const compositor = new Mlt.Transition({ id: 'mixer' })
    .add(new Mlt.Property({ name: 'mlt_service' }, 'composite'))
    .add(new Mlt.Property({ name: 'a_track' }, '0')) // Index of music track
    .add(new Mlt.Property({ name: 'b_track' }, '1')); // Index of video track

timeline.add(compositor);

// 6. Assemble everything into the root
mlt.add(profile)
   .add(video01)
   .add(audio01)
   .add(videoBin)
   .add(musicBin)
   .add(timeline);

// 7. Output
const xmlString = mlt.build(true);

try {
    fs.writeFileSync(outputFile, xmlString, 'utf8');
    console.log(`✅ Success! Rich MLT generated at: ${outputFile}`);
} catch (err) {
    console.error('❌ Failed:', err);
}
