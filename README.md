# 🎬 MLT Virtual DOM (mlt-vdom)

A strictly-typed, **Namespace-driven Virtual DOM** for generating [MLT Framework](https://mltframework.org/) XML files.  
Designed for 2026 automation workflows, it ensures structural integrity through proactive hierarchy validation, automatic reference syncing, and professional pretty-printing.

---

## 🚀 Features

* **Namespace Singleton:** All components (`Producer`, `Playlist`, etc.) are scoped under the `Mlt` class to prevent global namespace pollution.
* **Smart References:** `Entry` and `Track` nodes automatically sync their `producer` attribute to the ID of the linked object.
* **Professional Output:** Integrated with `xml-formatter` for human-readable XML that protects sensitive media paths.
* **Zero-Footprint Base:** `TextNode` and `ElementNode` both extend a lightweight `MltNode` base for consistent system-wide `instanceof` checks.

---

## 🛠️ Setup

This package is currently in development and **not yet published to npm**. To use it locally:

1. **Clone the project** into your workspace.
2. **Install dependencies**:
   ```bash
   npm install mlt-vdom
   ```
3. **Import from source**:
   ```javascript
   import { Mlt } from 'mlt-vdom';
   ```

---

## 📖 Core Concepts

### Unified Constructor Convention
Every element in the library follows a consistent constructor signature:
> `new Mlt.ElementName(attributes, content)`

* **`attributes`**: An object `{ key: 'value' }` representing XML attributes.
* **`content`**: Can be a `string`, a `number`, a single `MltNode`, or an `Array<MltNode>`.

### Element Types
1.  **Type 0 (ELEMENT):** Standard parent-child nodes (e.g., `Mlt`, `Producer`, `Playlist`). They can hold multiple children allowed by their schema.
2.  **Type 1 (REFERENCE):** Pointer nodes (e.g., `Entry`, `Track`). They represent a link to another node via a `producer` attribute. To ensure data integrity, they strictly allow **one** reference at a time.

---

## 💻 Usage Example

```javascript
import { Mlt } from 'mlt-vdom';

// 1. Create the root project
const mlt = new Mlt({ id: 'main_project' });

// 2. Define a Video Source (Producer)

// Using the convention: (attributes, content)
const producer = new Mlt.Producer({ id: 'vid_01' }, [
    new Mlt.Property({ name: 'resource' }, 'clip.mp4'),
    new Mlt.Property({ name: 'mlt_service' }, 'avformat')
]);

// or decoupled logic

const producer = new Mlt.Producer({ id: 'vid_01' })

producer.add(new Mlt.Property({ name: 'resource' }, 'clip.mp4'))
producer.add(new Mlt.Property({ name: 'mlt_service' }, 'avformat'))

// 3. Define the Timeline (Playlist)
const playlist = new Mlt.Playlist({ id: 'main_bin' });

// 4. Create an Entry (Links to the Producer)
const entry = new Mlt.Entry({ in: 0, out: 150 });

entry.link(producer); // Automatically sets entry attribute producer="vid_01"
entry.unlink(producer)

playlist.add(entry);

// 5. Assemble and Build
mlt.add(producer);
mlt.add(playlist);

// Build with 2-space indentation
const xml = mlt.build(true); 
console.log(xml);
```

### 📝 Build Result
```xml
<?xml version="1.0" encoding="utf-8"?>
<mlt LC_NUMERIC="C" version="7.37.0" xmlns="http://www.mltframework.org/bin/view/MLT/" id="main_project">
  <producer id="vid_01">
    <property name="resource">clip.mp4</property>
    <property name="mlt_service">avformat</property>
  </producer>
  <playlist id="main_bin">
    <entry in="0" out="150" producer="vid_01"/>
  </playlist>
</mlt>
```

---

## 🏗️ API Reference

### `Mlt.build(indent)`
Generates the final XML string.
* `false` (default): Minified XML.
* `true`: Pretty-printed XML (2 spaces).
* `number`: Pretty-printed XML with N spaces.

### `MltNode` Methods (Common to all Elements)

| Method | Description |
| :--- | :--- |
| `setAttribute(k, v)` | Sets an XML attribute. |
| `getAttribute(k)` | Retrieves an attribute value. |
| `add(node)` | Validates and adds a child. Throws `Hierarchy Error` if invalid. |
| `remove(node)` | Removes a child and cleans up reference attributes. |
| `getContents()` | Returns a shallow copy of the internal content array. |

---

## ⚖️ License
MIT
