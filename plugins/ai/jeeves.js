import jeeves from "../../api/ai/jeeves.js";

export const cmd = {
  name: ["jeeves"],
  command: ["jeeves"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await jeeves(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI jeeves:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
