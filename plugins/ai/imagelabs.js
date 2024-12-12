import imagelabs from "../../api/ai/imagelabs.js";

export const cmd = {
  name: ["imagelabs"],
  command: ["imagelabs"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await imagelabs(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI imagelabs:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
