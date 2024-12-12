import talkai from "../../api/ai/ai-talkai.js";

export const cmd = {
  name: ["talkai"],
  command: ["talkai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await talkai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI talkai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
