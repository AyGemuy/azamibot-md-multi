import teachanything from "../../api/ai/teach-anything.js";

export const cmd = {
  name: ["teachanything"],
  command: ["teachanything"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await teachanything(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI teachanything:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
