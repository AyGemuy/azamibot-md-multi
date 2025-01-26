import db from "../../lib/database.js";
let handler = async (m, {
  conn
}) => {
  conn.reply(m.chat, `
*DAFTAR HASH*
\`\`\`
${Object.entries(db.data.sticker).map(([ key, value ], index) => `${index + 1}. ${value.locked ? `(Terkunci) ${key}` : key} : ${value.text}`).join("\n")}
\`\`\`
`.trim(), null, {
    mentions: Object.values(db.data.sticker).map(x => x.mentionedJid).reduce((a, b) => [...a, ...b], [])
  });
};
handler.menuowner = ["cmdlist"];
handler.tagsowner = ["owner"];
handler.command = /^(listcmd|cmdlist)$/i;
export default handler;