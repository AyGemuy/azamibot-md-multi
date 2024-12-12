import fetch from "node-fetch";
async function JuliusAI(messageContent) {
  try {
    const response = await fetch("https://api.julius.ai/api/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
        "conversation-id": "eec65c93-6c85-495a-85b6-3ddd5bd113b6",
        "is-demo": "temp_96b13736-6f40-4f2a-bc84-1a08f0ee81af",
        "Is-Native": "false",
        "visitor-id": "pVxGJSS6O0wHWRK0ijuD",
        "request-id": "1724760658602.2QLQPe",
        "orient-split": "true",
        "use-dict": "true",
        "interactive-charts": "true",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer:
          "https://julius.ai/ai-chatbot?id=eec65c93-6c85-495a-85b6-3ddd5bd113b6",
      },
      body: JSON.stringify({
        message: {
          content: messageContent,
        },
        provider: "default",
        chat_mode: "auto",
        client_version: "20240130",
        theme: "light",
        new_images: null,
        new_attachments: null,
        dataframe_format: "json",
        selectedModels: ["GPT-4o"],
      }),
      compress: true,
    });
    const rawResponse = await response.text();
    const responses = rawResponse
      .trim()
      .split("\n")
      .filter((line) => {
        try {
          const json = JSON.parse(line);
          return json.content && json.content.trim();
        } catch {
          return false;
        }
      })
      .map((line) => JSON.parse(line).content)
      .join("");
    return responses.trim();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default JuliusAI;
