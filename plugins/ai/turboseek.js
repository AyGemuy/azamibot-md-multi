import turboseek from "../../api/ai/turboseek.js";

export const cmd = {
  name: ["turboseek"],
  command: ["turboseek"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await turboseek(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI turboseek:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
