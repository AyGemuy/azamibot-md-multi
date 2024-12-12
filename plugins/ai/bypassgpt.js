import bypassgpt from "../../api/ai/bypassgpt.js";

export const cmd = {
  name: ["bypassgpt"],
  command: ["bypassgpt"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await bypassgpt(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI bypassgpt:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
