import askthee from "../../api/ai/askthee.js";

export const cmd = {
  name: ["askthee"],
  command: ["askthee"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await askthee(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI askthee:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};