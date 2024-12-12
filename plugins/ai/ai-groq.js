import * as aigroq from "../../api/ai/ai-groq.js";

const { groq: Groq, gemini: Gemini } = aigroq;

export const cmd = {
  name: ["mikasa"],
  command: ["groq", "gemini"],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "groq":
          output = await Groq(text);
          break;
        case "gemini":
          output = await Gemini(text);
          break;
        default:
          return m.reply("Perintah tidak dikenali.");
      }
      return m.reply(output);
    } catch (error) {
      console.error(`Error pada AI ${command}:`, error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
