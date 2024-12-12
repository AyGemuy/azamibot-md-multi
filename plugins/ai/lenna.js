import lenna from "../../api/ai/lenna.js";

export const cmd = {
  name: ["lenna"],
  command: ["lenna"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await lenna(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI lenna:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
