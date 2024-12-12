import fetch from "node-fetch";
class ReelSaveTera {
  async down(videoUrl) {
    try {
      const response = await fetch(
        `https://cors-flame.vercel.app/api/cors?url=https://tera.instavideosave.com/?url=${videoUrl}`,
        {
          method: "GET",
        },
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const json = await response.json();
      return {
        medias: json.video.map((v) => ({
          text: v.name,
          url: v.video,
          quality: v.name,
        })),
      };
    } catch (error) {
      console.error("Error in ReelSaveTera down:", error);
      throw error;
    }
  }
}
const saveTera = new ReelSaveTera();

const saveT = async (videoUrl) => {
  try {
    return await saveTera.down(videoUrl);
  } catch (error) {
    console.error("Error during download:", error);
    throw error;
  }
};

export default saveT;
