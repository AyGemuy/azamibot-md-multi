import fetch from "node-fetch";
const AiContinues = async (inputText, uid) => {
  const params = new URLSearchParams({
    q: inputText,
    uid: uid,
    model: "gpt-4",
    cai: "",
  });
  try {
    const res = await fetch(
      `https://ai-continues.onrender.com/chatbox?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return (await res.json()).answer;
  } catch (error) {
    console.error("AI response fetch failed:", error);
    throw new Error("AI response fetch failed.");
  }
};
export default AiContinues;
