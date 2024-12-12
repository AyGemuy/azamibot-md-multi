import xdash from "../../api/ai/xdash.js";

export const cmd = {
  name: ["xdash"],
  command: ["xdash"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await xdash(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI xdash:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
