import path from "path";
import storeSystem from "./store.js";
import Helper from "./helper.js";
import {
  HelperConnection
} from "./simple.js";
import importFile from "./import.js";
import db, {
  loadDatabase
} from "./database.js";
import single2multi from "./single2multi.js";
import P from "pino";
import pretty from "pino-pretty";
const {
  DisconnectReason,
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore
} = (await import("@whiskeysockets/baileys")).default;
const authFolder = storeSystem.fixFileName(`${Helper.opts._[0] || ""}sessions`);
const authFile = `${Helper.opts._[0] || "session"}.data.json`;
let [isCredsExist, isAuthSingleFileExist, authState] = await Promise.all([Helper.checkFileExists(authFolder + "/creds.json"), Helper.checkFileExists(authFile), useMultiFileAuthState(authFolder)]);
const store = storeSystem.makeInMemoryStore();
if (Helper.opts["singleauth"] || Helper.opts["singleauthstate"]) {
  if (!isCredsExist && isAuthSingleFileExist) {
    console.debug("- singleauth -", "creds.json not found", "compiling singleauth to multiauth...");
    await single2multi(authFile, authFolder, authState);
    console.debug("- singleauth -", "compiled successfully");
    authState = await useMultiFileAuthState(authFolder);
  } else if (!isAuthSingleFileExist) console.error("- singleauth -", "singleauth file not found");
}
const storeFile = `${Helper.opts._[0] || "data"}.store.json`;
store.readFromFile(storeFile);
const logger = P({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:standard"
    }
  }
}).child({
  class: "baileys"
});
const connectionOptions = {
  printQRInTerminal: !Helper.opts["pair"],
  syncFullHistory: false,
  generateHighQualityLinkPreview: true,
  markOnlineOnConnect: false,
  defaultQueryTimeoutMs: undefined,
  auth: {
    creds: authState.state,
    keys: makeCacheableSignalKeyStore(authState.state.keys, logger)
  },
  logger: logger
};
let conns = new Map();
async function start(oldSocket = null, opts = {
  store: store,
  logger: logger,
  authState: authState
}) {
  let conn = makeWASocket({
    ...connectionOptions,
    ...opts.connectionOptions,
    logger: opts.logger,
    auth: opts.authState.state,
    getMessage: async key => (opts.store.loadMessage(key.remoteJid, key.id) || opts.store.loadMessage(key.id) || {}).message || {
      conversation: "Please send messages again"
    }
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
  await reload(conn, false, opts).then(success => console.log("- bind handler event -", success));
  return conn;
}
let OldHandler = null;
async function reload(conn, restartConnection, opts = {
  store: store,
  authState: authState
}) {
  if (!opts.handler) opts.handler = importFile(Helper.__filename(path.resolve("./handler.js"))).catch(console.error);
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
  opts.logger?.info(update);
  const {
    connection,
    lastDisconnect,
    isNewLogin
  } = update;
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
  if (code && code !== DisconnectReason.loggedOut && this?.ws.readyState !== 0) {
    console.log(await reload(this, true, opts).catch(console.error));
    global.timestamp.connect = new Date();
  }
  if (connection == "open") console.log("- opened connection -");
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