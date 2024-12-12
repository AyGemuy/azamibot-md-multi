import moshiai from "../../api/ai/moshiai.js";

export const cmd = {
  name: ["moshiai"],
  command: ["moshiai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await moshiai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI moshiai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
