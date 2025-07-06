import {
  createReadStream,
  promises,
  ReadStream
} from "fs";
import {
  join
} from "path";
import {
  spawn
} from "child_process";
import {
  Readable
} from "stream";
import Helper from "./helper.js";
const __dirname = Helper.__dirname(import.meta.url);

function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      const tmp = join(__dirname, `../tmp/${Date.now()}.${ext}`);
      const out = `${tmp}.${ext2}`;
      const isStream = Helper.isReadableStream(buffer);
      if (isStream) await Helper.saveStreamToFile(buffer, tmp);
      else await promises.writeFile(tmp, buffer);
      spawn("ffmpeg", ["-y", "-i", tmp, ...args, out]).once("error", reject).once("close", async code => {
        try {
          await promises.unlink(tmp);
          if (code !== 0) return reject(code);
          const data = createReadStream(out);
          resolve({
            data: data,
            filename: out,
            async toBuffer() {
              const buffers = [];
              for await (const chunk of data) buffers.push(chunk);
              return Buffer.concat(buffers);
            },
            async clear() {
              data.destroy();
              await promises.unlink(out);
            }
          });
        } catch (e) {
          reject(e);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

function toAudio(buffer, ext) {
  return ffmpeg(buffer, ["-vn", "-c:a", "libopus", "-b:a", "128k", "-ar", "48000", "-f", "ogg"], ext, "ogg");
}

function toVideo(buffer, ext) {
  return ffmpeg(buffer, ["-c:v", "libx264", "-c:a", "aac", "-ab", "128k", "-ar", "44100", "-crf", "32", "-preset", "slow"], ext, "mp4");
}
export {
  toAudio,
  toVideo,
  ffmpeg
};