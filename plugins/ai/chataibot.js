import chataibot from "../../api/ai/chataibot.js";

export const cmd = {
  name: ["chataibot"],
  command: ["chataibot"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await chataibot(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI chataibot:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
