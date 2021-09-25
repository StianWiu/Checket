import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
import WOKCommands from "wokcommands";
import path from "path";
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    //Specify what intents bot requires.
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log("Bot has started");

  // Settings for WOKCommands.

  new WOKCommands(client, {
    commandsDir: path.join(__dirname, "commands"),
    typeScript: false, //This should be false when deploying to server. Only true when not using compiler.
    testServers: ["715215005812785182"], //Chooses what server to directly deploy /commands to.
    disabledDefaultCommands: [
      //Disable commands that come pre made with WOKCommands.
      "channelonly",
      "command",
      "language",
      "prefix",
      "requiredrole",
      "slash",
      "help",
    ],
  }).setDefaultPrefix("!");
});

client.login(process.env.TOKEN);
