import isouchat from "../../api/ai/isouchat.js";

export const cmd = {
  name: ["isouchat"],
  command: ["isouchat"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await isouchat(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI isouchat:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
