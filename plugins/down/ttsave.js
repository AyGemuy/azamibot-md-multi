import ttsave from "../../api/down/ttsave.js";

export const cmd = {
  name: ["ttsave"],
  command: ["ttsave"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ttsave(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ttsave:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
