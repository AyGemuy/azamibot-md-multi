import gizai from "../../api/ai/gizai.js";

export const cmd = {
  name: ["gizai"],
  command: ["gizai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await gizai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI gizai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
