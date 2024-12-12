import cody from "../../api/ai/cody.js";

export const cmd = {
  name: ["cody"],
  command: ["cody"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await cody(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI cody:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
