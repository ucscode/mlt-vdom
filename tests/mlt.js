import assert from 'node:assert';
import { test, describe } from 'node:test';
import { Mlt } from '../index.js';

describe('MLT VDOM Core Logic', () => {

    test('Hierarchy Validation: Should throw error when adding invalid child', () => {
        const playlist = new Mlt.Playlist();
        const tractor = new Mlt.Tractor();

        // Playlist only allows Entry or Property
        assert.throws(() => {
            playlist.add(tractor);
        }, /Hierarchy Error/);
    });

    test('Reference Syncing: Entry should sync producer ID', () => {
        const video = new Mlt.Producer({ id: 'vid_123' });
        const entry = new Mlt.Entry();

        entry.bind(video);

        assert.strictEqual(entry.getAttribute('producer'), 'vid_123');
        assert.strictEqual(entry.getBoundNode(), video); // Verify the object link
        assert.strictEqual(entry.getContents().length, 0); // Verify NO XML children were added
    });

    test('Reference Safety: Should throw if adding a second reference without removal', () => {
        const entry = new Mlt.Entry();
        const v1 = new Mlt.Producer({ id: 'v1' });
        const v2 = new Mlt.Producer({ id: 'v2' });

        entry.bind(v1);

        assert.throws(() => {
            entry.bind(v2);
        }, /bind Error/);
    });

    test('Reference Removal: Should clear attribute on remove', () => {
        const entry = new Mlt.Entry();
        const video = new Mlt.Producer({ id: 'v1' });

        entry.bind(video);
        entry.unbind(video);

        assert.strictEqual(entry.getAttribute('producer'), undefined);
        assert.strictEqual(entry.getContents().length, 0);
    });

    test('TextNode Normalization: Should wrap strings in Property automatically', () => {
        const prop = new Mlt.Property({ name: 'resource' }, 'clip.mp4');
        const contents = prop.getContents();

        assert.strictEqual(contents[0].constructor.name, 'TextNode');
        assert.strictEqual(contents[0].text, 'clip.mp4');
    });

    test('XML Generation: Should build valid MLT structure', () => {
        const mlt = new Mlt({ id: 'root' });
        const producer = new Mlt.Producer({ id: 'p1' });
        producer.add(new Mlt.Property({ name: 'res' }, 'file.mp4'));

        const entry = new Mlt.Entry();
        entry.bind(producer);

        const playlist = new Mlt.Playlist();
        playlist.add(entry);

        mlt.add(producer);
        mlt.add(playlist);

        const xml = mlt.build();

        // Verify XML Header
        assert.ok(xml.includes('<?xml version="1.0" encoding="utf-8"?>'));
        // Verify producer is defined
        assert.ok(xml.includes('<producer id="p1">'));
        // Verify entry references producer but does NOT contain it as a child
        assert.ok(xml.includes('<entry producer="p1"/>'));
        assert.ok(!xml.includes('<entry producer="p1"><producer'));
    });

    test('Indexing: Should return correct index of children', () => {
        const playlist = new Mlt.Playlist();
        const e1 = new Mlt.Entry();
        const e2 = new Mlt.Entry();

        playlist.add(e1);
        playlist.add(e2);

        assert.strictEqual(playlist.indexOf(e1), 0);
        assert.strictEqual(playlist.indexOf(e2), 1);
    });

});
