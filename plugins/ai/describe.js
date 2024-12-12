import describe from "../../api/ai/describe.js";

export const cmd = {
  name: ["describe"],
  command: ["describe"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await describe(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI describe:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
