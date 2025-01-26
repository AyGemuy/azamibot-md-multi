import db from "../../lib/database.js";
let handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  let p = db.data.datas.tekssewa;
  if (!p) throw `[ ! ] Belum di set oleh owner.\n\nCommand *${usedPrefix}settekssewa* untuk menambahkan teks ${command}`;
  await conn.relayMessage(m.chat, {
    requestPaymentMessage: {
      currencyCodeIso4217: "IDR",
      amount1000: (command.includes("prem") ? 1e4 : 15e3) * 1e3,
      requestFrom: "0@s.whatsapp.net",
      noteMessage: {
        extendedTextMessage: {
          text: p,
          contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
              showAdAttribution: true
            }
          }
        }
      }
    }
  }, {});
};
handler.menugroup = ["premium", "sewabot"];
handler.tagsgroup = ["group"];
handler.command = /^(sewa(bot)?|prem(ium)?)$/i;
export default handler;