import bingchat from "../../api/ai/bingchat.js";

export const cmd = {
  name: ["bingchat"],
  command: ["bingchat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await bingchat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI bingchat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
