import fetch from "node-fetch";
async function chatAI(query, profile, model = "chat-gemini-flash") {
  const url = "https://app.giz.ai/api/data/users/inferenceServer.infer";
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer:
      "https://app.giz.ai/assistant?mode=chat&prompt=Ggg&baseModel=dynamic",
  };
  const data = {
    model: model,
    input: {
      messages: [
        {
          type: "system",
          content: profile,
        },
        {
          type: "human",
          content: query,
          unsaved: true,
        },
      ],
      mode: "plan",
    },
    noStream: true,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    return (await response.json())?.output;
  } catch (error) {
    console.error("Error during chatAI request:", error);
    throw error;
  }
}
export default chatAI;
