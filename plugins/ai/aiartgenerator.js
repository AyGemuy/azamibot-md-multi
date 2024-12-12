import aiartgenerator from "../../api/ai/aiartgenerator.js";

export const cmd = {
  name: ["aiartgenerator"],
  command: ["aiartgenerator"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aiartgenerator(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aiartgenerator:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
