"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    category: 'Testing',
    description: 'Testing',
    callback: function (_a) {
        var message = _a.message, channel = _a.channel;
        message.reply('Please react');
        message.react('👍');
        // const filter = (m: Message) => {
        //     return m.author.id === message.author.id
        // }
        // const collector = channel.createMessageCollector({
        //     filter,
        //     max: 1,
        //     time: 1000 * 5
        // })
        var filter = function (reaction, user) {
            return user.id === message.author.id;
        };
        var collector = message.createReactionCollector({
            filter: filter,
            max: 1,
            time: 1000 * 5
        });
        collector.on('collect', function (reaction) {
            console.log(reaction.emoji);
        });
        collector.on('end', function (collected) {
            if (collected.size === 0) {
                message.reply('You did not react');
                return;
            }
            var text = 'Collected:\n\n';
            collected.forEach(function (message) {
                text += message.emoji.name + "\n";
            });
            message.reply(text);
        });
    },
};
