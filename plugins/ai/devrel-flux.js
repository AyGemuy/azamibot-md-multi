import devrelflux from "../../api/ai/devrel-flux.js";

export const cmd = {
  name: ["devrelflux"],
  command: ["devrelflux"],
  category: ["ai"],
  async start({ m, text }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      const output = await devrelflux(text);
      return m.reply(output);
    } catch (error) {
      console.error("Error pada AI devrelflux:", error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
