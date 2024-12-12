import chats from "../../api/ai/chats.js";

export const cmd = {
  name: ["chats"],
  command: ["chats"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await chats(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI chats:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
