"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});
client.on('ready', function () {
    console.log('Bot has started');
    // Settings for WOKCommands.
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['715215005812785182'],
        disabledDefaultCommands: [
            'channelonly',
            'command',
            'language',
            'prefix',
            'requiredrole',
            'slash',
            'help',
        ]
    })
        .setDefaultPrefix('?');
});
client.login(process.env.TESTTOKEN);
// const guildId = '715215005812785182'
// const guild = client.guilds.cache.get(guildId)
// let commands
// if (guild) {
//     commands = guild.commands
// } else {
//     commands = client.application?.commands
// }
// commands?.create({
//     name: 'ping',
//     description: 'Replies with pong',
// })
// commands?.create({
//     name: 'add',
//     description: 'Adds two number.',
//     options: [
//         {
//             name: 'num1',
//             description: 'The first number',
//             required: true,
//             type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
//         },
//         {
//             name:  'num2',
//             description: 'The second number',
//             required: true,
//             type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
//         }
//     ]
// })
// Old way to use slashcommands
// client.on('interactionCreate', async (interaction) =>  {
//     if (!interaction.isCommand()) {
//         return;
//     }
//     const { commandName, options } = interaction
//     if (commandName === 'ping') {
//         interaction.reply({
//             content: 'pong',
//             ephemeral: true,
//         })
//     } else if (commandName === 'add') {
//         const num1 = options.getNumber('num1')!
//         const num2 = options.getNumber('num2')!
//         await interaction.deferReply({
//             ephemeral: true,
//         })
//         await new Promise(resolve => setTimeout(resolve, 5000))
//         await interaction.editReply({
//             content: `The sum is ${num1 + num2}`,
//         })
//     }
// })
