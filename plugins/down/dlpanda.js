import dlpanda from "../../api/down/dlpanda.js";

export const cmd = {
  name: ["dlpanda"],
  command: ["dlpanda"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await dlpanda(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI dlpanda:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
