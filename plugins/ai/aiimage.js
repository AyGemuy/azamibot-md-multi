import aiimage from "../../api/ai/aiimage.js";

export const cmd = {
  name: ["aiimage"],
  command: ["aiimage"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aiimage(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aiimage:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
