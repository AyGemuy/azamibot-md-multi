import artgen from "../../api/ai/art-gen.js";

export const cmd = {
  name: ["artgen"],
  command: ["artgen"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await artgen(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI artgen:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
