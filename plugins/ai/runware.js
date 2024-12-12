import runware from "../../api/ai/runware.js";

export const cmd = {
  name: ["runware"],
  command: ["runware"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await runware(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI runware:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
