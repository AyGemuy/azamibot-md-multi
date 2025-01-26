process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
process.on("uncaughtException", console.error);
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
  Telegraf
} from "telegraf";
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
say("Lightweight\nWhatsApp Bot", {
  font: "chrome",
  align: "center",
  gradient: ["red", "magenta"]
});
say(`'${name}' By @${author.name || author}`, {
  font: "console",
  align: "center",
  gradient: ["red", "magenta"]
});
say([process.argv[0], ...args].join(" "), {
  font: "console",
  align: "center",
  gradient: ["red", "magenta"]
});
const config = {
  tele_token: "00000:xxx-xxx",
  "-1002412850168": ["xxx@g.us", "zzz@s.whatsapp.net"]
};
const MAX_ATTEMPTS = 3;
const RETRY_DELAY = 5e3;
const startTBot = (attempts = 0) => {
  const bot = new Telegraf(config.tele_token);
  bot.start(ctx => ctx.reply("Welcome!"));
  bot.on("text", ctx => ctx.reply("You said: " + ctx.message.text));
  bot.on("channel_post", async ctx => {
    if (opts["nyimak"]) return !1;
    let msg = ctx?.update?.channel_post;
    if (!msg || !Object.keys(config).some(v => v == msg.chat.id)) return !1;
    try {
      let obj = Object.keys(msg).filter(v => /photo|video|voice|audio|document/.test(v));
      let jid = conn.user.jid.split("@")[0];
      let fconn = {
        key: {
          remoteJid: "0@s.whatsapp.net",
          fromMe: true,
          id: "BAE5AB0B84194996"
        },
        message: {
          contactMessage: {
            displayName: await conn.getName(conn.user.jid),
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;Azami Ai;;;\nTEL;type=CELL;type=VOICE;waid=${jid}:${jid}\nEND:VCARD`
          }
        },
        status: "PENDING",
        messageTimestamp: "1696595373"
      };
      let i = 0,
        arr = [],
        q = [],
        x = config[msg.chat.id],
        y = msg.media_group_id && !msg.caption,
        txt = msg.caption ? msg.caption : msg.text ? msg.text : "",
        tes = /\d\.\d\.\d(?=\s\(current\))/gi.test(txt);
      if (msg.entities) {
        for (let x of msg.entities.filter(v => /pre|bold|strikethrough/.test(v.type || ""))) q.push({
          type: x.type,
          txt: txt.slice(x.offset, x.offset + x.length)?.trim()
        });
        for (let x of q) {
          if (/pre/.test(x.type)) txt = txt.replace(x.txt, "```" + x.txt + "```");
          else if (/bold/.test(x.type)) txt = txt.replace(x.txt, `*${x.txt}*`);
          else txt = txt.replace(x.txt, `~${x.txt}~`);
        }
        msg.entities.filter(v => v.url).forEach(v => {
          arr.push(v);
        });
        txt = txt.replace(/\*+/g, "*").replace(/~+/g, "~");
      }
      if (msg.caption_entities) msg.caption_entities.filter(v => v.url).forEach(v => {
        arr.push(v);
      });
      arr = arr.filter(v => !v.url?.includes("t.me")).map(z => z.url);
      if (arr.length > 0 && !/\d\.\d\.\d(?=\s\(current\))/gi.test(txt)) txt += "\n\n*[embedded link] :*\n- " + arr.join("\n- ");
      if (msg.forward_origin) {
        if (!y) {
          let f = msg.forward_origin;
          let h = /hidden/.test(f.type);
          txt = `❰ *${h ? f.sender_user_name : f.chat ? f.chat.title : f.sender_user?.first_name || f.sender_chat?.title}* ❱\n` + `- *${h ? "hidden_user" : f.chat ? "@" + (f.chat.username || f.chat.type) : "@" + (f.sender_user?.username || f.sender_chat?.type || `hidden_${f.type}`)}` + `*${txt ? "\n\n" + txt : ""}`;
        } else txt = "";
      }
      let id = msg.photo ? msg.photo.pop().file_id : msg[obj[0]]?.file_id;
      do {
        if (obj.length > 0) {
          let url = await ctx.telegram.getFileLink(id);
          let fileName = msg.document?.file_name || url.pathname.split("/").pop();
          if (/voice|audio/.test(obj[0])) {
            let send = await conn.sendFile(x[i], url.href, fileName, "", fconn, /voice/.test(obj[0]) ? true : false, {}, true);
            if (msg[obj[0]]?.file_name) await conn.reply(x[i], txt ? txt + "\n\n" + msg[obj[0]]?.file_name : msg[obj[0]]?.file_name, send);
          } else await conn.sendFile(x[i], url.href, fileName, txt, y ? null : fconn, true, {
            mimetype: mime[fileName.split(".").pop()],
            ptv: msg.video_note ? true : false
          });
        } else if (msg.text) await conn.reply(x[i], txt, fconn);
        else console.log(msg);
        await delay(ranNumb(1500, 3e3));
        i += 1;
      } while (i > 0 && i < x.length);
    } catch (e) {
      console.log(e);
    }
  });
  bot.launch().then(() => {
    console.log("TeleBot started successfully");
  }).catch(err => {
    console.warn("TeleBot Failed to Launch:", err.message);
    handleReconnect(attempts);
  });
  bot.on("stopping", async () => {
    console.warn("TeleBot is stopping...");
    await bot.stop();
    handleReconnect(attempts);
  });
  bot.on("error", err => {
    console.warn("TeleBot encountered an error:", err.message);
    handleReconnect(attempts);
  });
};
const handleReconnect = attempts => {
  do {
    attempts++;
    console.log(`Reconnect attempt (${attempts}/${MAX_ATTEMPTS})...`);
    const waitForRetry = new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    waitForRetry.then(() => {
      if (attempts < MAX_ATTEMPTS) {
        startTBot(attempts);
      } else {
        console.log("Max attempts reached. Exiting Telebot...");
      }
    });
    return;
  } while (attempts < MAX_ATTEMPTS);
};
protoType();
serialize();
startTBot();
const conn = Object.defineProperty(Connection, "conn", {
  value: await Connection.conn,
  enumerable: true,
  configurable: true,
  writable: true
}).conn;
Object.assign(global, {
  ...Helper,
  timestamp: {
    start: Date.now()
  }
});
loadPluginFiles(pluginFolder, pluginFilter, {
  logger: conn.logger,
  recursiveRead: true
}).then(_ => console.log(Object.keys(plugins))).catch(console.error);
if (!opts["test"]) {
  setInterval(async () => {
    await Promise.allSettled([db.data ? db.write() : Promise.reject("db.data is null"), clearTmp(), clearSessions()]);
  }, 1e3 * 60 * 5);
}
if (opts["server"])(await import("./server.js")).default(conn, PORT);
async function _quickTest() {
  let test = await Promise.all([spawn("ffmpeg"), spawn("ffprobe"), spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]), spawn("convert"), spawn("magick"), spawn("gm"), spawn("find", ["--version"])].map(p => {
    return Promise.race([new Promise(resolve => {
      p.on("close", code => {
        resolve(code !== 127);
      });
    }), new Promise(resolve => {
      p.on("error", _ => resolve(false));
    })]);
  }));
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
  console.log(test);
  let s = global.support = {
    ffmpeg: ffmpeg,
    ffprobe: ffprobe,
    ffmpegWebp: ffmpegWebp,
    convert: convert,
    magick: magick,
    gm: gm,
    find: find
  };
  Object.freeze(global.support);
  if (!s.ffmpeg)(conn?.logger || console).warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
  if (s.ffmpeg && !s.ffmpegWebp)(conn?.logger || console).warn("Stickers may not animated without libwebp on ffmpeg (--enable-libwebp while compiling ffmpeg)");
  if (!s.convert && !s.magick && !s.gm)(conn?.logger || console).warn("Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)");
}
_quickTest().then(() => (conn?.logger?.info || console.log)("Quick Test Done")).catch(console.error);