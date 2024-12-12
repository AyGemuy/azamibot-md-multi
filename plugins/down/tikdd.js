import tikdd from "../../api/down/tikdd.js";

export const cmd = {
  name: ["tikdd"],
  command: ["tikdd"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await tikdd(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tikdd:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
