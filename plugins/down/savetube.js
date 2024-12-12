import savetube from "../../api/down/savetube.js";

export const cmd = {
  name: ["savetube"],
  command: ["savetube"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await savetube(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI savetube:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
