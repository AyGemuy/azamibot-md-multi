import fetch from "node-fetch";
async function MoshiAi(input) {
  try {
    const url = "https://moshiai.org/letter/ftyguh";
    const headers = {
      "Content-Type": "application/json",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
      Referer: "https://ailettergenerator.net/",
    };
    const data = {
      input: input,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    const { content: result } = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
export default MoshiAi;
