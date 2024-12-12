import fetch from "node-fetch";
import crypto from "crypto";
const AVAILABLE_MODELS = [
  "gpt-4o-mini",
  "toolbaz_v3.5_pro",
  "toolbaz_v3",
  "toolbaz_v2",
  "unfiltered_x",
  "mixtral_8x22b",
  "Qwen2-72B",
  "Llama-3-70B",
];
const generateSessionId = () => crypto.randomUUID();
const AiChats = async (
  prompt,
  type = "chat",
  model = "gpt-4o-mini",
  sessionId,
) => {
  const url = "https://ai-chats.org/chat/send2/";
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
    Referer:
      type === "image"
        ? "https://ai-chats.org/image/"
        : "https://ai-chats.org/chat/",
  };
  const body = JSON.stringify({
    type: type,
    messagesHistory: [
      {
        id: sessionId,
        from: "you",
        content: prompt,
      },
    ],
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (type === "image") {
      const data = await response.json();
      return data.data[0].url;
    } else {
      const data = await response.text();
      return data
        .split("\n")
        .filter((line) => line.trim())
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .join("");
    }
  } catch {
    throw new Error("Terjadi kesalahan selama pemrosesan.");
  }
};
export default AiChats;
