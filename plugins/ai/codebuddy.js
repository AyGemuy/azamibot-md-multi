import codebuddy from "../../api/ai/codebuddy.js";

export const cmd = {
  name: ["codebuddy"],
  command: ["codebuddy"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await codebuddy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI codebuddy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
