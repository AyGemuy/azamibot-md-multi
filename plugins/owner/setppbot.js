import * as jimp_1 from "jimp";
import {
  S_WHATSAPP_NET
} from "@whiskeysockets/baileys";
let handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    try {
      let media = await q.download();
      let {
        img
      } = await pepe(media);
      await conn.query({
        tag: "iq",
        attrs: {
          target: undefined,
          to: S_WHATSAPP_NET,
          type: "set",
          xmlns: "w:profile:picture"
        },
        content: [{
          tag: "picture",
          attrs: {
            type: "image"
          },
          content: img
        }]
      });
      m.reply(`Sukses mengganti PP Bot`);
    } catch (e) {
      console.log(e);
      m.reply(`Terjadi kesalahan, coba lagi nanti.`);
    }
  } else {
    m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
  }
};
handler.menuowner = ["setppbot"];
handler.tagsowner = ["owner"];
handler.command = /^(set(botpp|ppbot)(2|panjang|full?)?)$/i;
handler.rowner = true;
export default handler;
async function pepe(media) {
  const jimp = await jimp_1.read(media);
  const min = jimp.getWidth();
  const max = jimp.getHeight();
  const cropped = jimp.crop(0, 0, min, max);
  return {
    img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
    preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
  };
}