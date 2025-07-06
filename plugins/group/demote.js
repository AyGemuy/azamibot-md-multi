import db from "../../lib/database.js";
let handler = async (m, {
  conn
}) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid ? m.mentionedJid[0] : "";
  if (!who || who.includes(conn.user.jid) || m.sender == who) throw `*quote / @tag* salah satu !`;
  let ow = db.data.datas;
  let data = [...global.mods, ...ow.rowner.map(v => v[0]), ...ow.owner.map(v => v[0])].map(v => v + "@s.whatsapp.net");
  if (data.some(v => who.includes(v))) return m.reply(`Gaboleh gitu :v`);
  try {
    await conn.groupParticipantsUpdate(m.chat, [who], "demote");
    await conn.reply(m.chat, `@${m.sender.split`@`[0]} telah memberhentikan @${who.split`@`[0]} dari admin.`, fkontak, {
      mentions: [m.sender, who]
    });
  } catch (e) {
    console.log(e);
  }
};
handler.menugroup = ["demote @tag"];
handler.tagsgroup = ["group"];
handler.command = /^(demote)$/i;
handler.admin = true;
handler.botAdmin = true;
handler.group = true;
export default handler;