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
    id: "1421849211699204116",
    label: "Full-Stack Dev",
  },

  {
    id: "1421849210822590524",
    label: "Backend Builder",
  },
  {
    id: "1421849212525613236",
    label: "Bug Slayer",
  },

  {
    id: "1421849116249423913",
    label: "Frontend Wizard",
  },
];
client.on("clientReady", async (c) => {
  try {
    const channel = await client.channels.cache.get("1399726798341931089");
    if (!channel) {
      console.log("Channel not found!");
      return;
    }
    // Split buttons into rows of max 5
    const rows = [];
    for (let i = 0; i < roles.length; i += 5) {
      const row = new ActionRowBuilder();
      roles.slice(i, i + 5).forEach((role) => {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(role.id)
            .setLabel(role.label)
            .setStyle(ButtonStyle.Success)
        );
      });
      rows.push(row);
    }

    await channel.send({
      content: "Claim or remove role",
      components: rows,
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.on("interactionCreate", (interaction) => {});

client.login(process.env.TOKEN);
