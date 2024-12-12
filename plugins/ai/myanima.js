import myanima from "../../api/ai/myanima.js";

export const cmd = {
  name: ["myanima"],
  command: ["myanima"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await myanima(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI myanima:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
