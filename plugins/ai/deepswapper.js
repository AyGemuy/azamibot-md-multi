import * as deepswapper from "../../api/ai/deepswapper.js";

export const cmd = {
  name: ["deepswapper"],
  command: ["deepswapper"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const [a, b] = text.split(" ");
      const output = await deepswapper.swapimage(a, b);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI deepswapper:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
