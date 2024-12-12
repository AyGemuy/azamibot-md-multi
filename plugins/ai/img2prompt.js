import * as img2prompt from "../../api/ai/img2prompt.js";

export const cmd = {
  name: ["img2prompt"],
  command: ["img2prompt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await img2prompt.imagetoprompt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI img2prompt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
