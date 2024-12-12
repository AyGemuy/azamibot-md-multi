import styletext from "../../api/tools/styletext.js";

export const cmd = {
  name: ["styletext"],
  command: ["styletext"],
  category: ["tools"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await styletext(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI styletext:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
