import fetch from "node-fetch";
import * as cheerio from "cheerio";
class Regem {
  constructor() {
    this.baseUrl = "https://lusion.regem.in";
    this.aiServerUrl = "https://ai-server.regem.in/api";
  }
  async flux(prompt) {
    try {
      const url = `${this.baseUrl}/access/flux.php?prompt=${prompt}`;
      const headers = {
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: `${this.baseUrl}/?ref=taaft&utm_source=taaft&utm_medium=referral`,
      };
      const response = await fetch(url, {
        headers: headers,
      });
      const html = await response.text();
      const $ = cheerio.load(html);
      const fullImageLink = $("a.btn-navy.btn-sm.mt-2").attr("href");
      return fullImageLink ? `${fullImageLink}` : null;
    } catch (error) {
      console.error(`Error in flux: ${error}`);
      return null;
    }
  }
  async writer(input) {
    try {
      const url = `${this.aiServerUrl}/index.php`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://regem.in/ai-writer/",
      };
      const formData = new URLSearchParams();
      formData.append("input", input);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData.toString(),
      });
      return await response.text();
    } catch (error) {
      console.error(`Error in writer: ${error}`);
      return null;
    }
  }
  async rephrase(input) {
    try {
      const url = `${this.aiServerUrl}/rephrase.php`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
        Referer: "https://regem.in/ai-rephrase-tool/",
      };
      const formData = new URLSearchParams();
      formData.append("input", input);
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData.toString(),
      });
      return await response.text();
    } catch (error) {
      console.error(`Error in rephrase: ${error}`);
      return null;
    }
  }
}
const rg = new Regem();

const flux = async (prompt) => {
  return await rg.flux(prompt);
};

const writer = async (input) => {
  return await rg.writer(input);
};

const rephrase = async (input) => {
  return await rg.rephrase(input);
};

export { flux, writer, rephrase };
