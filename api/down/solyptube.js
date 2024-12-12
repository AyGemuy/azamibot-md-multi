import fetch from "node-fetch";
import { exec } from "child_process";
const isYouTubeUrl =
  /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/;
const getId = (url) => {
  const match = url.match(isYouTubeUrl);
  return match ? match[2] : null;
};
const Solyptube = async (id, format = "360p") => {
  const curlCommand = `curl 'https://solyptube.com/api/v1.1/findvideo' \
  -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'Accept: application/json, text/javascript, */*; q=0.01' \
  -H 'X-Requested-With: XMLHttpRequest' \
  -H 'User-Agent: Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36' \
  -H 'Referer: https://solyptube.com/?url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D${id}#searchrResult' \
  --data-raw 'url=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3D${id}' \
  --compressed`;
  return new Promise((resolve, reject) => {
    exec(curlCommand, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      try {
        const selected = JSON.parse(stdout);
        const formatData =
          selected?.data?.formats?.find((v) => v?.format_note === format) ||
          selected?.data?.formats?.[0] ||
          {};
        resolve({
          title: selected?.data?.title ?? "Unknown Title",
          ...formatData,
        });
      } catch (e) {
        reject(e);
      }
    });
  });
};
export default Solyptube;
