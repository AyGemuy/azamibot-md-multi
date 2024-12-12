import fetch from "node-fetch";
const cleanHtml = (str) => {
  return str
    .replace(/<[^>]*>?/gm, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&lsquo;/g, "‘")
    .replace(/&rsquo;/g, "’");
};
async function Zeta(prompt, type = "dev") {
  const url = "https://vestia-zeta.vercel.app/api/chat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer:
      type === "dev"
        ? "https://vestia-zeta.vercel.app/about"
        : "https://vestia-zeta.vercel.app/",
  };
  const body =
    type === "dev"
      ? JSON.stringify({
          prompt: prompt,
          type: type,
        })
      : JSON.stringify({
          prompt: prompt,
        });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
      compress: true,
    });
    const data = await response.json();
    return cleanHtml(data?.message) || "No msg";
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
export default Zeta;
