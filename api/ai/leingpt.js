import fetch from "node-fetch";
import crypto from "crypto";
const generateUid = () => crypto.randomUUID();
async function Leingpt(content, conversationId) {
  try {
    const response = await fetch(
      "https://leingpt.ru/backend-api/v2/conversation",
      {
        method: "POST",
        headers: {
          Accept: "text/event-stream",
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://leingpt.ru/chat/",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          action: "_ask",
          model: "gemini-1.5-pro-exp-0801",
          jailbreak: "Обычный",
          tonegpt: "Balanced",
          streamgen: false,
          web_search: false,
          rolej: "default",
          meta: {
            id: parseInt(conversationId),
            content: {
              conversation: [],
              content_type: "text",
              parts: [
                {
                  content: content,
                  role: "user",
                },
              ],
            },
          },
        }),
        compress: true,
      },
    );
    const data = await response.text();
    return data || "No answer received.";
  } catch (error) {
    console.error("Error:", error);
    return "Terjadi kesalahan saat memproses permintaan.";
  }
}
export default Leingpt;
