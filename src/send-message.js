require("dotenv").config();

const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});
const roles = [
  {
    id: "1421850079492313248",
    label: "test",
  },

  {
    id: "1421850088258670672",
    label: "sda",
  },
];
client.on("clientReady", async (c) => {
  try {
    const channel = await client.channels.cache.get("1399683254977822765");
    if (!channel) {
      console.log("Channel not found!");
      return;
    }
    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Success)
      );
    });

    await channel.send({
      content: "Claim or remove role",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.on("interactionCreate", (interaction) => {});

client.login(process.env.TOKEN);
