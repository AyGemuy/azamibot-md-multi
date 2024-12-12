import jarak from "../../api/tools/jarak.js";

export const cmd = {
  name: ["jarak"],
  command: ["jarak"],
  category: ["tools"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const [a, b] = text.split("|");
      const output = await jarak(a, b);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI jarak:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
