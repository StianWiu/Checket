import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Sends a embed',

    permissions: ['ADMINISTRATOR'],

    callback: async ({message, text}) => {
        const embed = new MessageEmbed()
        .setDescription("Hello World")
        .setTitle("Title")
        .setColor("BLUE")
        .setAuthor("Pignuuu")
        .setFooter("Footer")
        .addFields([{
            name: "name",
            value: "value"
        },
        {
            name: "name2",
            value: "value2"
        }])

        const newMessage = await message.reply({
            embeds: [embed]
        })

        await new Promise(resolve => setTimeout(resolve, 5000))

        const newEmbed = newMessage.embeds[0]
        newEmbed.setTitle("edited title")
        newMessage.edit({
            embeds:[newEmbed],
        })
    }
} as ICommand