import axios from "axios";
async function DescribeMyImage(buffer) {
  buffer = await (await axios.get(buffer)).data;
  try {
    const { data: Sig } = await axios.post(
      "https://pallyy.com/api/images/getUploadURL",
    );
    const { url, sasString, blobName } = Sig;
    const UploadURL = `${url}captions/${blobName}?${sasString}`;
    await axios.put(UploadURL, buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "x-ms-blob-type": "BlockBlob",
        "x-ms-blob-content-type": "image/jpeg",
      },
    });
    const AnalyzeURL = `https://pallyy.com/api/images/analysis`;
    const { data: Analyze } = await axios.post(AnalyzeURL, {
      blobName: blobName,
    });
    const DescribeURL = `https://pallyy.com/api/images/description`;
    const tags = Analyze.tagsResult.values;
    const { data: Describe } = await axios.post(DescribeURL, {
      analysis: Analyze,
    });
    return {
      q: Describe[0],
      tags: tags,
    };
  } catch (e) {
    return {
      error: e.message,
      timestamp: Date.now(),
      service: "DescribeMyImage",
      route: "describe",
      method: "post",
    };
  }
}
export default DescribeMyImage;
