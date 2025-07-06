import db from "../../lib/database.js";
import {
  ranNumb
} from "../../lib/func.js";
const cooldown = 72e5;
let handler = async (m, {
  conn,
  text
}) => {
  let who = m.mentionedJid[0];
  if (!who || m.sender == who) return m.reply("Tag salah satu yang kamu ingin ajak berdagang");
  if (typeof db.data.users[who] == "undefined") return m.reply("Pengguna tidak ada didalam data base");
  let user = db.data.users[m.sender];
  let user2 = db.data.users[who];
  if (new Date() - user.lastdagang <= cooldown) return m.reply(`Kamu Sudah Berdagang , tunggu 🕖 *${(user.lastdagang + cooldown - new Date()).toTimeString()}* lagi . . .`);
  if (1e4 > user.money) return m.reply("Modal Diperlukan !!\nAnda tidak memiliki 💵 10000 Money");
  if (new Date() - user2.lastdagang <= cooldown) return m.reply(`Teman anda sedang berdagang , cari partner lain atau tunggu 🕖 *${(user2.lastdagang + cooldown - new Date()).toTimeString()}* lagi . . .`);
  if (1e4 > user2.money) return m.reply("Modal Diperlukan !!\nRekanmu tidak memiliki 💵 10000 Money");
  let dapat;
  user.money -= 1e4;
  user2.money -= 1e4;
  user.lastdagang = new Date() * 1;
  user2.lastdagang = new Date() * 1;
  conn.reply(m.chat, `Mohon bersabar..\nKamu dan ${conn.getName(who)} sedang berdagang.. 😅\n\nModal masing - masing = 💵 10000`, m);
  setTimeout(() => {
    dapat = ranNumb(7e3, 12e3);
    user.money += dapat;
    user2.money += dapat;
    conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m);
  }, 18e5);
  setTimeout(() => {
    dapat = ranNumb(7e3, 12e3);
    user.money += dapat;
    user2.money += dapat;
    conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m);
  }, 36e5);
  setTimeout(() => {
    dapat = ranNumb(7e3, 12e3);
    user.money += dapat;
    user2.money += dapat;
    conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m);
  }, 54e5);
  setTimeout(() => {
    dapat = ranNumb(7e3, 12e3);
    user.money += dapat;
    user2.money += dapat;
    conn.reply(m.chat, `[ Penghasilan Dagang ]\n\n💵 +${dapat} untukmu dan ${conn.getName(who)}`, m);
  }, 72e6);
};
handler.help = ["berdagang"];
handler.tags = ["rpg"];
handler.command = /^((ber)?dagang)$/i;
handler.cooldown = cooldown;
handler.group = true;
handler.limit = true;
export default handler;