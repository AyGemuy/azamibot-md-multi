import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";
import { randomBytes, randomUUID } from "crypto";
class Blackbox {
  constructor() {
    (this.userId = randomUUID()),
      (this.chatId = randomBytes(16).toString("hex"));
  }
  async image(imageBuffer, input) {
    imageBuffer = await (await fetch(imageBuffer)).arrayBuffer();
    try {
      const { ext, mime } = (await fileTypeFromBuffer(imageBuffer)) || {};
      if (!ext || !mime) return null;
      const form = new FormData(),
        blob = new Blob([imageBuffer], {
          type: mime,
        });
      form.append("image", blob, "image." + ext),
        form.append("fileName", "image." + ext),
        form.append("userId", this.userId);
      const response = await fetch("https://www.blackbox.ai/api/upload", {
          method: "POST",
          body: form,
        }),
        messages = [
          {
            role: "user",
            content: (await response.json()).response + "\n#\n" + input,
          },
        ];
      return await this.chat(messages, "Realtime", !0, !1, !1, !1);
    } catch (error) {
      throw (console.error("Error:", error), error);
    }
  }
}
const blkbx = new Blackbox();

const blackbox = async (imageBuffer, input) => {
  return await blkbx.image(imageBuffer, input);
};

export default blackbox;
