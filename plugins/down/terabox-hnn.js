import teraboxhnn from "../../api/down/terabox-hnn.js";

export const cmd = {
  name: ["teraboxhnn"],
  command: ["teraboxhnn"],
  category: ["down"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await teraboxhnn(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI teraboxhnn:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
