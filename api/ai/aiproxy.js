import fetch from "node-fetch";
async function chatAI(query, profile, model) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer sk-bpGbwgFrNi9GKcNd9DBAd6QwGtuecv30SU2gAreQzVO8XUrF",
    },
    body: JSON.stringify({
      model: model || "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: profile,
        },
        {
          role: "user",
          content: query,
        },
      ],
    }),
    redirect: "follow",
  };
  try {
    const response = await fetch(
      "https://api.aiproxy.io/v1/chat/completions",
      options,
    );
    const data = await response.json();
    return data.choices[0]?.message.content;
  } catch (error) {
    console.error("Error:", error);
  }
}
export default chatAI;
