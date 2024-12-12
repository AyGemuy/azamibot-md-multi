import artbot from "../../api/ai/artbot.js";

export const cmd = {
  name: ["artbot"],
  command: ["artbot"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await artbot(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI artbot:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
