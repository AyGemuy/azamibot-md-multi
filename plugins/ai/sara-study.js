import sarastudy from "../../api/ai/sara-study.js";

export const cmd = {
  name: ["sarastudy"],
  command: ["sarastudy"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await sarastudy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI sarastudy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
