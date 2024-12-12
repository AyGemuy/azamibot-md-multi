import refineprompt from "../../api/ai/refine-prompt.js";

export const cmd = {
  name: ["refineprompt"],
  command: ["refineprompt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await refineprompt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI refineprompt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
