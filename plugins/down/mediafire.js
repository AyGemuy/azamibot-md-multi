import mediafire from "../../api/down/mediafire.js";

export const cmd = {
  name: ["mediafire"],
  command: ["mediafire"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await mediafire(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI mediafire:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
