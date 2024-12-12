import chatboxai from "../../api/ai/chatboxai.js";

export const cmd = {
  name: ["chatboxai"],
  command: ["chatboxai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await chatboxai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI chatboxai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
