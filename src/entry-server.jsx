import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import App from "./App";

export function render(url) {
  // Wait for lazy route modules so every built page contains its full content.
  return new Promise((resolve, reject) => {
    const chunks = [];
    const output = new Writable({
      write(chunk, encoding, done) {
        chunks.push(chunk);
        done();
      },
    });
    output.on("finish", () => resolve(Buffer.concat(chunks).toString("utf8")));
    output.on("error", reject);
    const stream = renderToPipeableStream(
      <StaticRouter location={url}>
        <App />
      </StaticRouter>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError(error) {
          reject(error);
        },
      },
    );
  });
}
