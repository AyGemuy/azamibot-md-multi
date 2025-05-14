import db from "../../lib/database.js";
import {
  ranNumb
} from "../../lib/func.js";
import fs from "fs";
const cooldown = 864e6;
let handler = async (m, {
  conn,
  usedPrefix
}) => {
  try {
    let user = db.data.users[m.sender];
    let timers = cooldown - (new Date() - user.lastbansos);
    let aku = Math.ceil(Math.random() * 101);
    let kamu = Math.floor(Math.random() * 76);
    let kbansos = "https://telegra.ph/file/afcf9a7f4e713591080b5.jpg";
    let mbansos = "https://telegra.ph/file/d31fcc46b09ce7bf236a7.jpg";
    if (new Date() - user.lastbansos <= cooldown) return m.reply(`Kamu sudah Melakukan Korupsi Bansos 💰\nCooldown *🕐${timers.toTimeString()}*`);
    if (user.atm < 2e6) return m.reply(`[ ! ] Minimal memiliki tabungan *💵 2000000*`);
    if (aku > kamu) {
      await conn.sendMsg(m.chat, {
        image: {
          url: kbansos
        },
        caption: `Kamu Tertangkap Setelah Kamu korupsi dana bansos🕴️💰\nMembayar denda *💵 3000000*`
      }, {
        quoted: m
      });
      user.money -= 3e6;
    } else if (aku < kamu) {
      let p = ranNumb(15e5, 245e4);
      user.money += p;
      await conn.sendMsg(m.chat, {
        image: {
          url: mbansos
        },
        caption: `Kamu berhasil  korupsi dana bansos🕴️💰\nMendapatkan *💵 ${p}*`
      }, {
        quoted: m
      });
    } else {
      m.reply(`Tidak berhasil korupsi, namun berhasil *kabur keluar negeri 🏃*`);
    }
    user.lastbansos = new Date() * 1;
  } catch (e) {
    console.log(e);
    m.reply(e);
  }
};
handler.help = ["bansos"];
handler.tags = ["rpg"];
handler.command = /^(bansos|korupsi)$/i;
export default handler;