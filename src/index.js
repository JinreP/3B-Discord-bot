require("dotenv").config();

const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "Hello") {
    message.reply("Hello World");
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Sup? ");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("Pong!");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`The sum of the 2 numbers is : ${num1 + num2} `);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("🌲 Welcome to 3B — Pinecone Academy Bootcamp")

      .setAuthor({
        name: "3B",
        iconURL:
          "https://media.discordapp.net/attachments/1399683254977822768/1421840614382768238/pinecone-logo.jpg?ex=68da7fc2&is=68d92e42&hm=981a64f09f401fcf144ca04d8dd5f010f80901e90e5d24d97c46c466b096bc9c&=&format=webp&width=1554&height=1554",
        url: "https://discord.js.org",
      })

      .setDescription(
        `Hey 3B coders! 👋
This is our home for learning JavaScript, React, HTML & CSS together.
Ask questions, share progress, help each other grow, and get ready for the hackathon at the end of bootcamp! 🚀`
      )
      .setThumbnail(
        "https://media.discordapp.net/attachments/1399683254977822768/1421841271491662007/500708558_1140204068136711_6095202482495404495_n.png?ex=68da805f&is=68d92edf&hm=9e631c0b202d202783443859218758182aca4c58096f2aad30d6a91b2129fb36&=&format=webp&quality=lossless&width=2928&height=1286"
      )
      .addFields(
        {
          name: "🗓️ Schedule",
          value:
            "Classes run Monday – Friday. Check announcements for exact times & special events.",
        },
        { name: "\u200B", value: "\u200B" },
        {
          name: "💻 Tech Stack",
          value:
            "- JavaScript (ES6+)\n- React & Next.js\n- HTML5 + CSS3\n- Git & GitHub",
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "💬 Class Rules",
          value:
            "1) Be respectful & supportive.\n2) Ask questions — no shame in learning!\n3) Share resources & wins.\n4) Keep channels on topic.",
          inline: true,
        }
      )

      .addFields({
        name: "👩‍🏫 Teachers' GitHub",
        value:
          "[Any Bagsh](https://github.com/andyerdene)\n[Teacher B](https://github.com/batmunkh0612)",
        inline: true,
      })
      .setImage(
        "https://media.discordapp.net/attachments/1399683254977822768/1421841271491662007/500708558_1140204068136711_6095202482495404495_n.png?ex=68da805f&is=68d92edf&hm=9e631c0b202d202783443859218758182aca4c58096f2aad30d6a91b2129fb36&=&format=webp&quality=lossless&width=2928&height=1286"
      )
      .setTimestamp()
      .setFooter({
        text: "Stay curious and keep building 💻✨ — 3B Pinecone Academy",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });
    message.channel.send({ embeds: [embed] });
  }
});
client.on("interactionCreate", async (interaction) => {
  try {
    // Only run for button interactions
    if (!interaction.isButton()) return;

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      return interaction.reply({
        content: "I couldn't find that role",
        ephemeral: true,
      });
    }

    // Defer reply first (ephemeral)
    await interaction.deferReply({ ephemeral: true });

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`Removed the role **${role.name}** ✅`);
    } else {
      await interaction.member.roles.add(role);
      await interaction.editReply(`Added the role **${role.name}** ✅`);
    }
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
