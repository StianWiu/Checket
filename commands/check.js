"use strict";
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
    description: "Get screenshot of specified link.",
    slash: false,
    guildOnly: true,
    callback: function (_a) {
        var args = _a.args, message = _a.message;
        return __awaiter(void 0, void 0, void 0, function () {
            var link_1, loadingEmbed, waitEmbed_1, waited, randomstring, filename_1, puppeteer_1, capture, embed, newMessage, embed, newMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!args[0]) return [3 /*break*/, 6];
                        link_1 = args[0];
                        if (!(link_1.startsWith("http://", 0) || link_1.startsWith("https://", 0))) return [3 /*break*/, 2];
                        loadingEmbed = new discord_js_1.MessageEmbed()
                            .setTitle("Please wait while I check your link.")
                            .setDescription("Please allow up to a minute for this to load.")
                            .setColor("#F86154")
                            .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128");
                        return [4 /*yield*/, message.reply({
                                embeds: [loadingEmbed],
                            })];
                    case 1:
                        waitEmbed_1 = _b.sent();
                        waited = undefined;
                        randomstring = require("randomstring");
                        filename_1 = randomstring.generate();
                        puppeteer_1 = require("puppeteer");
                        capture = function () { return __awaiter(void 0, void 0, void 0, function () {
                            // Check if user specified how long to load website for
                            function isNumeric(value) {
                                // Function to check if argument is string or number
                                return /^-?\d+$/.test(value);
                            }
                            var browser, page, seconds_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, puppeteer_1.launch({
                                            defaultViewport: { width: 1920, height: 1080 },
                                            headless: true,
                                            args: ["--no-sandbox"],
                                        })];
                                    case 1:
                                        browser = _a.sent();
                                        return [4 /*yield*/, browser.newPage()];
                                    case 2:
                                        page = _a.sent();
                                        return [4 /*yield*/, page.goto(link_1)];
                                    case 3:
                                        _a.sent();
                                        if (!(args[1] && isNumeric(args[1]))) return [3 /*break*/, 5];
                                        seconds_1 = args[1];
                                        waited = true;
                                        return [4 /*yield*/, new Promise(function (resolve) {
                                                return setTimeout(resolve, parseInt(seconds_1) * 1000);
                                            })];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 5:
                                        waited = false;
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                                    case 6:
                                        _a.sent();
                                        _a.label = 7;
                                    case 7: return [4 /*yield*/, page.screenshot({ path: "./temp/" + filename_1 + ".png" })];
                                    case 8:
                                        _a.sent();
                                        return [4 /*yield*/, browser.close()];
                                    case 9:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        capture().then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                            var embed, newMessage, fs;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        embed = new discord_js_1.MessageEmbed()
                                            .setTitle(link_1)
                                            .setColor("#F86154")
                                            .setImage("attachment://" + filename_1 + ".png");
                                        if (waited) {
                                            embed.setFooter("Checket, loaded for " + args[1] + " second(s).", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128");
                                        }
                                        else {
                                            embed.setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128");
                                        }
                                        return [4 /*yield*/, message.reply({
                                                embeds: [embed],
                                                files: ["./temp/" + filename_1 + ".png"],
                                            })];
                                    case 1:
                                        newMessage = _a.sent();
                                        waitEmbed_1.delete();
                                        fs = require("fs");
                                        fs.unlinkSync("./temp/" + filename_1 + ".png");
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 5];
                    case 2:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("You did not provide a valid link.")
                            .setFooter("A valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                            .setColor("RED");
                        return [4 /*yield*/, message.reply({
                                embeds: [embed],
                            })];
                    case 3:
                        newMessage = _b.sent();
                        // Delete embed after 5 seconds
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5 * 1000); })];
                    case 4:
                        // Delete embed after 5 seconds
                        _b.sent();
                        newMessage.delete();
                        _b.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        embed = new discord_js_1.MessageEmbed()
                            .setTitle("!Check")
                            .setDescription("To use the !Check command you need to do `!Check {$URL} {$SECONDS}` the seconds parameter is optional. It chooses how long you want to let the website load. Default is 5 seconds.\n\nSo your command should look like this `!Check https://stianwiu.me 10`")
                            .setFooter("A valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                            .setColor("RED");
                        return [4 /*yield*/, message.reply({
                                embeds: [embed],
                            })];
                    case 7:
                        newMessage = _b.sent();
                        _b.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
};
