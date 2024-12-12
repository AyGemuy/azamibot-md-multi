import * as zcode from "../../api/ai/zcode.js";

const { zcodequest, zcodegen, zcodebug, zcoderef, zcoderev, zcodedoc } = zcode;

export const cmd = {
  name: ["mikasa"],
  command: [
    "zcodequest",
    "zcodegen",
    "zcodebug",
    "zcoderef",
    "zcoderev",
    "zcodedoc",
  ],
  category: ["ai"],
  async start({ m, text, command }) {
    if (!text) return m.reply("Silakan masukkan teks untuk diproses.");

    try {
      let output;
      switch (command) {
        case "zcodequest":
          output = await zcodequest(text);
          break;
        case "zcodegen":
          output = await zcodegen(text);
          break;
        case "zcodebug":
          output = await zcodebug(text);
          break;
        case "zcoderef":
          output = await zcoderef(text);
          break;
        case "zcoderev":
          output = await zcoderev(text);
          break;
        case "zcodedoc":
          output = await zcodedoc(text);
          break;
        default:
          return m.reply("Perintah tidak dikenali.");
      }
      return m.reply(output);
    } catch (error) {
      console.error(`Error pada AI ${command}:`, error);
      return m.reply(
        "Terjadi kesalahan saat memproses permintaan. Silakan coba lagi.",
      );
    }
  },
};
