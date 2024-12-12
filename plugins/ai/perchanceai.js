import perchanceai from "../../api/ai/perchanceai.js";

export const cmd = {
  name: ["perchanceai"],
  command: ["perchanceai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await perchanceai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI perchanceai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
