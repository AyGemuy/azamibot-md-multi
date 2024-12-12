import fetch from "node-fetch";

export const zcodequest = async (question, model) => {
  const payload = {
    p1: model,
    p2: question,
    option1: "3 - A detailed answer",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "answer-question");
};

export const zcodegen = async (question, model) => {
  const payload = {
    p1: model,
    p2: question,
    option1: "3 - A detailed answer",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "code-generator");
};

export const zcodebug = async (question, model, p2) => {
  const payload = {
    p1: model,
    p2: p2,
    p3: question,
    option1: "find and explain bug",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "code-debug");
};

export const zcoderef = async (question, model, p2) => {
  const payload = {
    p1: model,
    p2: p2,
    p3: question,
    option1: "Refactor my code and explain me",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "code-refactor");
};

export const zcoderev = async (question, model, p2) => {
  const payload = {
    p1: model,
    p2: p2,
    p3: question,
    option1: "Make a full code review",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "code-review");
};

export const zcodedoc = async (question, model, p2) => {
  const payload = {
    p1: model,
    p2: p2,
    p3: question,
    option1: "Add comment everywhere you can",
    option2: "Professional",
    option3: "Indonesian",
  };
  return await handleRequest(payload, "code-documentation");
};

const handleRequest = async (payload, tool) => {
  try {
    const msg = await fetchAndParse(payload, tool);
    return msg;
  } catch (e) {
    return e;
  }
};

const fetchAndParse = async (payload, tool) => {
  try {
    const url = "https://zzzcode.ai/api/tools/" + tool;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const match = (await response.text()).match(
      /zzzredirectmessageidzzz:\s*([a-zA-Z0-9-]+)/,
    );
    const id = match ? match[1] : null;

    if (!id) throw new Error("ID not found in response");

    const response2 = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const lines = (await response2.text()).split("\n").slice(1, -3);

    return lines
      .map((line) => {
        const msg = line.startsWith('data: "') ? line.slice(7, -1) : line;
        return JSON.parse(`{"msg": "${msg}"}`);
      })
      .map((parsedLine) => parsedLine.msg)
      .join("");
  } catch (e) {
    console.error("Error in fetchAndParse:", e.message);
    return null;
  }
};
