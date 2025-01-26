import db from "../../lib/database.js";
let handler = async (m, {
  conn,
  usedPrefix
}) => {
  let user = db.data.users[m.sender];
  let gmbrt = "https://telegra.ph/file/295a6d5105771875e1797.jpg";
  let hsl = `*━━━━━ [ Kandang Buruan ] ━━━━━*

*🐂 = [ ${user.banteng} ] banteng*
*🐅 = [ ${user.harimau} ] harimau*
*🐘 = [ ${user.gajah} ] gajah*
*🐐 = [ ${user.kambing} ] kambing*
*🐼 = [ ${user.panda} ] panda*
*🐊 = [ ${user.buaya} ] buaya*
*🐃 = [ ${user.kerbau} ] kerbau*
*🐮 = [ ${user.sapi} ] sapi*
*🐒 = [ ${user.monyet} ] monyet*
*🐗 = [ ${user.babihutan} ] babihutan*
*🐖 = [ ${user.babi} ] babi*
*🐓 = [ ${user.ayam} ] ayam*

Gunakan *${usedPrefix}sell* untuk dijual atau *${usedPrefix}cook* untuk dijadikan bahan masakan.`;
  await conn.sendMsg(m.chat, {
    image: {
      url: gmbrt
    },
    caption: hsl
  }, {
    quoted: m
  }).catch(_ => m.reply(hsl));
};
handler.menufun = ["kandang"];
handler.tagsfun = ["rpg"];
handler.command = /^(kandang)$/i;
export default handler;