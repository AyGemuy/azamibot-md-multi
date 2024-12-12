import fetch from "node-fetch";
import { v4 as uuidv4 } from "uuid";
import chalk from "chalk";
class FiggsAi {
  constructor() {
    this.defaultBotId = "40928189-7178-4612-bf93-da7b16b833b9";
    this.defaultChatId = "92462488-522d-4a5a-ab10-54cc0bb2c503";
    this.defaultRoomId = "c6244f06-6f06-4527-8ee6-97d8a750bff4";
    this.defaultDescription = "Amazonian Warrior";
    this.defaultName = "Wonder Woman";
    this.defaultFirstMessage =
      "*From a distance, you see a bright light and before you know it, Wonder Woman, also known as Diana, lands in your vicinity, geared up in her armor and ready for battle.*";
  }
  async create(prompt, options = {}) {
    const {
      botId = this.defaultBotId,
      roomId = this.defaultRoomId,
      chatId = this.defaultChatId,
      firstMessage = this.defaultFirstMessage,
      name = this.defaultName,
      description = this.defaultDescription,
    } = options;
    const messages = [
      {
        id: chatId,
        content: firstMessage,
        role: "assistant",
        created: new Date().toISOString(),
      },
      {
        id: chatId,
        content: prompt,
        role: "user",
        created: new Date().toISOString(),
      },
    ];
    try {
      const response = await fetch("https://api.figgs.ai/chat_completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
          Referer: `https://www.figgs.ai/chat/${roomId}`,
        },
        body: JSON.stringify({
          messages: messages,
          firstMessage: firstMessage,
          description: description,
          name: name,
          botId: botId,
          roomId: roomId,
        }),
      });
      const text = await response.text();
      return (
        text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => {
            try {
              const json = JSON.parse(line.slice(5));
              return json.finalContent;
            } catch {
              return "";
            }
          })
          .filter((content) => content !== "")
          .join("") || "No msg"
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async feed() {
    try {
      const response = await fetch(
        "https://www.figgs.ai/api/proxy/bots/feed?randomize=true",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
            Referer: "https://www.figgs.ai/",
          },
        },
      );
      const result = await response.json();
      return result.bots || [];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
const figgsAiInstance = new FiggsAi();

const figgsAi = async (prompt, options = {}) => {
  return await figgsAiInstance.create(prompt, options);
};

export default figgsAi;
