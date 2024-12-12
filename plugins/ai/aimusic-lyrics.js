import aimusiclyrics from "../../api/ai/aimusic-lyrics.js";

export const cmd = {
  name: ["aimusiclyrics"],
  command: ["aimusiclyrics"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aimusiclyrics(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aimusiclyrics:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
