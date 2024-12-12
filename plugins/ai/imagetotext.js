import imagetotext from "../../api/ai/imagetotext.js";

export const cmd = {
  name: ["imagetotext"],
  command: ["imagetotext"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await imagetotext(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI imagetotext:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
