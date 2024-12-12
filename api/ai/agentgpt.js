import fetch from "node-fetch";
async function AgentGpt(
  question,
  history = [
    {
      type: "ai",
      data: {
        content: "Model AI",
        additional_kwargs: {},
      },
    },
  ],
) {
  const url = "https://mylangchain.vercel.app/api/agentchat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://mylangchain.vercel.app/?page=1",
  };
  const data = {
    bot: "",
    question: question,
    history: history,
    toolsSelect: [
      "Google Search",
      "WebPilot",
      "URL Reader",
      "Creature Generator",
      "Pinecone Store",
      "Medium plugin",
      "Filtir",
      "AI Agents",
      "Xpapers",
      "getit.ai plugins finder",
      "Eightify Insights",
      "Ukr-School-Books",
      "Welt NewsVerse",
      "Stories",
      "My Writing Companion",
      "Video Summary",
      "Check Website Down",
      "Paxi AI",
    ],
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const result = await response.text();
    const { action_input: output } = JSON.parse(
      "{" + result.split("\n").slice(2, 5).join(""),
    );
    return output;
  } catch (error) {
    console.error(error);
  }
}
export default AgentGpt;
