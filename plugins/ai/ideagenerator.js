import ideagenerator from "../../api/ai/ideagenerator.js";

export const cmd = {
  name: ["ideagenerator"],
  command: ["ideagenerator"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ideagenerator(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ideagenerator:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
