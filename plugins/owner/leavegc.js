import Connection from "../../lib/connection.js";
import {
  delay
} from "../../lib/func.js";
let handler = async (m, {
  conn,
  args,
  command
}) => {
  let chat = Object.keys(Connection.store.chats).filter(v => v.endsWith("g.us"));
  if (command.endsWith("all") || command.endsWith("semua")) {
    for (let id of chat) {
      await conn.groupLeave(id);
      await delay(2e3);
    }
    await m.reply("Berhasil!");
  } else if (args[0] || args.length > 5) {
    let ada = chat.find(bot => bot == args[0]);
    if (!ada) throw "id salah/bot tidak ada digrup itu";
    await conn.groupLeave(args[0]);
    await m.reply("Berhasil!");
  } else {
    if (!m.isGroup) return global.dfail("group", m, conn);
    await conn.groupLeave(m.chat);
  }
};
handler.menuowner = ["gc", "gcall", "group"].map(v => "leave" + v);
handler.tagsowner = ["ownerr"];
handler.command = /^(leaveg(c|ro?up)(all|semua)?)$/i;
handler.rowner = true;
export default handler;