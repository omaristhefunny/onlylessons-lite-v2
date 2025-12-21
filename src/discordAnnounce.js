import { exec } from "node:child_process";
import crypto from "crypto";
import http from "node:http";
import { Client, GatewayIntentBits } from "discord.js";
import { EmbedBuilder } from "discord.js";
const STAFF_CHANNEL_ID = process.env.DISCORD_STAFF_CHANNEL_ID;
const ANNOUNCE_CHANNEL_ID = process.env.DISCORD_ANNOUNCE_CHANNEL_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const ALLOWED_USER_IDS = (process.env.DISCORD_ALLOWED_USER_IDS || "").split(",").map(x => x.trim()).filter(Boolean);
const GUILD_ID = process.env.DISCORD_SERVER_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let readyPromise;

function discordReady() {
  if (!readyPromise) {
    readyPromise = new Promise((resolve, reject) => {
      client.once("clientReady", () => {
        // Only start listening for messages after ready
        client.on("messageCreate", async (msg) => {
          if (
            msg.guild && msg.guild.id === GUILD_ID &&
            msg.channel.id === STAFF_CHANNEL_ID &&
            msg.content.trim() === "sn!restart" &&
            ALLOWED_USER_IDS.includes(msg.author.id)
          ) {
            await msg.reply("restarting... plese wait a moment :3");
            sendStaffLog(`Restart requested by ${msg.author.tag} (${msg.author.id})`).catch(() => {});
            process.exit(1);
          } else if (
            msg.guild && msg.guild.id === GUILD_ID &&
            msg.channel.id === STAFF_CHANNEL_ID &&
            msg.content.trim() === "sn!restart"
          ) {
            await msg.reply("hey twin, what the FUCK are you trying to do?");
          } else if (
            msg.guild && msg.guild.id === GUILD_ID &&
            msg.channel.id === STAFF_CHANNEL_ID &&
            msg.content.startsWith("sn!shutdown") &&
            ALLOWED_USER_IDS.includes(msg.author.id)
          ) {
            const reason = msg.content.slice("sn!shutdown".length).trim() || "No reason provided.";
            await msg.reply("shutting down... cya soon :3");
            await announceShutdown(msg.author, reason);
            process.exit(0);
          } else if (
            msg.guild && msg.guild.id === GUILD_ID &&
            msg.channel.id === STAFF_CHANNEL_ID &&
            msg.content.startsWith("sn!shutdown")
          ) {
            await msg.reply("no shutdown for you!");
          }
        });
// Announce shutdown to the announcements channel
function announceShutdown(author, reason) {
  if (process.env.NODE_APP_INSTANCE !== '0') return Promise.resolve();
  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle('suntree-network status')
    .setDescription('❌ **site is shutting down!**')
    .addFields(
      { name: 'Status', value: 'Offline', inline: true },
      { name: 'Time', value: `<t:${Math.floor(Date.now()/1000)}:F>`, inline: true },
      { name: 'By', value: `${author.tag} (${author.id})`, inline: false },
      { name: 'Reason', value: reason, inline: false }
    )
    .setFooter({ text: 'suntree-network notifications', iconURL: 'https://suntree-net.works/images/nreds.png' });
  // Ping the role in the message content
  const rolePing = '<@&1451592873991737476>';
  return sendToChannel(ANNOUNCE_CHANNEL_ID, { content: rolePing, embeds: [embed], allowedMentions: { roles: ['1451592873991737476'] } })
    .then(() => {
      // Send shutdown request to manager
      const hash = process.env.SHUTDOWN_SECRET;
      console.log('[DiscordBot] Sending shutdown request to manager with hash:', hash);
      const req = http.request({
        hostname: '127.0.0.1',
        port: 8765,
        path: '/shutdown',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }, res => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          console.log('[DiscordBot] Shutdown manager response:', data);
        });
      });
      req.on('error', err => {
        console.error('[DiscordBot] Error contacting shutdown manager:', err);
      });
      req.write(JSON.stringify({ hash }));
      req.end();
    });
}

        // Status/activity cycling
        const statuses = ["online", "idle", "dnd"];
        const activities = [
          { name: "a sleeping competition", type: 3 }, // Competing
          { name: "#general", type: 3 }, // Watching
          { name: "you sleep", type: 3 }, // Watching
        ];
        let statusIndex = 0;
        let activityIndex = 0;
        setInterval(() => {
          client.user.setStatus(statuses[statusIndex]);
          statusIndex = (statusIndex + 1) % statuses.length;
        }, 10000); // Switch status every 10s
        setInterval(() => {
          client.user.setActivity(activities[activityIndex]);
          activityIndex = (activityIndex + 1) % activities.length;
        }, 10000); // Switch activity every 10s

        resolve();
      });
      client.once("error", reject);
      client.login(DISCORD_TOKEN).catch(reject);
    });
  }
  return readyPromise;
}




function sendToChannel(channelId, message) {
  if (!client.isReady()) return Promise.reject("Discord client not ready");

  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) return Promise.reject("Guild not found or bot not in guild");
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return Promise.reject("Channel not found in guild");
  return channel.send(message);
}


function announceUp() {
  const embed = new EmbedBuilder()
    .setColor(0x8000ff)
    .setTitle('suntree-network status')
    .setDescription(' **site is now up and running!**')
    .addFields(
      { name: 'Status', value: 'Online', inline: true },
      { name: 'Time', value: `<t:${Math.floor(Date.now()/1000)}:F>`, inline: true }
    )
    .setFooter({ text: 'suntree-network notifications', iconURL: 'https://suntree-net.works/images/nreds.png' });
  return sendToChannel(ANNOUNCE_CHANNEL_ID, { embeds: [embed] });
}

function sendStaffLog(log) {
  return sendToChannel(STAFF_CHANNEL_ID, `running now. ${log}`);
}

export { discordReady, announceUp, sendStaffLog };