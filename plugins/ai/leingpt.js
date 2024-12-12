import leingpt from "../../api/ai/leingpt.js";

export const cmd = {
  name: ["leingpt"],
  command: ["leingpt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await leingpt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI leingpt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
