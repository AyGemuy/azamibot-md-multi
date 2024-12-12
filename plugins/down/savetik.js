import savetik from "../../api/down/savetik.js";

export const cmd = {
  name: ["savetik"],
  command: ["savetik"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await savetik(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI savetik:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
