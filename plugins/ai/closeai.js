import closeai from "../../api/ai/closeai.js";

export const cmd = {
  name: ["closeai"],
  command: ["closeai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await closeai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI closeai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
