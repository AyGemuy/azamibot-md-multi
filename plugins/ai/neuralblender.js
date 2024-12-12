import neuralblender from "../../api/ai/neuralblender.js";

export const cmd = {
  name: ["neuralblender"],
  command: ["neuralblender"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await neuralblender(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI neuralblender:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
