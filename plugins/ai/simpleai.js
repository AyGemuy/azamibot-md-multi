import simpleai from "../../api/ai/simpleai.js";

export const cmd = {
  name: ["simpleai"],
  command: ["simpleai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await simpleai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI simpleai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
