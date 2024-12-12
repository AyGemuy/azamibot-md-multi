import pallyy from "../../api/ai/pallyy.js";

export const cmd = {
  name: ["pallyy"],
  command: ["pallyy"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await pallyy(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI pallyy:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
