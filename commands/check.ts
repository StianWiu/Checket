import { error } from "console";
import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
  category: "Link",
  description: "Get screenshot of specified link.",
  slash: false,

  callback: async ({ args, message }) => {
    if (args[0]) {
      // Check if input fits required format.
      const link = args[0];
      if (link.startsWith("http://", 0) || link.startsWith("https://", 0)) {
        var valid = undefined;
        try {
          const puppeteer = require("puppeteer");
          const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox"],
          });
          const page = await browser.newPage();
          await page.goto(link, { waitUntil: "load", timeout: 0 });
        } catch (e: any) {
          const embed = new MessageEmbed()
            .setTitle("Error")
            .setDescription(
              "Could not resolve " +
                link +
                " are you sure you typed it correctly?"
            )
            .setFooter(
              "Checket",
              "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
            )
            .setColor("RED");
          const newMessage = await message.reply({
            embeds: [embed],
          });
          valid = false;
        }
        if (valid == undefined) {
          // Create embed
          const loadingEmbed = new MessageEmbed()
            .setTitle("Please wait while I check your link.")
            .setDescription("Please allow up to a minute for this to load.")
            .setColor("#F86154")
            .setFooter(
              "Checket",
              "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
            );
          // Send embed
          const waitEmbed = await message.reply({
            embeds: [loadingEmbed],
          });
          // Define variables so they can be accesed later
          var waited: any = undefined;
          var redirect: any = undefined;
          var firstUrl: any = undefined;
          var secondUrl: any = undefined;
          // Generate random string to be used for filename of screenshot
          var randomstring = require("randomstring");
          const filename = randomstring.generate();
          // Use puppeteer to grab screenshot of specified url
          const puppeteer = require("puppeteer");
          const capture = async () => {
            const browser = await puppeteer.launch({
              defaultViewport: { width: 1920, height: 1080 },
              headless: true,
              args: ["--no-sandbox"],
            });
            const page = await browser.newPage();
            await page.goto(link);
            firstUrl = await page.url();
            // Check if user specified how long to load website for
            function isNumeric(value: any) {
              // Function to check if argument is string or number
              return /^-?\d+$/.test(value);
            }
            if (args[1] && isNumeric(args[1])) {
              const seconds: any = args[1];
              waited = true;
              await new Promise((resolve) =>
                setTimeout(resolve, parseInt(seconds) * 1000)
              );
            } else {
              waited = false;
              await new Promise((resolve) => setTimeout(resolve, 5000));
            }
            secondUrl = await page.url();
            await page.screenshot({ path: "./temp/" + filename + ".png" });
            await browser.close();
            if (secondUrl != firstUrl) {
              redirect = "true";
            } else {
              redirect = "false";
            }
          };
          capture().then(async (response) => {
            // Create embed
            const embed = new MessageEmbed()
              .setTitle("Checket URL scanner")
              .setColor("#F86154")
              .setImage("attachment://" + filename + ".png");
            if (waited) {
              embed.setFooter(
                "Checket, loaded for " +
                  args[1] +
                  " second(s)." +
                  " | Redirected: " +
                  redirect +
                  " | Endpoint: " +
                  secondUrl,
                "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
              );
            } else {
              embed.setFooter(
                "Checket" +
                  " | Redirected: " +
                  redirect +
                  " | Endpoint: " +
                  secondUrl,
                "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
              );
            }
            // Send embed, with file attached
            const newMessage = await message.reply({
              embeds: [embed],
              files: ["./temp/" + filename + ".png"],
            });
            waitEmbed.delete();
            const fs = require("fs");
            fs.unlinkSync("./temp/" + filename + ".png");
            return;
          });
        } else return;
      } else {
        // If input doesn't fit required format
        const embed = new MessageEmbed()
          .setTitle("Error")
          .setDescription("You did not provide a valid link.")
          .setFooter(
            "A valid link should start with http:// or https://",
            "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
          )
          .setColor("RED");
        const newMessage = await message.reply({
          embeds: [embed],
        });
        // Delete embed after 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
        newMessage.delete();
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle("!Check")
        .setDescription(
          "To use the !Check command you need to do `!Check {$URL} {$SECONDS}` the seconds parameter is optional. It sets how long you want to let the website load. Default is 5 seconds.\n\nSo your command should look like this `!Check https://stianwiu.me 10`"
        )
        .setFooter(
          "A valid link should start with http:// or https://",
          "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
        )
        .setColor("RED");
      const newMessage = await message.reply({
        embeds: [embed],
      });
    }
  },
} as ICommand;
