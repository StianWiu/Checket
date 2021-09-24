import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [ //Specify what intents bot requires.
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})

client.on('ready', () => {
    console.log('Bot has started')

// Settings for WOKCommands.

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: false, //This should be false when deploying to server. Only true when not using compiler.
        testServers: ['715215005812785182'], //Chooses what server to directly deploy /commands to.
        disabledDefaultCommands: [ //Disable commands that come pre made with WOKCommands.
            'channelonly',
            'command',
            'language',
            'prefix',
            'requiredrole',
            'slash',
            'help',
        ]
    })
    .setDefaultPrefix('!')
    .setBotOwner('283331663482585088')
})

client.login(process.env.TOKEN)



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
