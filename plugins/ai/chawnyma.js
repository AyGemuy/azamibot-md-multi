import chawnyma from "../../api/ai/chawnyma.js";

export const cmd = {
  name: ["chawnyma"],
  command: ["chawnyma"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await chawnyma(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI chawnyma:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
