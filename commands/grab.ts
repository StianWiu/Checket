// Still in progress!!!!

import { ICommand } from "wokcommands";
import { MessageEmbed } from "discord.js";
import { Browser } from "puppeteer";

export default {
  category: "Link",
  description: "Get screenshot of all links found",
  slash: false,
  callback: async ({ args, message }) => {
    message.channel.sendTyping();
    require("events").EventEmitter.defaultMaxListeners = 500;
    const puppeteer = require("puppeteer");
    var randomstring = require("randomstring");
    const fs = require("fs");
    var validUrl = true;
    var instances = 0;
    // Make sure input starts with http(s)
    if (args[0].startsWith("http://", 0) || args[0].startsWith("https://", 0)) {
      // Check if website actually works.
      try {
        const browser = await puppeteer.launch({
          headless: true,
          args: ["--no-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(args[0], { waitUntil: "load", timeout: 0 });
      } catch (e: any) {
        const couldNotResolve = new MessageEmbed()
          .setTitle("Error")
          .setDescription(
            `Could not resolve ${args[0]} are you sure you typed it correctly?`
          )
          .setFooter(
            "Checket",
            "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
          )
          .setColor("RED");
        await message.reply({ embeds: [couldNotResolve] });
        validUrl = false;
      }
      if (validUrl == false) {
        return;
      } else {
        // Make temporary folder for all images to be collected and zipped in
        const foldername = randomstring.generate();
        fs.mkdirSync(`./temp/${foldername}`);
        console.log(`Made folder ${foldername}`);

        const grabLinks = await puppeteer.launch({
          defaultViewport: { width: 1920, height: 1080 },
          headless: true,
          args: ["--no-sandbox"],
        });
        const page = await grabLinks.newPage();
        await page.goto(args[0]);
        await new Promise((resolve) => setTimeout(resolve, 2500));
        console.log(`Opening ${args[0]}`);
        const linksArray = await page.evaluate(() =>
          Array.from(document.querySelectorAll("a")).map((anchor) => [
            anchor.href,
          ])
        );
        var arrayLength = linksArray.length;
        const loopThroughLinks = async () => {
          for (var i = 0; i < arrayLength; i++) {
            if (i >= 30) {
              arrayLength = 30;
              return zipFolder();
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
            takeScreenshot(linksArray, i);
          }
          return zipFolder();
        };
        const takeScreenshot = async (linkArray: any, i: number) => {
          console.log(i);
          try {
            const filename = randomstring.generate();
            const currentLink = linkArray[i].join();
            if (
              currentLink.startsWith("https://") ||
              currentLink.startsWith("http://") ||
              currentLink.startsWith("www")
            ) {
              const browser = await puppeteer.launch({
                defaultViewport: { width: 1920, height: 1080 },
                headless: true,
                args: ["--no-sandbox"],
              });
              const page = await browser.newPage();
              await page.goto(currentLink, { waitUntil: "load", timeout: 0 });
              console.log(`Opening ${currentLink}`);
              // Wait for 10 seconds
              await new Promise((resolve) => setTimeout(resolve, 10000));
              await page.screenshot({
                path: `./temp/${foldername}/${filename}.png`,
              });
              console.log(`Screenshot taken of ${currentLink}`);
              await browser.close();
              instances++;
            } else return;
          } catch (error) {
            instances++;
            return console.log(error);
          }
        };
        const zipFolder = async () => {
          var waiting = 0;
          while (instances != arrayLength) {
            console.log(`${instances}/${arrayLength} = ${waiting}`);
            await new Promise((resolve) => setTimeout(resolve, 500));
            waiting++;
            if (waiting >= 110) {
              instances = arrayLength;
            }
          }
          console.log("Zipping folder");
          await new Promise((resolve) => setTimeout(resolve, 3000));
          var archiver = require("archiver");
          const filename = randomstring.generate({
            length: 10,
            charset: "hex",
          });
          var output = fs.createWriteStream(`./temp/${filename}.zip`);
          console.log(`Created zip folder ${foldername}.zip`);
          var archive = archiver("zip");
          output.on("close", function () {
            console.log(`${archive.pointer()} total bytes zipped`);
          });
          archive.pipe(output);
          archive.directory(`./temp/${foldername}/`, false);
          archive.finalize();
          console.log("Closed zip file");
          await new Promise((resolve) => setTimeout(resolve, 10000));
          try {
            fs.rmSync(`./temp/${foldername}/`, { recursive: true });
            console.log(`${foldername} is deleted!`);
          } catch (err) {
            console.error(`Error while deleting ${foldername}.`);
          }
          const embed = new MessageEmbed()
            .setTitle("Finished")
            .setDescription("Here is your file. Enjoy!")
            .setFooter(
              "Checket",
              "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
            )
            .setColor("RED");
          await message.reply({ embeds: [embed] });
          message.channel.send({
            files: [`./temp/${filename}.zip`],
          });
          console.log(`${filename}.zip is delivered!`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          fs.unlinkSync(`./temp/${filename}.zip`);
          console.log(`${filename}.zip is deleted!`);
        };
        loopThroughLinks();
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle("Error")
        .setDescription("You did not provide a valid link.")
        .setFooter(
          "A valid link should start with http:// or https://",
          "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128"
        )
        .setColor("RED");
      await message.reply({ embeds: [embed] });
    }
  },
} as ICommand;
