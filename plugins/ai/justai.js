import justai from "../../api/ai/justai.js";

export const cmd = {
  name: ["justai"],
  command: ["justai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await justai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI justai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
