import zeta from "../../api/ai/zeta.js";

export const cmd = {
  name: ["zeta"],
  command: ["zeta"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await zeta(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI zeta:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
