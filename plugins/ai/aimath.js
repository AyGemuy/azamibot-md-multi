import aimath from "../../api/ai/aimath.js";

export const cmd = {
  name: ["aimath"],
  command: ["aimath"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await aimath(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aimath:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
