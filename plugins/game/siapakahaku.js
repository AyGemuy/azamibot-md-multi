import db from "../../lib/database.js";
let timeout = 12e4;
let poin = 3499;
let handler = async (m, {
  conn,
  usedPrefix,
  isPrems
}) => {
  conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {};
  let id = m.chat;
  if (id in conn.siapakahaku) {
    conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.siapakahaku[id][0]);
    throw false;
  }
  let json, usr = db.data.users[m.sender];
  if (usr.limit < 1 && usr.money > 5e4 && !isPrems) throw `Beli limit dulu lah, duid lu banyak kan 😏`;
  else if (usr.limit > 0 && !isPrems) usr.limit -= 1;
  try {
    json = await (await fetch("https://raw.githubusercontent.com/BochilTeam/database/master/games/siapakahaku.json")).json();
  } catch (e) {
    console.log(e);
    return m.reply(e.message);
  }
  json = json.getRandom();
  let caption = `
🎮 *Siapakah Aku* 🎮

${json.soal}

⭔ Timeout *${(timeout / 1e3).toFixed(2)} detik*
⭔ Bonus: ${poin} Money
`.trim();
  conn.siapakahaku[id] = [await conn.reply(m.chat, caption, m), json, poin, setTimeout(() => {
    if (conn.siapakahaku[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.siapakahaku[id][0]);
    delete conn.siapakahaku[id];
  }, timeout)];
  console.log(json.jawaban);
};
handler.help = ["siapakahaku (money+)"];
handler.tags = ["game"];
handler.command = /^(siapa(kah)?aku)$/i;
handler.premium = true;
handler.game = true;
export default handler;