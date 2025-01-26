import * as os from "os";
import chalk from "chalk";
import db, {
  loadDatabase
} from "./database.js";
import fs from "fs";
import Helper from "./helper.js";
import importFile from "./import.js";
import open from "open";
import P from "pino";
import path, {
  resolve
} from "path";
import readline from "readline";
import storeSystem from "./store.js";
import {
  fileURLToPath
} from "url";
import {
  HelperConnection
} from "./simple.js";
const {
  default: makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} = (await import("@whiskeysockets/baileys")).default;
const Device = os.platform() === "win32" ? "Windows" : os.platform() === "darwin" ? "MacOS" : "Linux";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ""}sessions`);
const authFile = `${Helper.opts._[0] || "session"}.data.json`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = text => new Promise(resolve => rl.question(text, resolve));
const usePairingCode = Helper.opts["pairing"];
let [isCredsExist, isAuthSingleFileExist, authState] = await Promise.all([Helper.checkFileExists(authFolder + "/creds.json"), Helper.checkFileExists(authFile), useMultiFileAuthState(authFolder)]);
const store = storeSystem.makeInMemoryStore();
const storeFile = `${Helper.opts._[0] || "data"}.store.json`;
store.readFromFile(storeFile);
const logger = P({
  timestamp: () => `,"time":"${new Date().toJSON()}"`,
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true
    }
  }
}).child({
  class: "baileys"
});
const connectionOptions = {
  printQRInTerminal: !usePairingCode,
  syncFullHistory: false,
  auth: authState.state
};
let conns = new Map();
async function start(oldSocket = null, opts = {
  store: store,
  logger: logger,
  authState: authState
}) {
  let {
    version,
    isLatest
  } = await fetchLatestBaileysVersion();
  console.log(chalk.magenta(`-- using WA v${version.join(".")}, isLatest: ${isLatest} --`));
  let conn = await makeWASocket({
    version: version,
    ...connectionOptions,
    ...opts.connectionOptions,
    logger: opts.logger,
    auth: opts.authState.state,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: false,
    defaultQueryTimeoutMs: undefined,
    browser: [Device, "Chrome", "20.0.04"]
  });
  HelperConnection(conn, {
    store: opts.store,
    logger: logger
  });
  if (oldSocket) {
    conn.isInit = oldSocket.isInit;
    conn.isReloadInit = oldSocket.isReloadInit;
  }
  if (conn.isInit == null) {
    conn.isInit = false;
    conn.isReloadInit = true;
  }
  store.bind(conn.ev, {
    groupMetadata: conn.groupMetadata
  });
  if (usePairingCode && isCredsExist && !conn.authState.creds.registered) {
    console.log(chalk.yellow("-- WARNING: creds.json is broken, please delete it first --"));
    process.exit(0);
  }
  if (usePairingCode && !conn.authState.creds.registered) {
    const {
      registration
    } = {
      registration: {}
    };
    const PHONE_CC = await (await fetch("https://raw.githubusercontent.com/clicknetcafe/Databasee/refs/heads/master/data/countryphonecode.json")).json();
    let phoneNumber = "";
    do {
      phoneNumber = await question(chalk.blueBright("ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n"));
    } while (!PHONE_CC.map(v => v.code).some(v => phoneNumber.startsWith(v)));
    rl.close();
    phoneNumber = phoneNumber.replace(/\D/g, "");
    console.log(chalk.bgWhite(chalk.blue("-- Please wait, generating code... --")));
    setTimeout(async () => {
      let code = await conn.requestPairingCode(phoneNumber);
      code = code?.match(/.{1,4}/g)?.join("-") || code;
      console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)));
    }, 3e3);
  }
  await reload(conn, false, opts).then(success => console.log("- bind handler event -", success));
  return conn;
}
let OldHandler = null;
async function reload(conn, restartConnection, opts = {
  store: store,
  logger: logger,
  authState: authState
}) {
  if (!opts.handler) opts.handler = importFile(Helper.__filename(resolve("./handler.js"))).catch(console.error);
  if (opts.handler instanceof Promise) opts.handler = await opts.handler;
  if (!opts.handler && OldHandler) opts.handler = OldHandler;
  OldHandler = opts.handler;
  const isReloadInit = !!conn.isReloadInit;
  if (restartConnection) {
    try {
      conn.ws.close();
    } catch {}
    conn.ev.removeAllListeners();
    Object.assign(conn, await start(conn, opts) || {});
  }
  Object.assign(conn, getMessageConfig());
  if (!isReloadInit) {
    if (conn.handler) conn.ev.off("messages.upsert", conn.handler);
    if (conn.participantsUpdate) conn.ev.off("group-participants.update", conn.participantsUpdate);
    if (conn.groupsUpdate) conn.ev.off("groups.update", conn.groupsUpdate);
    if (conn.onDelete) conn.ev.off("messages.delete", conn.onDelete);
    if (conn.connectionUpdate) conn.ev.off("connection.update", conn.connectionUpdate);
    if (conn.credsUpdate) conn.ev.off("creds.update", conn.credsUpdate);
  }
  if (opts.handler) {
    conn.handler = opts.handler.handler.bind(conn);
    conn.participantsUpdate = opts.handler.participantsUpdate.bind(conn);
    conn.groupsUpdate = opts.handler.groupsUpdate.bind(conn);
    conn.onDelete = opts.handler.deleteUpdate.bind(conn);
  }
  if (!opts.isChild) conn.connectionUpdate = connectionUpdate.bind(conn, opts);
  conn.credsUpdate = opts.authState.saveCreds.bind(conn);
  conn.ev.on("messages.upsert", conn.handler);
  conn.ev.on("group-participants.update", conn.participantsUpdate);
  conn.ev.on("groups.update", conn.groupsUpdate);
  conn.ev.on("messages.delete", conn.onDelete);
  if (!opts.isChild) conn.ev.on("connection.update", conn.connectionUpdate);
  conn.ev.on("creds.update", conn.credsUpdate);
  conn.isReloadInit = false;
  return true;
}
async function connectionUpdate(opts, update) {
  const {
    connection,
    lastDisconnect,
    isNewLogin
  } = update;
  const code = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
  if (connection === "close") {
    if (code) {
      try {
        console.log("- Connection Closed, Reconnecting -");
        await reload(this, true, opts);
        global.timestamp.connect = new Date();
      } catch (e) {
        console.log("-- ERROR LOG --");
        console.log(e);
      }
    } else {
      console.log(chalk.red("-- Device loggedOut --"));
      process.exit(0);
    }
  } else if (connection == "open") console.log("- opened connection -");
  if (db.data == null) loadDatabase();
}

function getMessageConfig() {
  const welcome = "Hai, @user!\nSelamat datang di grup @subject\n\n@desc";
  const bye = "Selamat tinggal @user!";
  const spromote = "@user sekarang admin!";
  const sdemote = "@user sekarang bukan admin!";
  const sDesc = "Deskripsi telah diubah ke \n@desc";
  const sSubject = "Judul grup telah diubah ke \n@subject";
  const sIcon = "Icon grup telah diubah!";
  const sRevoke = "Link group telah diubah ke \n@revoke";
  return {
    welcome: welcome,
    bye: bye,
    spromote: spromote,
    sdemote: sdemote,
    sDesc: sDesc,
    sSubject: sSubject,
    sIcon: sIcon,
    sRevoke: sRevoke
  };
}
const conn = start(null, {
  store: store,
  logger: logger,
  authState: authState
}).catch(console.error);
export default {
  start: start,
  reload: reload,
  conn: conn,
  conns: conns,
  logger: logger,
  connectionOptions: connectionOptions,
  authFolder: authFolder,
  storeFile: storeFile,
  authState: authState,
  store: store,
  getMessageConfig: getMessageConfig
};
export {
  conn,
  conns,
  logger
};