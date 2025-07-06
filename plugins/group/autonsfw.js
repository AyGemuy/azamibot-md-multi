import db from "../../lib/database.js";
let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (!text) return m.reply(usedPrefix + command + " <timer>");
  let chat = db.data.chats[m.chat];
  const now = new Date();
  if (command.includes("start")) {
    if (!nsfwstart(text)) return m.reply("Range *start* yang diizinkan:\n\n- " + eveningTimes.join("\n- "));
    chat.autonsfwstart = text;
  } else {
    if (!nsfwend(text)) return m.reply("Range *end* yang diizinkan:\n\n- " + morningTimes.join("\n- "));
    chat.autonsfwend = text;
  }
  await m.reply(`*${command}*` + " telah diset pada *" + text + ` (GMT+${-now.getTimezoneOffset() / 60})*`);
};
handler.menugroup = ["start", "end"].map(v => "autonsfw" + v + " <timer>");
handler.tagsgroup = ["group"];
handler.command = /^(autonsfw(start|end))$/i;
handler.admin = true;
handler.botAdmin = true;
handler.group = true;
export default handler;
const eveningTimes = ["21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00"];
const morningTimes = ["01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00"];

function nsfwstart(str) {
  return eveningTimes.includes(str);
}

function nsfwend(str) {
  return morningTimes.includes(str);
}