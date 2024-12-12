import studyxai from "../../api/ai/studyxai.js";

export const cmd = {
  name: ["studyxai"],
  command: ["studyxai"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await studyxai(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI studyxai:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
