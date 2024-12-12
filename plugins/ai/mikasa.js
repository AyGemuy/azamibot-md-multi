import mikasa from "../../api/ai/mikasa.js";

export const cmd = {
  name: ["mikasa"],
  command: ["mikasa"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await mikasa(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI mikasa:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
