import bagoodex from "../../api/ai/bagoodex.js";

export const cmd = {
  name: ["bagoodex"],
  command: ["bagoodex"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await bagoodex(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI bagoodex:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
