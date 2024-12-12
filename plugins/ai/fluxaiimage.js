import fluxaiimage from "../../api/ai/fluxaiimage.js";

export const cmd = {
  name: ["fluxaiimage"],
  command: ["fluxaiimage"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await fluxaiimage(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI fluxaiimage:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
