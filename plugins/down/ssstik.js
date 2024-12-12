import ssstik from "../../api/down/ssstik.js";

export const cmd = {
  name: ["ssstik"],
  command: ["ssstik"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await ssstik(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI ssstik:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
