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
    category: 'Link',
    description: 'Get screenshot of specified link.',
    slash: false,
    guildOnly: true,
    callback: function (_a) {
        var args = _a.args, message = _a.message;
        return __awaiter(void 0, void 0, void 0, function () {
            var link, randomstring, filename_1, puppeteer_1, capture, embed_1, newMessage;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        link = (args[0]);
                        if (!(link.startsWith("http://", 0) || link.startsWith("https://", 0))) return [3 /*break*/, 1];
                        message.channel.sendTyping();
                        randomstring = require("randomstring");
                        filename_1 = randomstring.generate();
                        puppeteer_1 = require("puppeteer");
                        capture = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var browser, page;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, puppeteer_1.launch({ defaultViewport: { width: 1920, height: 1080 }, headless: true, args: ['--no-sandbox'] })];
                                    case 1:
                                        browser = _a.sent();
                                        return [4 /*yield*/, browser.newPage()];
                                    case 2:
                                        page = _a.sent();
                                        return [4 /*yield*/, page.goto(link)];
                                    case 3:
                                        _a.sent();
                                        message.channel.sendTyping();
                                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
                                    case 4:
                                        _a.sent();
                                        message.channel.sendTyping();
                                        return [4 /*yield*/, page.screenshot({ path: "./temp/" + filename_1 + ".png" })];
                                    case 5:
                                        _a.sent();
                                        return [4 /*yield*/, browser.close()];
                                    case 6:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        capture().then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                            var imgur;
                            return __generator(this, function (_a) {
                                imgur = require('imgur');
                                message.channel.sendTyping();
                                imgur
                                    .uploadFile('./temp/' + filename_1 + ".png")
                                    .then(function (json) { return __awaiter(void 0, void 0, void 0, function () {
                                    var embed, newMessage, fs;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                // Send image in embed
                                                message.channel.sendTyping();
                                                embed = new discord_js_1.MessageEmbed()
                                                    .setTitle(link)
                                                    .setColor('#F86154')
                                                    .setFooter("Checket", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                                                    .setImage(json.link);
                                                return [4 /*yield*/, message.reply({
                                                        embeds: [embed]
                                                    })];
                                            case 1:
                                                newMessage = _a.sent();
                                                fs = require('fs');
                                                fs.unlinkSync('./temp/' + filename_1 + ".png");
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        return [3 /*break*/, 5];
                    case 1:
                        embed_1 = new discord_js_1.MessageEmbed()
                            .setTitle("Error")
                            .setDescription("You did not provide a valid link.")
                            .setFooter("Valid link should start with http:// or https://", "https://cdn.discordapp.com/avatars/888736693128151103/1cfc286bdcede1eb4d227d53fc5413fb.webp?size=128")
                            .setColor("RED");
                        if (!(message === undefined)) return [3 /*break*/, 2];
                        return [2 /*return*/, embed_1];
                    case 2: return [4 /*yield*/, message.reply({
                            embeds: [embed_1]
                        })];
                    case 3:
                        newMessage = _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5 * 1000); })];
                    case 4:
                        _b.sent();
                        newMessage.delete();
                        _b.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
