import aiproxy from "../../api/ai/aiproxy.js";

export const cmd = {
  name: ["aiproxy"],
  command: ["aiproxy"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aiproxy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aiproxy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
