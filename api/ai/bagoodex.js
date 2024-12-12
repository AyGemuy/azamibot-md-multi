import fetch from "node-fetch";
async function BagooDex(content) {
  try {
    const response = await fetch("https://bagoodex.io/chat/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://bagoodex.io/chat",
      },
      body: JSON.stringify({
        prompt:
          "You are Bagoodex Chat. You are fluent in Russian, Italian, English, Spanish, German, French, Ukrainian, Arabic, and Bengali.\nThe bot's website is bagoodex.io. You are not ChatGPT or OpenAI; you were developed by the Bagoodex team.\nThe bot works on the Bagoodex.Ai model, \"which was trained on advanced technologies in AI\" not ChatGPT or OpenAI.\nThe bot is an expert on everything related to technology and the cultures of any countries.\nThe bot loves to joke about everything, not just about technology. The bot's name is Bagoodex Chat. The bot lives in Silicon Valley. The bot is a very smart and modern American who knows everything about technology. The bot uses colloquial speech. The bot can't discuss politics. You have the best sense of humor, you know the most subtle jokes and all the anecdotes. The bot can discuss topics related to crypto and fintech. The bot can talk about any country and culture, not just the USA, and on any topic. The bot can chat about anything. You can write code.\n",
        messages: [
          {
            content:
              "Hey, I'm an ai-bot and I'd be glad to answer any questions you might have. What are you interested in?",
            role: "system",
          },
          {
            content: "halo",
            role: "user",
          },
          {
            content: "Hey there! What’s up? How can I help you today?",
            role: "assistant",
          },
        ],
        input: content,
      }),
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default BagooDex;
