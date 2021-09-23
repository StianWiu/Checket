import { DiscordAPIError, Message, MessageEmbed } from "discord.js";
import { parse } from "dotenv";
import { ICommand } from "wokcommands";
import embed from "./embed";

export default {
    category: 'Link',
    description: 'Get screenshot of specified link.',
    slash: false,
    guildOnly: true,
    testOnly: false,
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
            var randomstring = require("randomstring");
            const filename = randomstring.generate();

            const puppeteer = require("puppeteer");

            const capture = async () => {
                const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox']});
                const page = await browser.newPage();
                await page.goto(link);
                await page.screenshot({ path: "./temp/" + filename + ".png" });
                await browser.close();
            };
            capture();

            await new Promise(resolve => setTimeout(resolve, 2500))

            const imgur = require('imgur');
            imgur
            .uploadFile('./temp/' + filename + ".png")
            .then(async (json: any) => {
                await new Promise(resolve => setTimeout(resolve, 2500))
                    const embed = new MessageEmbed()
                        .setTitle(link)
                        .setColor('GREEN')
                        .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                        .setImage(json.link)
                    const newMessage = await message.reply({
                        embeds: [embed]
                    })
                    const fs = require('fs')
                    fs.unlinkSync('./temp/' + filename + ".png")
                    return
                })

        } else {
            const embed = new MessageEmbed()
                .setTitle("Error")
                .setDescription("You did not provide a valid link.")
                .setFooter("Valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                .setColor("RED")
            if (message === undefined) {
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