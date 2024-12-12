import solyptube from "../../api/down/solyptube.js";

export const cmd = {
  name: ["solyptube"],
  command: ["solyptube"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await solyptube(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI solyptube:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
