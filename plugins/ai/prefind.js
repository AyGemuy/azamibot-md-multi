import prefind from "../../api/ai/prefind.js";

export const cmd = {
  name: ["prefind"],
  command: ["prefind"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await prefind(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI prefind:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
