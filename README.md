# 🎬 MLT Virtual DOM (`mlt-vdom`)

A strictly-typed, **Namespace-driven Virtual DOM** for generating [MLT Framework](https://mltframework.org/) XML files.  
Designed for 2026 automation workflows, it ensures structural integrity through proactive hierarchy validation, automatic reference syncing, and professional formatting.

---

## 🚀 Installation

Install via npm:

```bash
npm install mlt-vdom
```

---

## 📖 Core Concepts

### 1. Unified Constructor Convention
Every element in the library follows a consistent constructor signature:
> `new Mlt.ElementName(attributes, content)`

* **`attributes`**: An object `{ key: 'value' }` representing XML attributes.
* **`content`**: Can be a `string`, a `number`, a single `MltNode`, or an `Array<MltNode>`.

### 2. Node Behaviors
To prevent "Broken XML," the library separates nodes into two distinct functional classes:

* **`ContainerNode` (Type 0):** Structural elements like `Producer`, `Playlist`, or `Tractor`. They use `.add()` to manage multiple children.
* **`ReferenceNode` (Type 1):** Pointer elements like `Entry` or `Track`. They use `.bind()` to point to a source and automatically sync the `producer` attribute.

---

## 💻 Usage Example

```javascript
import { Mlt } from 'mlt-vdom';

// 1. Create the root project
const mlt = new Mlt({ id: 'main_project' });

// 2. Define a Video Source (Producer)
const producer = new Mlt.Producer({ id: 'vid_01' }, [
    new Mlt.Property({ name: 'resource' }, 'clip.mp4'),
    new Mlt.Property({ name: 'mlt_service' }, 'avformat')
]);

// 3. Define the Timeline (Playlist)
const playlist = new Mlt.Playlist({ id: 'main_bin' });

// 4. Create an Entry (Links to the Producer)
const entry = new Mlt.Entry({ in: 0, out: 150 });
entry.bind(producer); // Correct semantic linking

// 5. Assemble the Tree
playlist.add(entry);
mlt.add(producer);
mlt.add(playlist);

// 6. Build the XML String
console.log(mlt.dump(true, 'optional/save/path/file.mlt'));
```

### 📝 Expected Output
Running the code above produces this perfectly formatted MLT XML:

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
Generates the final XML string. Called only on the root `Mlt` instance.
* `false` (default): Minified XML.
* `true`: Pretty-printed XML (2 spaces).
* `number`: Pretty-printed XML with N spaces.

### Methods by Node Type

| Method | Applicable To | Description |
| :--- | :--- | :--- |
| `.add(node)` | **Containers** | Adds a child to the internal stack. Throws if hierarchy is invalid. |
| `.remove(node)` | **Containers** | Removes a specific child node. |
| **`.bind(node)`** | **References** | Binds a Producer/Playlist. Auto-sets the `producer` ID. |
| **`.unbind()`** | **References** | Clears the binding and removes the `producer` attribute. |
| `.setAttribute(k, v)` | **All** | Manually sets an XML attribute. |
| `.getAttribute(k)` | **All** | Retrieves an attribute value. |

---

## 🛡️ Validation Logic

The library enforces the MLT schema at assignment time. If you try to add a node where it doesn't belong, it throws a `Hierarchy Error` immediately rather than generating invalid XML.

```javascript
const playlist = new Mlt.Playlist();
const tractor = new Mlt.Tractor();

playlist.add(tractor); 
// ❌ Error: Hierarchy Error: <tractor> is not a valid child for <playlist>
```

---

## ⚖️ License
MIT
