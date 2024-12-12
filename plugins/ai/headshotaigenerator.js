import headshotaigenerator from "../../api/ai/headshotaigenerator.js";

export const cmd = {
  name: ["headshotaigenerator"],
  command: ["headshotaigenerator"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await headshotaigenerator(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI headshotaigenerator:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
