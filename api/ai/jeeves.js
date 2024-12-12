import fetch from "node-fetch";
const extractData = (input) => {
  return input
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => {
      try {
        const json = JSON.parse(line.substring(6).trim());
        return json.choices?.text || json.finalText || "";
      } catch {
        return "";
      }
    })
    .join("")
    .trim();
};
const jeevesai = async (prompt) => {
  try {
    const response = await fetch("https://api.jeeves.ai/generate/v3/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer null",
      },
      body: JSON.stringify({
        temperature: "0.75",
        model: "gpt-3.5-turbo",
        stream: "on",
        presence_penalty: "0",
        frequency_penalty: "0",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });
    return extractData(await response.text());
  } catch (error) {
    console.error("Error generating chat:", error);
    return "Error generating chat.";
  }
};
export default jeevesai;
