import { parseStringPromise } from "xml2js";
import fetch from "node-fetch";
const base64Encode = (str) => Buffer.from(str).toString("base64");
const generateRandomSeed = () => Math.floor(Math.random() * 1e6);
const ArtbotAi = async (query) => {
  try {
    const body = JSON.stringify({
      app_id: "404b439e31d62ba00825c26832255485",
      client_token: "b:m:fdca8a80e72cf200cf95ecae1c58d7d7",
      client_build: "20240826163007",
      project_name: "halloween-2022",
      do_add_task: true,
      tasks: [
        `<image_process_call><lang>id</lang><methods_list><method order="1"><name>collage</name><params>template_name=sd_v1_4;seed=${generateRandomSeed()}</params></method></methods_list><prompt>${base64Encode(query)}</prompt><abort_methods_chain_on_error>1</abort_methods_chain_on_error><abort_attempts_on_error>1</abort_attempts_on_error><owner>web-halloween-2022-20240826163007</owner></image_process_call>`,
      ],
    });
    const response = await fetch(
      "https://halloween2022.photo-cdn.net/psign-addtask",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
          Referer: "https://artbot.ai/result",
        },
        body: body,
      },
    );
    const data = await response.json();
    const { image_process_response } = await parseStringPromise(data[0].data);
    const request_id = image_process_response.request_id[0],
      timeout = 6e4,
      startTime = Date.now();
    while (true) {
      const statusResponse = await fetch(
        `https://opeapi.ws.pho.to/getresult?request_id=${request_id}&r=${Math.random()}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0",
            Referer: "https://artbot.ai/result",
          },
        },
      );
      const text = await statusResponse.text();
      const { image_process_response: statusData } =
        await parseStringPromise(text);
      const { status, result_url } = statusData;
      if (status[0] === "OK" && result_url[0]) {
        return result_url[0];
      }
      if (Date.now() - startTime > timeout) {
        throw new Error("Request timed out");
      }
      await new Promise((resolve) => setTimeout(resolve, 5e3));
    }
  } catch (error) {
    console.error("Error in ArtbotAi:", error);
    throw new Error("Gagal memproses permintaan");
  }
};
export default ArtbotAi;
