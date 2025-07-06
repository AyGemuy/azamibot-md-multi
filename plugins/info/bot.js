import os from 'os';

// Fungsi bantuan untuk memformat uptime dari detik menjadi format hari, jam, menit, detik
function formatUptime(seconds) {
    seconds = Number(seconds); // Pastikan input adalah angka
    if (isNaN(seconds) || seconds < 0) return 'Tidak diketahui';

    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let parts = [];
    if (d > 0) parts.push(d + (d === 1 ? " hari" : " hari"));
    if (h > 0) parts.push(h + (h === 1 ? " jam" : " jam"));
    if (m > 0) parts.push(m + (m === 1 ? " menit" : " menit"));
    
    // Selalu tampilkan detik, atau jika uptime 0 detik, tampilkan "0 detik"
    if (s >= 0 && parts.length === 0) { // Jika hanya ada detik (atau uptime 0s)
        parts.push(s + (s === 1 ? " detik" : " detik"));
    } else if (s > 0) { // Jika ada bagian lain, tambahkan detik jika > 0
        parts.push(s + (s === 1 ? " detik" : " detik"));
    }
    
    return parts.length > 0 ? parts.join(', ') : '0 detik'; // Jika parts kosong (seharusnya tidak terjadi dengan logika di atas), default ke 0 detik
}

// Fungsi bantuan untuk memformat byte menjadi KB, MB, GB
function formatBytes(bytes, decimals = 2) {
    if (bytes === undefined || bytes === null || isNaN(Number(bytes))) return 'N/A'; // Penanganan input tidak valid
    bytes = Number(bytes); // Pastikan bytes adalah angka
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

let handler = async (m, { conn }) => {
    const uptimeInSeconds = process.uptime();
    const formattedUptime = formatUptime(uptimeInSeconds);

    // Info Platform
    const platform = os.platform(); // e.g., 'win32', 'linux', 'darwin'
    const type = os.type();         // e.g., 'Windows_NT', 'Linux', 'Darwin'
    const release = os.release();   // Versi Kernel/OS
    const arch = os.arch();         // e.g., 'x64'
    const nodeVersion = process.version; // Versi Node.js

    // Info CPU
    const cpus = os.cpus();
    const cpuModel = cpus.length > 0 ? cpus[0].model : "Tidak diketahui";
    const cpuCores = cpus.length;
    
    // Info Memori Sistem (RAM)
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // Info Memori Proses Node.js
    const memoryUsageNode = process.memoryUsage();

    // Menyusun teks respons
    let responseText = `*📊 STATISTIK SERVER & BOT 📊*\n\n`;

    responseText += `*🕒 Uptime Bot:*\n`;
    responseText += `\`\`\`${formattedUptime}\`\`\`\n\n`;

    responseText += `*💻 Info Platform:*\n`;
    responseText += ` • *OS:* \`\`\`${type} (${platform})\`\`\`\n`;
    responseText += ` • *Rilis:* \`\`\`${release}\`\`\`\n`;
    responseText += ` • *Arsitektur:* \`\`\`${arch}\`\`\`\n`;
    responseText += ` • *Node.js:* \`\`\`${nodeVersion}\`\`\`\n\n`;

    responseText += `*⚙️ Info CPU:*\n`;
    responseText += ` • *Model:* \`\`\`${cpuModel}\`\`\`\n`;
    responseText += ` • *Jumlah Core:* \`\`\`${cpuCores}\`\`\`\n\n`;
    
    responseText += `*💾 Memori Sistem (RAM):*\n`;
    responseText += ` • *Total:* \`\`\`${formatBytes(totalMemory)}\`\`\`\n`;
    responseText += ` • *Terpakai:* \`\`\`${formatBytes(usedMemory)}\`\`\`\n`;
    responseText += ` • *Bebas:* \`\`\`${formatBytes(freeMemory)}\`\`\`\n\n`;

    responseText += `*🧠 Memori Proses (Node.js):*\n`;
    responseText += ` • *RSS:* \`\`\`${formatBytes(memoryUsageNode.rss)}\`\`\`\n`; // Resident Set Size
    responseText += ` • *Heap Total:* \`\`\`${formatBytes(memoryUsageNode.heapTotal)}\`\`\`\n`;
    responseText += ` • *Heap Digunakan:* \`\`\`${formatBytes(memoryUsageNode.heapUsed)}\`\`\`\n`;
    responseText += ` • *Eksternal:* \`\`\`${formatBytes(memoryUsageNode.external)}\`\`\`\n\n`; // Memori yang digunakan oleh objek C++ & buffer
    
    // Footer dengan timestamp
    // Anda bisa menyesuaikan timezone jika diperlukan
    responseText += `---------------------\n`;
    responseText += `✨ _Informasi diambil pada ${new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'long', timeZone: 'Asia/Jakarta' })} WIB_ ✨`;


    // Mengirim balasan
    await conn.reply(m.chat, responseText.trim(), m);
};

// Definisi handler untuk bot
handler.help = ['status', 'uptime', 'runtime', 'infobot', 'botstatus'];
handler.tags = ['info', 'tools'];
handler.command = /^(status|uptime|runtime|infobot|botstatus)$/i; // Regex untuk mencocokkan perintah
handler.limit = false; // Biasanya perintah info tidak memerlukan limit

export default handler;