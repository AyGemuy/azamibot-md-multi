import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    conn.reply(m.chat, "_📡 Info Gempa Terkini Sedang Diproses..._", m);
    const apiUrl = API("wudysoft", "/api/info/gempa");
    const {
      data
    } = await axios.get(apiUrl);
    if (data.status === "success" && data.data) {
      const gempa = data.data;
      let teks = `🚨 *INFO GEMPA TERKINI*\n\n`;
      teks += `📅 *Tanggal:* ${gempa.tanggal}\n`;
      teks += `⏱️ *Waktu:* ${gempa.jam} WIB\n`;
      teks += `📍 *Lokasi:* ${gempa.wilayah}\n`;
      teks += `💥 *Magnitude:* \`\`${gempa.magnitude}\`\`\n`;
      teks += ` глубинный *Kedalaman:* \`\`${gempa.kedalaman}\`\`\n`;
      teks += `🗺️ *Koordinat:* ${gempa.coordinates}\n`;
      teks += `⚠️ *Potensi:* _${gempa.potensi}_`;
      if (gempa.dirasakan && gempa.dirasakan.length > 0) {
        teks += `\n🌊 *Dirasakan:* ${gempa.dirasakan}`;
      }
      teks += `\n\n🖼️ *Peta Guncangan Terlampir*`;
      const coordinatesArray = gempa.coordinates.split(",");
      const latitude = coordinatesArray[0];
      const longitude = coordinatesArray[1];
      const lokasi = {
        location: {
          degreesLatitude: parseFloat(latitude),
          degreesLongitude: parseFloat(longitude)
        }
      };
      await conn.sendMessage(m.chat, lokasi, {
        ephemeralExpiration: 86400
      });
      await conn.sendMessage(m.chat, {
        image: {
          url: gempa.shakemap
        },
        caption: teks
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, "_⚠️ Info Gempa Gagal Diperoleh._", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi Kesalahan Saat Memproses._", m);
  }
};
handler.help = ["infogempa", "gempa"];
handler.tags = ["info"];
handler.command = /^(infogempa|gempa)$/i;
export default handler;