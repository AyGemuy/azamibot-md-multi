import spotify from "../../api/down/spotify.js";

export const cmd = {
  name: ["spotify"],
  command: ["spotify"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await spotify(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI spotify:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
