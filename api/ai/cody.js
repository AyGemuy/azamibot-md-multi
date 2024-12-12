import axios from "axios";

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function cody(message) {
  try {
    return await new Promise(async (resolve, reject) => {
      if (!message) return reject("missing message input!");
      axios
        .post("https://cody.md/api/chat/init", null, {
          headers: {
            cookie:
              "identityId=us-east-1:cb37616b-3195-cceb-4cf1-f75d3d93b0c8; secretAccessKey=DWcWnaaEUtPD1pyIp1bXEiJrp5hkDoFH21WnrHoL7; accessKeyId=ASIA4WN3BNMY7J5QN5F6;",
          },
        })
        .then((res) => {
          const token = res.data.token;
          if (!token) return reject("bearer token not found!");
          axios
            .post(
              "https://api.cody.md/ask",
              {
                input: message,
                files: [],
                profile: {
                  country: "ID",
                },
              },
              {
                headers: {
                  authorization: token,
                },
              },
            )
            .then((res) => {
              const body = res.data;
              if (!body) return reject("failed get response!");
              return resolve({
                success: true,
                answer: body,
              });
            })
            .catch((e) => reject(e.response));
        })
        .catch((e) => reject(e.response));
    });
  } catch (e) {
    return {
      success: false,
      errors: [e],
    };
  }
}

export default cody;
