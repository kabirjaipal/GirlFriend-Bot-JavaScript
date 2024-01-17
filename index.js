const { addSpeechEvent, SpeechEvents } = require("discord-speech-recognition");
const {
  Client,
  GatewayIntentBits,
  ApplicationCommandType,
} = require("discord.js");
const { getAudioUrl } = require("google-tts-api");
const config = require("./config");
const { default: DisTube } = require("distube");
const axios = require("axios").default;

const client = new Client({
  intents: [
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
  ],
});

addSpeechEvent(client);

const distube = new DisTube(client, {
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  directLink: true,
  searchCooldown: 0,
});

client.on("ready", async () => {
  console.log(`${client.user.username} is Online !!`);
  await client.application.commands.set([]);
  client.guilds.cache.get("903532162236694539").commands.set([
    {
      name: "join",
      description: `join your voice channel`,
      type: ApplicationCommandType.ChatInput,
    },
  ]);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot || !interaction.guild) return;
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: true }).catch(null);
    switch (interaction.commandName) {
      case "join":
        {
          const voiceChannel = interaction.member?.voice.channel;
          if (!voiceChannel)
            return interaction
              .followUp({
                content: "You Need To Join Voice Channel",
                ephemeral: true,
              })
              .catch(null);
          if (voiceChannel) {
            // joinVoiceChannel({
            //   channelId: voiceChannel.id,
            //   guildId: voiceChannel.guild.id,
            //   adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            //   selfDeaf: false,
            // });
            await distube.voices.join(voiceChannel);
          }
          interaction
            .followUp({
              content: `Joined ${voiceChannel}`,
              ephemeral: true,
            })
            .catch(null);
        }
        break;

      default:
        break;
    }
  }
});

client.on(SpeechEvents.speech, async (message) => {
  // start
  let string = message.content;
  console.log(string);
  if (string == undefined || string == "") return;

  // Chatbot API (Vercel)
  const vercelUrl = `https://chatbot-api.vercel.app/api/?message=${encodeURIComponent(
    string
  )}`;

  // AffiliatePlus API
  const affiliatePlusUrl = `https://api.affiliateplus.xyz/api/chatbot?message=${string}&botname=${
    client.user.username
  }&ownername=${"tech boy"}&user=${"kabu"}`;

  const { data } = await axios.get(vercelUrl);
  data?.message?.replace("uck", "fuck");
  const stream = await getAudioUrl(String(data?.message), {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
  });

  console.log(stream);

  let voiceChannel =
    message.member.voice.channel || message.guild.members.me.voice.channel;

  await distube.play(voiceChannel, stream);
});

client.on("error", (err) => {
  console.log(err.message);
});

distube.on("disconnect", async (queue) => {
  distube.voices.join(queue.voiceChannel);
});

client.login(config.TOKEN);
