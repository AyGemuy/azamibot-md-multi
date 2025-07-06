let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command,
  participants
}) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  text = text ? text : m.quoted?.text ? m.quoted.text : m.quoted?.caption ? m.quoted.caption : m.quoted?.description ? m.quoted.description : "";
  if (!text) throw `Example : ${usedPrefix + command} ayo mabar`;
  text = text.trim();
  if (text.includes("\n")) text = text.replace("\n", `\n@${m.chat}\n`);
  else text = text + `\n@${m.chat}`;
  let cox = {
    contextInfo: {
      mentionedJid: participants.map(a => a.id),
      groupMentions: [{
        groupJid: m.chat,
        groupSubject: "everyone"
      }]
    }
  };
  await conn.sendMessage(m.chat, /video|image/g.test(mime) && !/webp/g.test(mime) ? {
    [/video/g.test(mime) ? "video" : "image"]: await q.download(),
    caption: text,
    contextInfo: cox.contextInfo
  } : {
    text: text,
    contextInfo: cox.contextInfo
  }, {
    quoted: fkontak
  });
};
handler.menugroup = ["hidetag"].map(v => v + " <teks>");
handler.tagsgroup = ["group"];
handler.command = /^(pengumuman|announce|hidd?en?tag)$/i;
handler.admin = true;
handler.botAdmin = true;
handler.group = true;
export default handler;