// Decompress every page content stream and dump the drawn text per page.
import fs from "node:fs";
import zlib from "node:zlib";

function dump(file) {
  const buf = fs.readFileSync(file);
  const s = buf.toString("latin1");
  const pages = [];
  const re = /stream\r?\n/g;
  let m;
  while ((m = re.exec(s))) {
    const dictStart = s.lastIndexOf("<<", m.index);
    const dict = s.slice(dictStart, m.index);
    const start = m.index + m[0].length;
    const end = s.indexOf("endstream", start);
    if (end < 0) continue;
    if (!/FlateDecode/.test(dict)) continue;
    let inf;
    try {
      inf = zlib.inflateSync(buf.subarray(start, end)).toString("latin1");
    } catch {
      continue;
    }
    if (!/\bBT\b[\s\S]*\bET\b/.test(inf)) continue;
    const texts = [
      ...inf.matchAll(/<([0-9A-Fa-f]+)>\s*Tj|\(((?:[^()\\]|\\.)*)\)\s*Tj/g),
    ].map((x) => (x[1] ? Buffer.from(x[1], "hex").toString("latin1") : x[2]));
    pages.push({ items: texts.length, text: texts.join(" | ") });
  }
  return pages;
}

for (const f of process.argv.slice(2)) {
  const pages = dump(f);
  console.log("\n===== " + f + " (" + pages.length + " text streams) =====");
  pages.forEach((p, i) => {
    console.log(`--- page ${i + 1}: ${p.items} text runs`);
    console.log(p.text.slice(0, 1400));
  });
}
