import fetch from "node-fetch";
const headers = {
  Authority: "sara.study",
  Accept: "application/json",
  Origin: "https://sara.study",
  Referer: "https://sara.study/",
  "User-Agent": "Postify/1.0.0",
  "X-Forwarded-For": new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join("."),
  "Content-Type": "application/x-www-form-urlencoded",
};
async function SaraStudyAI(question) {
  try {
    const formData = new URLSearchParams({
      question: chat,
    });
    const response = await fetch("https://sara.study/api/questions", {
      method: "POST",
      headers: headers,
      body: formData,
    });
    return response.ok
      ? await response.json()
      : Promise.reject(await response.text());
  } catch (error) {
    throw new Error(error.message);
  }
}
export default SaraStudyAI;
