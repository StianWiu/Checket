"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = __importStar(require("discord.js"));
var dotenv_1 = __importDefault(require("dotenv"));
var wokcommands_1 = __importDefault(require("wokcommands"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var client = new discord_js_1.default.Client({
    intents: [
        //Specify what intents bot requires.
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});
client.on("ready", function () {
    console.log("Bot has started");
    // Settings for WOKCommands.
    new wokcommands_1.default(client, {
        commandsDir: path_1.default.join(__dirname, "commands"),
        typeScript: true,
        testServers: ["715215005812785182"],
        disabledDefaultCommands: [
            //Disable commands that come pre made with WOKCommands.
            "channelonly",
            "command",
            "language",
            "prefix",
            "requiredrole",
            "slash",
            "help",
        ],
    }).setDefaultPrefix("?");
});
client.login(process.env.TESTTOKEN);
