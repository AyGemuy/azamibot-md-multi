import fetch from "node-fetch";

export const AiFlux = async (
  prompt,
  seed = 1000,
  random_seed = true,
  width = 512,
  height = 512,
  steps = 8,
) => {
  try {
    let options = {
      prompt: prompt,
      seed: seed || Math.floor(Math.random() * 2147483647) + 1,
      random_seed: random_seed ?? true,
      width: width ?? 512,
      height: height ?? 512,
      steps: steps ?? 8,
    };
    if (!options.prompt)
      return {
        status: false,
        message: "undefined reading prompt!",
      };
    const session_hash = string(11);
    const joinResponse = await fetch(
      "https://black-forest-labs-flux-1-schnell.hf.space/queue/join",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            options.prompt,
            options.seed,
            options.random_seed,
            options.width,
            options.height,
            options.steps,
          ],
          event_data: null,
          fn_index: 2,
          trigger_id: 5,
          session_hash: session_hash,
        }),
      },
    );
    if (!joinResponse.ok) throw new Error("Failed to join queue");
    const dataResponse = await fetch(
      `https://black-forest-labs-flux-1-schnell.hf.space/queue/data?session_hash=${session_hash}`,
    );
    if (!dataResponse.ok) throw new Error("Failed to retrieve data");
    const rawData = await dataResponse.text();
    const lines = rawData.split("\n");
    const jsonObjects = [];
    lines.forEach((line) => {
      if (line.startsWith("data: ")) {
        try {
          const jsonString = line.substring(6).trim();
          const jsonObject = JSON.parse(jsonString);
          jsonObjects.push(jsonObject);
        } catch (error) {
          throw new Error("Failed to parse JSON");
        }
      }
    });
    const result = jsonObjects.find((d) => d.msg === "process_completed") || {};
    if (!result?.success)
      return {
        status: false,
        message: result,
      };
    const images = result.output.data
      .filter((d) => typeof d === "object")
      .map((d) => d.url);
    return {
      status: true,
      data: {
        images: images,
      },
    };
  } catch (e) {
    return {
      status: false,
      message: e.message,
    };
  }
};

const string = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const prodiaGen = async (prompt, model) => {
  try {
    const seed = Math.floor(Math.random() * 1e9);
    const params = new URLSearchParams({
      new: "true",
      prompt: prompt,
      model: model ? model : "absolutereality_v181.safetensors [3d9d4d2b]",
      negative_prompt: "",
      steps: "20",
      cfg: "7",
      seed: seed.toString(),
      sampler: "DPM++ 2M Karras",
      aspect_ratio: "square",
    });
    let response = await fetch(`https://api.prodia.com/generate?${params}`);
    if (!response.ok) throw new Error("Failed to initiate image generation");
    let data = await response.json();
    let jobId = data.job;
    let jobStatus = "";
    do {
      response = await fetch(`https://api.prodia.com/job/${jobId}`);
      if (!response.ok) throw new Error("Failed to check job status");
      data = await response.json();
      jobStatus = data.status;
      if (jobStatus !== "succeeded") {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    } while (jobStatus !== "succeeded");
    return `https://images.prodia.xyz/${jobId}.png?download=1`;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const Flux1ai = async (prompt) => {
  try {
    const response = await fetch("https://flux1ai.com/api/hf-schnell-new", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
        Referer: "https://flux1ai.com/id/create",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          width: 576,
          height: 1024,
        },
      }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    if (!result.imageBase64)
      throw new Error("No imageBase64 found in response");
    const base64Data = result.imageBase64.replace(
      /^data:image\/\w+;base64,/,
      "",
    );
    return Buffer.from(base64Data, "base64");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const Aquarelle = async (prompt) => {
  try {
    const res = await fetch("https://aquarelle.octo.ai/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K)",
        Referer: "https://aquarelle.octo.ai/",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const { images } = await res.json();
    return Buffer.from(images[0].image_b64, "base64");
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const FluxPro = async (prompt) => {
  const url = "https://dev.maquae.com/flux-pro/fluxpro.php";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36",
    Referer: "https://dev.maquae.com/flux-pro/fluxpro.php",
  };
  const body = JSON.stringify({
    action: "generate",
    prompt: prompt,
    aspect_ratio: "768:1024",
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();
    return result.image ? Buffer.from(result.image, "base64") : null;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export const Aipic = async (text) => {
  try {
    const url = `https://sms-bomb.vercel.app/api/aipic.php?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching Aipic:", error.message);
    return null;
  }
};

export const Animagine = async (text) => {
  try {
    const url = `https://smfahim.onrender.com/animagine?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching Animagine:", error.message);
    return null;
  }
};

export const Gen = async (text) => {
  try {
    const url = `https://smfahim.onrender.com/gen?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching Gen:", error.message);
    return null;
  }
};

export const Prodia = async (text) => {
  try {
    const model = Math.floor(Math.random() * 55) + 1;
    const url = `https://smfahim.onrender.com/prodia?prompt=${encodeURIComponent(text)}&model=${model}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching Prodia:", error.message);
    return null;
  }
};

export const Tensor = async (text) => {
  try {
    const url = `https://smfahim.onrender.com/tensor?prompt=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch from ${url}, status: ${response.status}`,
      );
    }
    return Buffer.from(await response.arrayBuffer());
  } catch (error) {
    console.error("Error fetching Tensor:", error.message);
    return null;
  }
};
