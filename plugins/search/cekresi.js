import axios from "axios";
let handler = async (m, {
  conn,
  usedPrefix,
  text
}) => {
  if (!text) {
    return conn.reply(m.chat, `Penggunaan: ${usedPrefix}cekresi <resi> <ekspedisi>\n\nContoh: ${usedPrefix}cekresi JX3708794672 JNT`, m);
  }
  const [resi, expedisi] = text.split(" ");
  if (!resi) {
    return conn.reply(m.chat, "Mohon masukkan nomor resi.", m);
  }
  if (!expedisi) {
    return conn.reply(m.chat, "Mohon masukkan nama ekspedisi.", m);
  }
  conn.reply(m.chat, "Sedang memproses...", m);
  try {
    const apiUrl = API("wudysoft", "/api/tools/cek-resi/v1", {
      action: "check",
      resi: resi,
      expedisi: expedisi.toLowerCase()
    });
    if (!apiUrl) {
      return conn.reply(m.chat, "Gagal mendapatkan URL API.", m);
    }
    const {
      data
    } = await axios.get(apiUrl);
    if (data.noResi) {
      let hasil = `*HASIL CEK RESI*\n\nNomor Resi: ${data.noResi}\nTanggal Pengiriman: ${data.tanggalPengiriman === "N/A" ? "-" : data.tanggalPengiriman}\nPenerima: ${data.penerima === "N/A" ? "-" : data.penerima}\nStatus: ${data.status}\nPosisi Terakhir: ${data.lastPosition}\n\n*Riwayat Perjalanan:*\n`;
      if (data.history && Array.isArray(data.history)) {
        data.history.forEach(item => {
          hasil += `${item.date}: ${item.description}\n`;
        });
      } else {
        hasil += "Tidak ada riwayat perjalanan.\n";
      }
      conn.reply(m.chat, hasil, m);
    } else {
      conn.reply(m.chat, "Maaf, resi tidak ditemukan atau terjadi kesalahan.", m);
    }
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, "Maaf, terjadi kesalahan saat memproses permintaan.", m);
  }
};
handler.help = ["cekresi <resi> <ekspedisi>"];
handler.tags = ["search"];
handler.command = /^(cekresi)$/i;
handler.limit = true;
export default handler;