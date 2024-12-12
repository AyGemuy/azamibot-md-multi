import fetch from "node-fetch";
async function Turboseek(content) {
  try {
    const sourcesResponse = await fetch(
      "https://www.turboseek.io/api/getSources",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
        }),
      },
    );
    const sources = await sourcesResponse.json();
    const similarQuestionsResponse = await fetch(
      "https://www.turboseek.io/api/getSimilarQuestions",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
        }),
      },
    );
    const similarQuestions = await similarQuestionsResponse.json();
    const answerResponse = await fetch(
      "https://www.turboseek.io/api/getAnswer",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
          Referer: "https://www.turboseek.io/",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: content,
          sources: sources,
        }),
      },
    );
    const data = await answerResponse.text();
    const parsedChunks = data.split("\n").map((line) => {
      try {
        return JSON.parse(line.slice(6)).text;
      } catch (e) {
        return "";
      }
    });
    const combinedAnswer = parsedChunks.join("").trim();
    const formattedSources = sources
      .map((source) => `- [${source.name}](${source.url})`)
      .join("\n");
    const formattedSimilarQuestions = similarQuestions
      .map((question) => `- ${question}`)
      .join("\n");
    const combinedOutput = `
      *Answer:*
      ${combinedAnswer}
      
      *Similar Questions:*
      ${formattedSimilarQuestions}
      
      *Sources:*
      ${formattedSources}
    `;
    return combinedOutput.trim();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
export default Turboseek;
