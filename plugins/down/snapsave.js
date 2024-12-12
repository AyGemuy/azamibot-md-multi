import snapsave from "../../api/down/snapsave.js";

export const cmd = {
  name: ["snapsave"],
  command: ["snapsave"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await snapsave(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI snapsave:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
