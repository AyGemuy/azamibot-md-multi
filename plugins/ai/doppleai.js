import doppleai from "../../api/ai/doppleai.js";

export const cmd = {
  name: ["doppleai"],
  command: ["doppleai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await doppleai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI doppleai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
