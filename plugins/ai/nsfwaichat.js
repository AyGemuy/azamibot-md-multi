import nsfwaichat from "../../api/ai/nsfwaichat.js";

export const cmd = {
  name: ["nsfwaichat"],
  command: ["nsfwaichat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await nsfwaichat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI nsfwaichat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
