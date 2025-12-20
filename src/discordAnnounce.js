// Discord announce utility for PM2-friendly server
import { Client, GatewayIntentBits } from "discord.js";
import { EmbedBuilder } from "discord.js";

// --- Discord Bot Setup ---
// Add these to your .env file or environment variables:
// DISCORD_TOKEN=<your bot token>
// DISCORD_STAFF_CHANNEL_ID=<staff channel id>
// DISCORD_ANNOUNCE_CHANNEL_ID=<announcements channel id>
// DISCORD_ALLOWED_USER_IDS=<comma separated user ids>
// DISCORD_GUILD_ID=<your server (guild) id>

const STAFF_CHANNEL_ID = process.env.DISCORD_STAFF_CHANNEL_ID;
const ANNOUNCE_CHANNEL_ID = process.env.DISCORD_ANNOUNCE_CHANNEL_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const ALLOWED_USER_IDS = (process.env.DISCORD_ALLOWED_USER_IDS || "").split(",").map(x => x.trim()).filter(Boolean);
const GUILD_ID = process.env.DISCORD_GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

let readyPromise;

// Listen for '!restart' command in staff channel, only on the specified guild
client.on("messageCreate", async (msg) => {
  if (
    msg.guild && msg.guild.id === GUILD_ID &&
    msg.channel.id === STAFF_CHANNEL_ID &&
    msg.content.trim() === "!restart" &&
    ALLOWED_USER_IDS.includes(msg.author.id)
  ) {
    await msg.reply("Restarting site...");
    sendStaffLog(`Restart requested by ${msg.author.tag} (${msg.author.id})`).catch(() => {});
    process.exit(1); // PM2 will auto-restart
  } else if (
    msg.guild && msg.guild.id === GUILD_ID &&
    msg.channel.id === STAFF_CHANNEL_ID &&
    msg.content.trim() === "!restart"
  ) {
    await msg.reply("You do not have permission to restart the site.");
  }
});

function sendToChannel(channelId, message) {
  if (!client.isReady()) return Promise.reject("Discord client not ready");
  // Restrict to specific guild
  const guild = client.guilds.cache.get(GUILD_ID);
  if (!guild) return Promise.reject("Guild not found or bot not in guild");
  const channel = guild.channels.cache.get(channelId);
  if (!channel) return Promise.reject("Channel not found in guild");
  return channel.send(message);
// Announce site up with a nice embed
function announceUp() {
  const embed = new EmbedBuilder()
    .setColor(0x8000ff)
    .setTitle('arcade.wtf Site Status')
    .setDescription('✅ **Site is now up and running!**')
    .addFields(
      { name: 'Status', value: 'Online', inline: true },
      { name: 'Time', value: `<t:${Math.floor(Date.now()/1000)}:F>`, inline: true }
    )
    .setFooter({ text: 'arcade.wtf notifications', iconURL: 'https://suntree-net.works/images/nreds.png' });
  return sendToChannel(ANNOUNCE_CHANNEL_ID, { embeds: [embed] });
}
}

export { discordReady, announceUp, sendStaffLog };