import lens from "../../api/tools/lens.js";

export const cmd = {
  name: ["lens"],
  command: ["lens"],
  category: ["tools"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await lens(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI lens:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
