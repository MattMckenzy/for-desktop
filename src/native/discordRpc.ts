import { Client } from "discord-rpc";

import { config } from "./config";

// internal state
let rpc: Client;

export async function initDiscordRpc() {
  if (!config.discordRpc) return;

  try {
    rpc = new Client({ transport: "ipc" });

    rpc.on("ready", () =>
      rpc.setActivity({
        state: "stoat.ctfam.ca",
        details: "Chatting with others",
        largeImageKey: "qr",
        // largeImageText: "Communication is critical – use Revolt.",
        largeImageText: "Communication is critical – use Stoat (CTFAM)",
        buttons: [
          {
            label: "Join Stoat (CTFAM)",
            url: "https://stoat.ctfam.ca/",
          },
        ],
      }),
    );

    rpc.on("disconnected", reconnect);

    rpc.login({ clientId: "872068124005007420" });
  } catch (err) {
    reconnect();
  }
}

const reconnect = () => setTimeout(() => initDiscordRpc(), 1e4);

export async function destroyDiscordRpc() {
  rpc?.destroy();
}
