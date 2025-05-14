import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  command,
  text
}) => {
  let city = text;
  if (!city) {
    return conn.reply(m.chat, `Ketik nama kota untuk melihat cuaca.\nContoh: ${usedPrefix}${command} Bandung`, m);
  }
  try {
    conn.reply(m.chat, "_🌤️ Memeriksa Cuaca..._", m);
    const apiUrl = API("wudysoft", "/api/info/cuaca/v2", {
      kota: city
    });
    const {
      data
    } = await axios.get(apiUrl);
    if (data.result) {
      const cuaca = data.result;
      const lokasi = cuaca.location;
      const current = cuaca.current;
      const condition = current.condition;
      let teks = `☀️ *INFORMASI CUACA*\n\n`;
      teks += `📍 *Lokasi:* ${lokasi.name}, ${lokasi.region}, ${lokasi.country}\n`;
      teks += `⏱️ *Waktu Lokal:* ${lokasi.localtime}\n\n`;
      teks += `🌡️ *Suhu:* ${current.temp_c}°C (${current.temp_f}°F)\n`;
      teks += `Terasa Seperti: ${current.feelslike_c}°C (${current.feelslike_f}°F)\n`;
      teks += `💧 *Kelembaban:* ${current.humidity}%\n`;
      teks += `💨 *Angin:* ${current.wind_kph} km/jam (${current.wind_mph} mph) ${current.wind_dir}\n`;
      teks += `Tekanan: ${current.pressure_mb} mb (${current.pressure_in} in)\n`;
      teks += `🌧️ *Curah Hujan:* ${current.precip_mm} mm (${current.precip_in} in)\n`;
      teks += `☁️ *Awan:* ${current.cloud}%\n`;
      teks += `👁️ *Visibilitas:* ${current.vis_km} km (${current.vis_miles} miles)\n\n`;
      teks += `Kondisi: ${condition.text}\n`;
      teks += `🖼️ *Gambar Kondisi:* ${condition.iconUrl}`;
      await conn.sendMessage(m.chat, {
        image: {
          url: condition.iconUrl
        },
        caption: teks
      }, {
        quoted: m
      });
    } else {
      conn.reply(m.chat, `_⚠️ Kota "${city}" tidak ditemukan atau data cuaca tidak tersedia._`, m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "_❌ Terjadi kesalahan saat memproses informasi cuaca._", m);
  }
};
handler.help = ["cuaca <kota>", "infocuaca <kota>"];
handler.tags = ["info"];
handler.command = /^(cuaca|infocuaca)$/i;
export default handler;