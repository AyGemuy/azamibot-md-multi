import crushchat from "../../api/ai/crushchat.js";

export const cmd = {
  name: ["crushchat"],
  command: ["crushchat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await crushchat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI crushchat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
