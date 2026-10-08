import { mkdir, writeFile } from "node:fs/promises";

// Original synthesized preview audio. No commercial recordings or client claims.
const samples = [
  ["wedding", 18, 96, [60, 64, 67, 72]],
  ["dance", 16, 120, [57, 60, 64, 67]],
  ["remix", 16, 128, [48, 55, 60, 63]],
  ["film", 20, 72, [57, 60, 64, 71]],
  ["advertisement", 14, 112, [60, 64, 67, 69]],
  ["youtube", 18, 84, [62, 65, 69, 72]],
  ["launch", 16, 108, [48, 55, 60, 67]],
];
const directory = new URL("../public/samples/", import.meta.url);
await mkdir(directory, { recursive: true });
for (const [name, seconds, bpm, notes] of samples) {
  const rate = 22050;
  const frames = seconds * rate;
  const buffer = Buffer.alloc(44 + frames * 2);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(frames * 2, 40);
  const beat = 60 / bpm;
  for (let frame = 0; frame < frames; frame++) {
    const time = frame / rate;
    const step = Math.floor(time / (beat / 2));
    const local = time % (beat / 2);
    const note = notes[(step + Math.floor(step / 8)) % notes.length];
    const frequency = 440 * 2 ** ((note - 69) / 12);
    const envelope = Math.min(1, local * 80) * Math.exp(-local * 7);
    const melody =
      (Math.sin(2 * Math.PI * frequency * time) +
        0.25 * Math.sin(4 * Math.PI * frequency * time)) *
      envelope *
      0.15;
    const pad =
      notes
        .slice(0, 3)
        .reduce(
          (sum, n) =>
            sum + Math.sin(2 * Math.PI * 440 * 2 ** ((n - 81) / 12) * time),
          0,
        ) * 0.025;
    const kickTime = time % beat;
    const kick =
      Math.sin(
        2 * Math.PI * (48 * kickTime + 7 * (1 - Math.exp(-kickTime * 25))),
      ) *
      Math.exp(-kickTime * 17) *
      (name === "film" || name === "youtube" ? 0.035 : 0.14);
    const fade = Math.min(1, time / 0.4, (seconds - time) / 1.4);
    const sample = Math.max(-1, Math.min(1, (melody + pad + kick) * fade));
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + frame * 2);
  }
  await writeFile(new URL(`${name}.wav`, directory), buffer);
}
console.log("Generated seven clearly labelled demonstration clips.");
