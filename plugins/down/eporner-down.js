import epornerdown from "../../api/down/eporner-down.js";

export const cmd = {
  name: ["epornerdown"],
  command: ["epornerdown"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await epornerdown(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI epornerdown:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
