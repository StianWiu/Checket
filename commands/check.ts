import { MessageEmbed } from "discord.js";
import { parse } from "dotenv";
import { ICommand } from "wokcommands";

export default {
    category: 'Link',
    description: 'Get screenshot of specified link.',
    slash: false,
    guildOnly: true,

    callback: async ({ args, message }) => {
        // Check if input fits required format.
        const link = (args[0])
        if (link.startsWith("http://", 0) || link.startsWith("https://", 0)) {
            message.channel.sendTyping();
            var randomstring = require("randomstring");
            const filename = randomstring.generate();
            // Use puppeteer to grab screenshot of specified url
            const puppeteer = require("puppeteer");
            const capture = async () => {
                const browser = await puppeteer.launch({ defaultViewport: { width: 1920, height: 1080 }, headless: true, args: ['--no-sandbox'] });
                const page = await browser.newPage();
                await page.goto(link);
                message.channel.sendTyping();
                await new Promise(resolve => setTimeout(resolve, 5000))
                message.channel.sendTyping();
                await page.screenshot({ path: "./temp/" + filename + ".png" });
                await browser.close();
            };
            capture().then(async (response) => {
                // Send image in embed
                message.channel.sendTyping();
                const embed = new MessageEmbed()
                    .setTitle(link)
                    .setColor('#F86154')
                    .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                    .setImage("attachment://" + filename + ".png")
                const newMessage = await message.reply({
                    embeds: [embed], files: ['./temp/' + filename + '.png']
                })
                const fs = require('fs')
                fs.unlinkSync('./temp/' + filename + ".png")
                return
            })

        } else {
            // If input doesn't fit required format
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