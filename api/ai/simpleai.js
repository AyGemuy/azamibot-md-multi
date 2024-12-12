import fetch from "node-fetch";
async function SimpleAi(prompt) {
  const url = new URL("https://simple-ai.io/api/generate_sse");
  const params = new URLSearchParams({
    user_input: prompt,
    images: "",
    files: "",
    time: Date.now().toString(),
    session: Date.now().toString(),
    mem_length: "7",
    functions: "Time,Weather,Redirection",
    role: "",
    store: "",
    node: "",
    use_stats: false,
    use_eval: false,
    use_location: false,
    location: null,
    lang: "id-ID",
    use_system_role: true,
  });
  url.search = params.toString();
  try {
    const response = await fetch(url);
    return (await response.text())
      .split("\n")
      .filter(
        (line) =>
          line.startsWith("data: ") &&
          ![
            "###STATUS###",
            "###MODEL###",
            "###STATS###",
            "###RETURN###",
            "[DONE]",
          ].some((keyword) => line.slice(5).startsWith(keyword)),
      )
      .map((line) => line.slice(5))
      .join("")
      .trim();
  } catch (error) {
    console.error("Error in SimpleAi:", error);
    throw error;
  }
}
export default SimpleAi;
