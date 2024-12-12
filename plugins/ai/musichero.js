import musichero from "../../api/ai/musichero.js";

export const cmd = {
  name: ["musichero"],
  command: ["musichero"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await musichero(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI musichero:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
