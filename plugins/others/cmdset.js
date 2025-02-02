import db from "../../lib/database.js";
let handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  db.data.sticker = db.data.sticker || {};
  if (!m.quoted) throw `Balas stiker dengan perintah *${usedPrefix + command}*`;
  if (!m.quoted.fileSha256) throw "SHA256 Hash Missing";
  if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`;
  let sticker = db.data.sticker;
  let hash = m.quoted.fileSha256.toString("base64");
  if (sticker[hash] && sticker[hash].locked) throw "Kamu tidak memiliki izin untuk mengubah perintah stiker ini";
  sticker[hash] = {
    text: text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: false
  };
  m.reply(`Berhasil!`);
};
handler.menuowner = ["cmdset"];
handler.tagsowner = ["owner"];
handler.command = /^((set|add)cmd|cmd(set|add))$/i;
handler.owner = true;
export default handler;