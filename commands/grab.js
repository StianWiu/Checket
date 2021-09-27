"use strict";
// Still in progress!!!!
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
exports.default = {
    category: "Link",
    description: "Get screenshot of all links found",
    slash: false,
    callback: function (_a) {
        var args = _a.args, message = _a.message;
        return __awaiter(void 0, void 0, void 0, function () {
            var puppeteer, randomstring, fs, validUrl, instances, browser, page, e_1, couldNotResolve, foldername_1, grabLinks, page, linksArray_1, arrayLength, loopThroughLinks, takeScreenshot_1, zipFolder_1, embed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        message.channel.sendTyping();
                        require("events").EventEmitter.defaultMaxListeners = 500;
                        puppeteer = require("puppeteer");
                        randomstring = require("randomstring");
                        fs = require("fs");
                        validUrl = true;
                        instances = 0;
                        if (!(args[0].startsWith("http://", 0) || args[0].startsWith("https://", 0))) return [3 /*break*/, 15];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 7]);
                        return [4 /*yield*/, puppeteer.launch({
                                headless: true,
                                args: ["--no-sandbox"],
                            })];
                    case 2:
                        browser = _b.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 3:
                        page = _b.sent();
                        return [4 /*yield*/, page.goto(args[0], { waitUntil: "load", timeout: 0 })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        e_1 = _b.sent();
                        couldNotResolve = new discord_js_1.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("Could not resolve " + args[0] + " are you sure you typed it correctly?")
                            .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                            .setColor("RED");
                        return [4 /*yield*/, message.reply({ embeds: [couldNotResolve] })];
                    case 6:
                        _b.sent();
                        validUrl = false;
                        return [3 /*break*/, 7];
                    case 7:
                        if (!(validUrl == false)) return [3 /*break*/, 8];
                        return [2 /*return*/];
                    case 8:
                        foldername_1 = randomstring.generate();
                        fs.mkdirSync("./temp/" + foldername_1);
                        console.log("Made folder " + foldername_1);
                        return [4 /*yield*/, puppeteer.launch({
                                defaultViewport: { width: 1920, height: 1080 },
                                headless: true,
                                args: ["--no-sandbox"],
                            })];
                    case 9:
                        grabLinks = _b.sent();
                        return [4 /*yield*/, grabLinks.newPage()];
                    case 10:
                        page = _b.sent();
                        return [4 /*yield*/, page.goto(args[0])];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2500); })];
                    case 12:
                        _b.sent();
                        console.log("Opening " + args[0]);
                        return [4 /*yield*/, page.evaluate(function () {
                                return Array.from(document.querySelectorAll("a")).map(function (anchor) { return [
                                    anchor.href,
                                ]; });
                            })];
                    case 13:
                        linksArray_1 = _b.sent();
                        arrayLength = linksArray_1.length;
                        loopThroughLinks = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < arrayLength)) return [3 /*break*/, 4];
                                        if (i >= 30) {
                                            arrayLength = 30;
                                            return [2 /*return*/, zipFolder_1()];
                                        }
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                                    case 2:
                                        _a.sent();
                                        takeScreenshot_1(linksArray_1, i);
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/, zipFolder_1()];
                                }
                            });
                        }); };
                        takeScreenshot_1 = function (linkArray, i) { return __awaiter(void 0, void 0, void 0, function () {
                            var filename, currentLink, browser, page_1, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(i);
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 10, , 11]);
                                        filename = randomstring.generate();
                                        currentLink = linkArray[i].join();
                                        if (!(currentLink.startsWith("https://") ||
                                            currentLink.startsWith("http://") ||
                                            currentLink.startsWith("www"))) return [3 /*break*/, 8];
                                        return [4 /*yield*/, puppeteer.launch({
                                                defaultViewport: { width: 1920, height: 1080 },
                                                headless: true,
                                                args: ["--no-sandbox"],
                                            })];
                                    case 2:
                                        browser = _a.sent();
                                        return [4 /*yield*/, browser.newPage()];
                                    case 3:
                                        page_1 = _a.sent();
                                        return [4 /*yield*/, page_1.goto(currentLink, { waitUntil: "load", timeout: 0 })];
                                    case 4:
                                        _a.sent();
                                        console.log("Opening " + currentLink);
                                        // Wait for 10 seconds
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                                    case 5:
                                        // Wait for 10 seconds
                                        _a.sent();
                                        return [4 /*yield*/, page_1.screenshot({
                                                path: "./temp/" + foldername_1 + "/" + filename + ".png",
                                            })];
                                    case 6:
                                        _a.sent();
                                        console.log("Screenshot taken of " + currentLink);
                                        return [4 /*yield*/, browser.close()];
                                    case 7:
                                        _a.sent();
                                        instances++;
                                        return [3 /*break*/, 9];
                                    case 8: return [2 /*return*/];
                                    case 9: return [3 /*break*/, 11];
                                    case 10:
                                        error_1 = _a.sent();
                                        instances++;
                                        return [2 /*return*/, console.log(error_1)];
                                    case 11: return [2 /*return*/];
                                }
                            });
                        }); };
                        zipFolder_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var waiting, archiver, filename, output, archive, embed;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        waiting = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(instances != arrayLength)) return [3 /*break*/, 3];
                                        console.log(instances + "/" + arrayLength + " = " + waiting);
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                                    case 2:
                                        _a.sent();
                                        waiting++;
                                        if (waiting >= 110) {
                                            instances = arrayLength;
                                        }
                                        return [3 /*break*/, 1];
                                    case 3:
                                        console.log("Zipping folder");
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                                    case 4:
                                        _a.sent();
                                        archiver = require("archiver");
                                        filename = randomstring.generate({
                                            length: 10,
                                            charset: "hex",
                                        });
                                        output = fs.createWriteStream("./temp/" + filename + ".zip");
                                        console.log("Created zip folder " + foldername_1 + ".zip");
                                        archive = archiver("zip");
                                        output.on("close", function () {
                                            console.log(archive.pointer() + " total bytes zipped");
                                        });
                                        archive.pipe(output);
                                        archive.directory("./temp/" + foldername_1 + "/", false);
                                        archive.finalize();
                                        console.log("Closed zip file");
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 10000); })];
                                    case 5:
                                        _a.sent();
                                        try {
                                            fs.rmSync("./temp/" + foldername_1 + "/", { recursive: true });
                                            console.log(foldername_1 + " is deleted!");
                                        }
                                        catch (err) {
                                            console.error("Error while deleting " + foldername_1 + ".");
                                        }
                                        embed = new discord_js_1.MessageEmbed()
                                            .setTitle("Finished")
                                            .setDescription("Here is your file. Enjoy!")
                                            .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                                            .setColor("RED");
                                        return [4 /*yield*/, message.reply({ embeds: [embed] })];
                                    case 6:
                                        _a.sent();
                                        message.channel.send({
                                            files: ["./temp/" + filename + ".zip"],
                                        });
                                        console.log(filename + ".zip is delivered!");
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                                    case 7:
                                        _a.sent();
                                        fs.unlinkSync("./temp/" + filename + ".zip");
                                        console.log(filename + ".zip is deleted!");
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        loopThroughLinks();
                        _b.label = 14;
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("You did not provide a valid link.")
                            .setFooter("A valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                            .setColor("RED");
                        return [4 /*yield*/, message.reply({ embeds: [embed] })];
                    case 16:
                        _b.sent();
                        _b.label = 17;
                    case 17: return [2 /*return*/];
                }
            });
        });
    },
};
