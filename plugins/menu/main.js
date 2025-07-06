import db from "../../lib/database.js";
import {
  plugins
} from "../../lib/plugins.js";
import {
  readMore,
  ranNumb,
  padLead,
  runtimes
} from "../../lib/func.js";
import {
  xpRange
} from "../../lib/levelling.js";
import {
  getDevice
} from "@whiskeysockets/baileys";
import fs from "fs";
import {
  join
} from "path";
import os from "os";
let tags = {
  ai: "🧠 *AI*",
  anime: "🎬 *Anime*",
  apps: "📱 *Apps*",
  auth: "🔑 *Auth*",
  canvas: "🎨 *Canvas*",
  download: "⬇️ *Download*",
  film: "🍿 *Film*",
  fun: "😂 *Fun*",
  game: "🎮 *Game*",
  general: "🌐 *General*",
  gpt: "🤖 *GPT*",
  info: "ℹ️ *Info*",
  islami: "🕌 *Islami*",
  maker: "🛠️ *Maker*",
  mails: "📧 *Mails*",
  misc: "⚙️ *Misc*",
  news: "📰 *News*",
  nsfw: "🔞 *NSFW*",
  other: "📂 *Other*",
  posts: "📝 *Posts*",
  quotes: "📜 *Quotes*",
  random: "🎲 *Random*",
  search: "🔍 *Search*",
  sound: "🎶 *Sound*",
  stalker: "🕵️ *Stalker*",
  sticker: "🖼️ *Sticker*",
  tools: "✏️ *Tools*",
  "top-up": "💰 *Top-Up*",
  user: "👤 *User*",
  visitor: "👣 *Visitor*",
  creator: "👨‍💻 *Creator*",
  entertainment: "🎭 *Hiburan*",
  genshin: "⚔️ *Genshin*",
  group: "👥 *Group*",
  menu: "☰ *Menu*",
  others: "📂 *Lainnya*",
  owner: "👑 *Owner*",
  rpg: "🧙 *RPG*"
};
const defaultMenu = {
  before: `
╔═ *「 %me 」* ═╗
║ 🧑‍💻 Owner: *.owner*
║ ℹ️ Info: *.info*
║ ✨ Level: *.levelup*
╚═══════════

⏱️ Aktif: *%uptime*
⚙️ OS: *%osuptime*

👤 *PROFIL*
├ Nama: %name!
├ Role: *%role*
╰ Limit: %limit %readmore`.trimStart(),
  header: "「 *%category* 」",
  body: " • %cmd %islimit %isPremium",
  footer: "\n"
};
let handler = async (m, {
  conn,
  usedPrefix: _p,
  __dirname,
  command,
  isPrems
}) => {
  try {
    const imagePath = global.dynamics.getRandom() + command.toUpperCase();
    let {
      limit,
      role,
      level,
      exp,
      maxexp,
      money,
      totalexp
    } = db.data.users[m.sender];
    let {
      min,
      xp,
      max
    } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender).replaceAll("\n", "");
    let uptime = runtimes(process.uptime());
    let osuptime = runtimes(os.uptime());
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: "customPrefix" in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled
      };
    });
    for (let plugin of help)
      if (plugin && "tags" in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tags[tag];
    conn.menu = conn.menu ? conn.menu : {};
    let before = conn.menu.before || defaultMenu.before;
    let header = conn.menu.header || defaultMenu.header;
    let body = conn.menu.body || defaultMenu.body;
    let footer = conn.menu.footer || defaultMenu.footer;
    let _text = [before.replace(": *%limit", `${isPrems ? ": *∞" : ": *%limit"}`), ...Object.keys(tags).map(tag => {
      return header.replace(/%category/g, tags[tag]) + "\n" + [...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
        return menu.help.map(help => {
          return body.replace(/%cmd/g, menu.prefix ? help : _p + help).replace(/%islimit/g, menu.limit ? "(Limit)" : "").replace(/%isPremium/g, menu.premium ? "(Premium)" : "").trim();
        }).join("\n");
      }), footer].join("\n");
    })].join("\n");
    let text = typeof conn.menu == "string" ? conn.menu : typeof conn.menu == "object" ? _text : "";
    let replace = {
      "%": "%",
      p: _p,
      uptime: uptime,
      osuptime: osuptime,
      me: conn.getName(conn.user.jid),
      limit: limit,
      name: name,
      role: role,
      readmore: readMore
    };
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"), (_, name) => "" + replace[name]);
    await conn.sendFThumb(m.chat, db.data.datas.maingroupname, text.trim(), imagePath, db.data.datas.linkgc, m);
  } catch (e) {
    console.error("Terjadi kesalahan saat membuat atau mengirim menu:", e);
    await m.reply("Maaf, terjadi kesalahan saat menampilkan menu.");
  }
};
handler.command = /^((all)?m(enu)?|help|\?)$/i;
handler.exp = 3;
export default handler;