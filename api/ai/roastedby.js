import fetch from "node-fetch";
import chalk from "chalk";
import { v4 as uuidv4 } from "uuid";
const apiUrl = "https://roastedby.ai/api/generate";
const styles = [
  "default",
  "crypto_bro",
  "new_york",
  "southern_american",
  "south_london",
  "surfer_dude",
  "valley_girl",
  "adult",
];
async function roastedby(message, style = "default") {
  if (!styles.includes(style)) {
    return `Style tidak valid. Gunakan salah satu dari: ${styles.join(", ")}`;
  }
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://roastedby.ai/?via=topaitools",
  };
  const body = JSON.stringify({
    userMessage: {
      role: "user",
      content: message,
    },
    history: [
      {
        role: "assistant",
        content: "Hello there. I'm here to roast you.",
      },
    ],
    style: style,
  });
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    return {
      status: "error",
      message: error.message,
    };
  }
}
export default roastedby;
