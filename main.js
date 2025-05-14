process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
process.on("uncaughtException", err => console.error("Terjadi error yang tidak tertangkap:", err));
import "./config.js";
import cfonts from "cfonts";
import Connection from "./lib/connection.js";
import Helper from "./lib/helper.js";
import db from "./lib/database.js";
import clearTmp from "./lib/clearTmp.js";
import clearSessions from "./lib/clearSessions.js";
import {
  createRequire
} from "module";
import {
  fileURLToPath
} from "url";
import {
  join,
  dirname
} from "path";
import {
  spawn
} from "child_process";
import {
  delay,
  mime,
  ranNumb
} from "./lib/func.js";
import {
  protoType,
  serialize
} from "./lib/simple.js";
import {
  plugins,
  loadPluginFiles,
  reload,
  pluginFolder,
  pluginFilter
} from "./lib/plugins.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const args = [join(__dirname, "main.js"), ...process.argv.slice(2)];
const PORT = process.env.PORT || process.env.SERVER_PORT || 8443;
const {
  say
} = cfonts;
const {
  name,
  author
} = require(join(__dirname, "./package.json"));
try {
  say("Lightweight\nWhatsApp Bot", {
    font: "chrome",
    align: "center",
    gradient: ["red", "magenta"]
  });
} catch (error) {
  console.error("Gagal menampilkan CFonts 'Lightweight WhatsApp Bot':", error);
}
try {
  say(`'${name}' By @${author.name || author}`, {
    font: "console",
    align: "center",
    gradient: ["red", "magenta"]
  });
} catch (error) {
  console.error(`Gagal menampilkan CFonts '${name}':`, error);
}
try {
  say([process.argv[0], ...args].join(" "), {
    font: "console",
    align: "center",
    gradient: ["red", "magenta"]
  });
} catch (error) {
  console.error("Gagal menampilkan CFonts untuk argumen command line:", error);
}
try {
  protoType();
} catch (error) {
  console.error("Gagal menjalankan fungsi protoType():", error);
}
try {
  serialize();
} catch (error) {
  console.error("Gagal menjalankan fungsi serialize():", error);
}
let conn;
try {
  conn = Object.defineProperty(Connection, "conn", {
    value: await Connection.conn,
    enumerable: true,
    configurable: true,
    writable: true
  }).conn;
} catch (error) {
  console.error("Gagal membuat koneksi WhatsApp:", error);
  conn = null;
}
try {
  Object.assign(global, {
    ...Helper,
    timestamp: {
      start: Date.now()
    }
  });
} catch (error) {
  console.error("Gagal mengassign objek global:", error);
}
try {
  await loadPluginFiles(pluginFolder, pluginFilter, {
    logger: conn?.logger || console,
    recursiveRead: true
  }).then(_ => console.log("Plugin yang dimuat:", Object.keys(plugins))).catch(console.error);
} catch (error) {
  console.error("Gagal memuat plugin:", error);
}
if (!opts["test"]) {
  setInterval(async () => {
    try {
      const results = await Promise.allSettled([db.data ? db.write() : Promise.reject("db.data is null"), clearTmp(), clearSessions()]);
      results.forEach((result, index) => {
        if (result.status === "rejected") {
          const task = ["penulisan database", "pembersihan temporary", "pembersihan sesi"][index];
          console.error(`Gagal dalam tugas ${task}:`, result.reason);
        } else {
          const task = ["penulisan database", "pembersihan temporary", "pembersihan sesi"][index];
          console.log(`Tugas ${task} berhasil.`);
        }
      });
    } catch (error) {
      console.error("Terjadi error dalam interval pembersihan:", error);
    }
  }, 1e3 * 60 * 5);
  console.log("Interval pembersihan (5 menit) diaktifkan.");
}
if (opts["server"]) {
  try {
    await (await import("./server.js")).default(conn, PORT);
    console.log(`Server diaktifkan pada port ${PORT}.`);
  } catch (error) {
    console.error("Gagal mengaktifkan server:", error);
  }
}
async function _quickTest() {
  try {
    const test = await Promise.all([spawn("ffmpeg"), spawn("ffprobe"), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]), spawn("convert"), spawn("magick"), spawn("gm"), spawn("find", ["--version"])].map(p => {
      return Promise.race([new Promise(resolve => {
        p.on("close", code => {
          resolve(code !== 127);
        });
      }), new Promise(resolve => {
        p.on("error", _ => resolve(false));
      })]);
    }));
    const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    console.log("Hasil Quick Test:", test);
    const s = global.support = {
      ffmpeg: ffmpeg,
      ffprobe: ffprobe,
      ffmpegWebp: ffmpegWebp,
      convert: convert,
      magick: magick,
      gm: gm,
      find: find
    };
    Object.freeze(global.support);
    console.log("Status dukungan fitur:", global.support);
    if (!s.ffmpeg)(conn?.logger || console).warn("Peringatan: ffmpeg tidak terinstal. Fitur pengiriman video mungkin tidak berfungsi.");
    if (s.ffmpeg && !s.ffmpegWebp)(conn?.logger || console).warn("Peringatan: libwebp tidak diaktifkan pada ffmpeg. Stiker animasi mungkin tidak berfungsi.");
    if (!s.convert && !s.magick && !s.gm)(conn?.logger || console).warn("Peringatan: ImageMagick tidak terinstal. Pembuatan stiker mungkin tidak berfungsi jika libwebp pada ffmpeg tidak diinstal.");
    console.log("Quick Test selesai.");
  } catch (error) {
    console.error("Terjadi error selama Quick Test:", error);
  }
}
_quickTest().then(() => (conn?.logger?.info || console.log)("Semua pengujian cepat selesai.")).catch(console.error);