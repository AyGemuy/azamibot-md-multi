import sunoprompt from "../../api/ai/suno-prompt.js";

export const cmd = {
  name: ["sunoprompt"],
  command: ["sunoprompt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await sunoprompt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI sunoprompt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
