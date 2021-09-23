import { Message, MessageEmbed } from "discord.js";
import { parse } from "dotenv";
import { ICommand } from "wokcommands";
import embed from "./embed";
import captureWebsite from 'capture-website';

export default {
    category: 'Link',
    description: 'Get screenshot of specified link.',
    slash: "both",
    guildOnly: true,
    testOnly: true,
    options: [
        {
            required: true,
            name: "link",
            description: "Link that you want to check.",
            type: "STRING",
        }
    ],

    callback: async ({ args, message }) => {
        const link = (args[0])
        if (link.startsWith("http://", 0) || link.startsWith("https://", 0)) {

            captureWebsite.file('https://sindresorhus.com', 'screenshot.png');

            const embed = new MessageEmbed()
                .setTitle(link)
                .setColor('GREEN')
                .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
            return embed

    } else {
        const embed = new MessageEmbed()
            .setTitle("Error")
            .setDescription("You did not provide a valid link.")
            .setFooter("Valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
            .setColor("RED")
                if(message === undefined) {
    return embed
} else {
    const newMessage = await message.reply({
        embeds: [embed]
    })
    await new Promise(resolve => setTimeout(resolve, 5 * 1000))
    newMessage.delete()
}

        }
    }
} as ICommand