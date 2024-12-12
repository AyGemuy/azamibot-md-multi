import muslimai from "../../api/ai/muslimai.js";

export const cmd = {
  name: ["muslimai"],
  command: ["muslimai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await muslimai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI muslimai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
