import axios from "axios";

const DEFAULT_SPOOF_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
  DNT: "1",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
};

// Fungsi parseArgsWithFlags yang ada (digunakan untuk argumen gaya --flag)
function parseArgsWithFlags(argsStr) {
  const output = { headers: {}, params: {}, method: undefined, body: undefined, errors: [] };
  if (!argsStr || typeof argsStr !== 'string' || argsStr.trim() === "") return output;

  const args = argsStr.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];

  const unquote = (str) => {
    if (typeof str === 'string' && ((str.startsWith('"') && str.endsWith('"')) || (str.startsWith("'") && str.endsWith("'")))) {
      return str.slice(1, -1);
    }
    return str;
  };

  for (let i = 0; i < args.length; i++) {
    const flag = args[i];
    let value;

    // Pastikan nilai bukan flag berikutnya
    if (i + 1 < args.length && !args[i+1].startsWith('--')) {
      value = unquote(args[i + 1]);
    } else if (['--method', '--headers', '--params', '--body'].includes(flag)) {
      // Jika flag membutuhkan nilai tetapi tidak ada (atau nilai adalah flag lain), catat error
      output.errors.push(`Flag ${flag} memerlukan nilai.`);
      continue;
    }


    switch (flag) {
      case '--method':
        if (value !== undefined) {
          output.method = value.toUpperCase();
          i++;
        }
        break;
      case '--headers':
        if (value !== undefined) {
          try {
            output.headers = JSON.parse(value);
          } catch (e) {
            output.errors.push(`JSON tidak valid untuk --headers: ${value}`);
          }
          i++;
        }
        break;
      case '--params':
        if (value !== undefined) {
          try {
            output.params = JSON.parse(value);
          } catch (e) {
            output.errors.push(`JSON tidak valid untuk --params: ${value}`);
          }
          i++;
        }
        break;
      case '--body':
        if (value !== undefined) {
          try {
            output.body = JSON.parse(value);
          } catch (e) {
            // Jika parsing JSON gagal, simpan sebagai string biasa
            output.body = value;
          }
          i++;
        }
        break;
      default:
        // Abaikan flag atau argumen yang tidak dikenal untuk saat ini
        // output.errors.push(`Flag atau argumen tidak dikenal: ${flag}`);
        break;
    }
  }
  return output;
}

// Fungsi bantuan untuk mem-parse 'kunci1=nilai1&kunci2=nilai2' menjadi objek
function parseQueryStringToObject(qs) {
    const params = {};
    if (qs && typeof qs === 'string') {
        qs.split('&').forEach(part => {
            const [key, ...valParts] = part.split('='); // Memisahkan kunci dari nilai
            const value = valParts.join('='); // Menggabungkan kembali bagian nilai jika nilai mengandung '='
            if (key) { // Pastikan kunci ada
                params[decodeURIComponent(key)] = decodeURIComponent(value || ''); // Dekode URI dan simpan
            }
        });
    }
    return params;
}


let handler = async (m, { conn, usedPrefix, command, text }) => {
  try {
    if (!text || text.trim() === "") {
      return conn.reply(
        m.chat,
        `Gunakan:\n1. ${usedPrefix}${command} [METHOD] <url> [data_string] [header_string] [flags...]\n2. ${usedPrefix}${command} <url> [flags...]\n\nDetail:\n- [METHOD]: GET, POST, PUT, DELETE, dll. (Opsional).\n- <url>: URL target (misal: example.com).\n- [data_string]: String query untuk parameter/body (misal: "name=John&age=30").\n  - GET: jadi parameter URL.\n  - POST/PUT/PATCH: jadi body JSON.\n- [header_string]: String query untuk header (misal: "X-Api-Key=secret&Auth=token").\n- [flags...]: Argumen flag opsional:\n    --method <METHOD>\n    --headers '{"json_key":"json_val"}'\n    --params '{"json_key":"json_val"}'\n    --body '<JSON_BODY_atau_TEKS>'\n\nContoh Format Baru:\n  ${usedPrefix}${command} POST api.example.com/users name=JohnDoe&age=30 CustomHeader=TestValue\n  ${usedPrefix}${command} google.com q=cuaca+hari+ini\n\nContoh Format Flags:\n  ${usedPrefix}${command} example.com --method POST --body '{"id":1}' --headers '{"Content-Type":"application/json"}'`,
        m
      );
    }

    let inputArgs = text.trim().split(/\s+/);
    let explicitMethodFromPositional = "";
    let parsedUrl = "";
    let dataStr = null;      // Untuk key=val&key2=val2 (body/params)
    let headerStr = null;    // Untuk hkey=hval&hkey2=hval2 (headers)
    let remainingArgsForFlags = [];

    // 1. Identifikasi metode eksplisit (GET/POST/dll.) jika itu argumen pertama DAN merupakan kata kerja metode HTTP yang valid
    const potentialMethod = inputArgs[0]?.toUpperCase();
    const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
    if (inputArgs.length > 0 && httpMethods.includes(potentialMethod)) {
        explicitMethodFromPositional = potentialMethod;
        inputArgs = inputArgs.slice(1); // Konsumsi metode
    }

    // 2. Identifikasi URL (harus ada sebagai argumen berikutnya)
    if (inputArgs.length > 0 && !inputArgs[0].startsWith('--')) {
        parsedUrl = inputArgs[0];
        inputArgs = inputArgs.slice(1); // Konsumsi URL
    } else {
        return conn.reply(m.chat, `URL diperlukan. Format: ${usedPrefix}${command} [METHOD] <url> ...`, m);
    }
    
    const validUrl = parsedUrl.startsWith("http://") || parsedUrl.startsWith("https://") ? parsedUrl : "http://" + parsedUrl;

    // 3. Identifikasi data_string dan header_string (argumen non-flag setelah URL)
    // Ini bersifat posisional: argumen non-flag pertama (mengandung '=') adalah data, yang kedua (mengandung '=') adalah header.
    if (inputArgs.length > 0 && !inputArgs[0].startsWith('--') && inputArgs[0].includes('=')) {
        dataStr = inputArgs[0];
        inputArgs = inputArgs.slice(1); // Konsumsi data_string
    }
    if (inputArgs.length > 0 && !inputArgs[0].startsWith('--') && inputArgs[0].includes('=')) {
        headerStr = inputArgs[0];
        inputArgs = inputArgs.slice(1); // Konsumsi header_string
    }

    // 4. Argumen yang tersisa adalah untuk parsing gaya --flag
    remainingArgsForFlags = inputArgs;
    const extraPayloadStringForFlags = remainingArgsForFlags.join(" ");
    const parsedArgsFromFlags = parseArgsWithFlags(extraPayloadStringForFlags);

    if (parsedArgsFromFlags.errors.length > 0) {
        return conn.reply(m.chat, `Kesalahan parsing argumen flags:\n- ${parsedArgsFromFlags.errors.join('\n- ')}`, m);
    }

    // Tentukan metode final: METHOD Posisional > flag --method > Disimpulkan
    let finalMethod = explicitMethodFromPositional || parsedArgsFromFlags.method;
    if (!finalMethod) {
        if (command.toLowerCase() === 'get') { // Jika perintah adalah '.get'
            finalMethod = 'GET'; // Default ke GET
        } else { // Untuk '.fetch' atau alias lain
            // Jika dataStr (format baru) atau --body (format flag) ada, asumsikan POST, jika tidak GET
            finalMethod = (dataStr || parsedArgsFromFlags.body !== undefined) ? 'POST' : 'GET';
        }
    }

    // Siapkan params dan body
    // Prioritas: dataStr > flag --params/--body
    let requestParams = parsedArgsFromFlags.params || {};
    let requestBody = parsedArgsFromFlags.body; // dari --body '{"key":"val"}' atau 'text'

    let dataStrWasUsedForBody = false;
    if (dataStr) {
        const parsedDataStringObject = parseQueryStringToObject(dataStr);
        if (['POST', 'PUT', 'PATCH'].includes(finalMethod.toUpperCase())) {
            // dataStr menimpa --body jika keduanya ada untuk metode POST/PUT/PATCH
            requestBody = JSON.stringify(parsedDataStringObject);
            dataStrWasUsedForBody = true;
        } else { // Untuk GET, dll., gabungkan ke params. dataStr lebih diutamakan.
            requestParams = { ...parsedDataStringObject, ...requestParams };
        }
    }
    
    // Siapkan headers
    // Prioritas: DEFAULT_SPOOF_HEADERS < headerStr < Content-Type Otomatis < flag --headers
    let combinedHeaders = { ...DEFAULT_SPOOF_HEADERS };

    if (headerStr) {
        const parsedHeaderStringObject = parseQueryStringToObject(headerStr);
        combinedHeaders = { ...combinedHeaders, ...parsedHeaderStringObject };
    }
    
    // Jika dataStr digunakan untuk membuat requestBody JSON, dan Content-Type belum diatur oleh combinedHeaders (Default atau headerStr)
    // DAN tidak diatur oleh flag --headers, maka tambahkan.
    if (dataStrWasUsedForBody) {
        const contentTypeKeyInCombined = Object.keys(combinedHeaders).find(k => k.toLowerCase() === 'content-type');
        const contentTypeKeyInFlagHeaders = parsedArgsFromFlags.headers ? Object.keys(parsedArgsFromFlags.headers).find(k => k.toLowerCase() === 'content-type') : undefined;

        if (!contentTypeKeyInCombined && !contentTypeKeyInFlagHeaders) {
            combinedHeaders['Content-Type'] = 'application/json';
        }
    }

    // Gabungkan header dari flag --headers (misal, --headers '{"X-Custom":"val"}'), ini memiliki prioritas tertinggi.
    const finalHeaders = { ...combinedHeaders, ...(parsedArgsFromFlags.headers || {}) };
    
    // Baris debug, hapus atau komentari untuk penggunaan produksi
    // conn.reply(m.chat, `Memproses ${finalMethod} ke ${validUrl}...\nData String: ${dataStr || "Tidak ada"}\nHeader String: ${headerStr || "Tidak ada"}\nBody (final): ${typeof requestBody === 'string' ? requestBody.substring(0,100) + (requestBody.length > 100 ? "..." : "") : requestBody}\nParams (final): ${JSON.stringify(requestParams)}\nHeaders (final): ${JSON.stringify(finalHeaders)}`, m);
    const quotedOptions = { quoted: m };

    try {
      // Mencoba mendapatkan contentType dari HEAD request dulu, tapi ini bisa gagal.
      // Lebih baik melakukan request utama lalu memeriksa header responsnya.
      // Timeout ditambahkan untuk HEAD dan request utama.
      const baseAxiosConfig = {
        method: finalMethod,
        url: validUrl,
        headers: finalHeaders,
        params: requestParams,
        data: requestBody,
        timeout: 15000, // Timeout untuk request utama
      };
      
      let response;

      try {
        // Lakukan request utama. Axios akan mencoba parse JSON atau mengembalikan teks secara default.
        response = await axios(baseAxiosConfig);
      } catch (error) {
          if (error.response && error.response.data) {
              let errorData = error.response.data;
              if (Buffer.isBuffer(errorData)) errorData = errorData.toString('utf-8', 0, 500);
              else if (typeof errorData === 'object') errorData = JSON.stringify(errorData);
              else errorData = String(errorData);
              console.error("Axios request error data:", errorData.slice(0, 500));
          }
          throw error; // Lemparkan kembali untuk ditangani oleh blok catch luar
      }

      const contentType = response.headers["content-type"]; // Dapatkan content type dari respons aktual

      if (contentType?.startsWith("image")) {
        const imageConfig = { ...baseAxiosConfig, responseType: 'arraybuffer'};
        const imageResponse = await axios(imageConfig);
        conn.sendMsg(m.chat, { image: Buffer.from(imageResponse.data, "binary"), mimetype: contentType }, quotedOptions);
      } else if (contentType?.startsWith("video")) {
        const videoConfig = { ...baseAxiosConfig, responseType: 'arraybuffer'};
        const videoResponse = await axios(videoConfig);
        conn.sendMsg(m.chat, { video: Buffer.from(videoResponse.data, "binary"), mimetype: contentType }, quotedOptions);
      } else if (contentType?.startsWith("audio")) {
        const audioConfig = { ...baseAxiosConfig, responseType: 'arraybuffer'};
        const audioResponse = await axios(audioConfig);
        conn.sendMsg(m.chat, { audio: Buffer.from(audioResponse.data, "binary"), mimetype: contentType }, { ...quotedOptions, ptt: (contentType === "audio/ogg" || contentType === "audio/opus") });
      } else if (contentType === "application/pdf") {
        const pdfConfig = { ...baseAxiosConfig, responseType: 'arraybuffer'};
        const pdfResponse = await axios(pdfConfig);
        conn.sendMsg(m.chat, { document: Buffer.from(pdfResponse.data, "binary"), mimetype: "application/pdf", fileName: "document.pdf" }, quotedOptions);
      } else if (contentType?.startsWith("application/json")) {
        const jsonData = typeof response.data === 'object' ? response.data : JSON.parse(response.data);
        conn.reply(m.chat, JSON.stringify(jsonData, null, 2), m);
      } else { 
        const disposition = response.headers["content-disposition"];
        const isLikelyText = contentType?.startsWith("text/") || (!contentType && !disposition && typeof response.data === 'string');

        if (isLikelyText) {
          conn.reply(m.chat, String(response.data), m);
        } else {
          let bufferData;
          if (Buffer.isBuffer(response.data)) { // Jika sudah buffer (misal dari responseType arraybuffer sebelumnya)
              bufferData = response.data;
          } else { // Jika tidak, fetch ulang sebagai arraybuffer
              const binaryFallbackConfig = { ...baseAxiosConfig, responseType: 'arraybuffer'};
              const binaryResponse = await axios(binaryFallbackConfig);
              bufferData = binaryResponse.data;
          }

          const buffer = Buffer.from(bufferData); // Pastikan ini adalah Node.js Buffer
          let filename = "file";
          try {
            const urlPath = new URL(validUrl).pathname.split('/').pop();
            if(urlPath) filename = urlPath.split('.')[0] || urlPath || "file";
          } catch (e) { /* URL tidak valid, filename tetap default */ }


          let resMimetype = response.headers["content-type"] || "application/octet-stream";
          
          if (disposition?.includes("filename")) {
            // Mencoba mengekstrak nama file dari Content-Disposition, mendukung format filename="nama.ext" dan filename*=UTF-8''nama.ext
            const filenameMatch = /filename\*?=(?:UTF-8'')?(?:(["'])(?<f1>.*?)\1|(?<f2>[^;\n]*))/i.exec(disposition);
            if (filenameMatch?.groups?.f1) {
                filename = decodeURIComponent(filenameMatch.groups.f1);
            } else if (filenameMatch?.groups?.f2) {
                filename = decodeURIComponent(filenameMatch.groups.f2.replace(/^"|"$/g, '')); // Hapus tanda kutip jika ada
            }
          }
          
          // Coba tambahkan ekstensi dari mimetype jika nama file tidak memiliki ekstensi
          const extensionFromMime = resMimetype?.includes("/") ? `.${resMimetype.split("/")[1].split("+")[0].split(";")[0]}` : "";
          if (!filename.match(/\.[a-zA-Z0-9]+$/) && extensionFromMime && extensionFromMime !== ".octet-stream" && extensionFromMime.length > 1 && extensionFromMime.length < 7) { // Validasi dasar untuk ekstensi
            filename += extensionFromMime;
          }
          // Fallback jika nama file masih "file" atau tidak berekstensi
          if ((filename === "file" || !filename.includes('.')) && extensionFromMime && extensionFromMime !== ".octet-stream" && extensionFromMime.length > 1 && extensionFromMime.length < 7) {
             filename = (filename === "file" ? "file" : filename.split('.')[0]) + extensionFromMime;
          } else if (filename === "file" || !filename.includes('.')) {
             filename += ".bin"; // Default ekstensi jika tidak ada yang cocok
          }


          conn.sendMsg(m.chat, { document: buffer, mimetype: resMimetype, fileName: filename }, quotedOptions);
        }
      }
    } catch (error) {
      console.error("Error saat melakukan permintaan:", error.message);
      let errorMsg = `Gagal: ${error.message}`;
      if (error.response) {
        errorMsg += `\nStatus: ${error.response.status}`;
        if (error.response.data) {
          try {
            const responseDataStr = Buffer.isBuffer(error.response.data) ? 
                                    error.response.data.toString('utf-8', 0, 500) : 
                                    (typeof error.response.data === 'object' ? 
                                        JSON.stringify(error.response.data, null, 2) : 
                                        String(error.response.data));
            errorMsg += `\nData: ${responseDataStr.slice(0, 300)}${responseDataStr.length > 300 ? '...' : ''}`;
          } catch (e) { /* Abaikan jika data tidak bisa distringify */ }
        }
      } else if (error.request) {
          errorMsg += "\nTidak ada respons dari server atau timeout.";
      }
      conn.reply(m.chat, errorMsg, m);
    }
  } catch (error) { // Menangkap error dari parsing awal atau bagian sinkron lainnya
    console.error("Error utama di handler:", error);
    conn.reply(
      m.chat,
      `Terjadi kesalahan internal: ${error.message}`,
      m
    );
  }
};

handler.help = [
  "get/fetch [METHOD] <url> [data_string] [header_string] [--flags...]",
  "\nFormat Simpel:",
  "  [METHOD]  GET, POST, PUT, DELETE, dll. (Opsional).",
  "  <url>     URL target (misal: example.com).",
  "  [data_string]  String query (misal: \"name=John&age=30\").",
  "                 - GET: jadi parameter URL.",
  "                 - POST/PUT/PATCH: jadi body JSON.",
  "  [header_string] String query untuk header (misal: \"Key=Val&Auth=Token\").",
  "\nFlags (Opsional, Input JSON untuk value):",
  "  --method <METHOD>",
  "  --headers '<JSON_HEADERS>' (Prioritas tertinggi untuk headers)",
  "  --params '<JSON_PARAMS>'",
  "  --body '<JSON_BODY_atau_TEKS>' (data_string menimpa --body jika POST/PUT/PATCH)",
  "\nContoh:",
  "  .get google.com q=hello+world",
  "  .fetch POST api.example.com/submit data1=value1&data2=value2 X-Custom-Header=Hello",
  "  .get api.site.com/user/1 --headers '{\"Authorization\":\"Bearer 123\"}'",
  "  .fetch api.site.com/update --method PUT --body '{\"id\":1,\"status\":\"done\"}'"
];
handler.tags = ["internet", "tools"];
handler.command = /^(get|fetch)$/i;
handler.limit = true; 

export default handler;