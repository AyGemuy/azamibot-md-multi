import * as aifaceswap from "../../api/ai/aifaceswap.js";

export const cmd = {
  name: ["aifaceswap"],
  command: ["aifaceswap"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const [a, b] = text.split(" ");
      const output = await aifaceswap.generateFaces(a, b);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI aifaceswap:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
