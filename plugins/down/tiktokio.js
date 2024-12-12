import tiktokio from "../../api/down/tiktokio.js";

export const cmd = {
  name: ["tiktokio"],
  command: ["tiktokio"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await tiktokio(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tiktokio:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
