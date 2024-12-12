import tomp3dl from "../../api/down/tomp3dl.js";

export const cmd = {
  name: ["tomp3dl"],
  command: ["tomp3dl"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await tomp3dl(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI tomp3dl:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
