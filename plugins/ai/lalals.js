import lalals from "../../api/ai/lalals.js";

export const cmd = {
  name: ["lalals"],
  command: ["lalals"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await lalals(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI lalals:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
