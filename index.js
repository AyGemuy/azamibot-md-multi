import express from 'express';
import { displayTitle } from "./lib/src/print.js";
import { loadPlugins } from "./lib/plugins.js";
import clearTmp from "./lib/src/clearTmp.js";
import connectSock from "./lib/connection.js";

const app = express();
const port = 3000;

displayTitle();

async function start() {
  console.log("Memulai proses loading plugin...");
  try {
    await loadPlugins({ table: true });
    console.log("Plugin berhasil dimuat.");
  } catch (error) {
    console.error("Gagal memuat plugin:", error);
  }

  console.log("Menyiapkan pembersihan sementara...");
  setInterval(
    async () => {
      await clearTmp();
      console.log("Sampah sementara dibersihkan.");
    },
    1 * 60 * 1000,
  );

  console.log("Mencoba menghubungkan soket...");
  await connectSock().catch((e) => {
    console.error("Gagal menghubungkan soket:", e);
  });
}

// Mulai server Express tanpa menunggu `start()` selesai
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});

// Jalankan `start()` secara asinkron dan tangani errornya
start().catch(console.error);

process.on("uncaughtException", console.error);
