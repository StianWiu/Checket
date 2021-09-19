import { ButtonInteraction, MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";
var CloudmersiveValidateApiClient = require('cloudmersive-validate-api-client');
export default {
    category: 'Testing',
    description: 'Button',

    slash: true,
    testOnly: true,

    callback: async ({ interaction: msgInt, channel}) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("ban_yes")
                .setEmoji("🔨")
                .setLabel("Yes")
                .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("ban_no")
            .setLabel("No")
            .setStyle("DANGER")
        )

        const linkRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL('https://stianwiu.me')
                .setLabel("Visit StianWiu.me")
                .setStyle("LINK")
            )

    await msgInt.reply({
        content: "Are you sure?",
        components: [row, linkRow],
        ephemeral: true,
    })

    const filter = (btnInt: ButtonInteraction) => {
        return msgInt.user.id === btnInt.user.id
    }

    const collector = channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 15000,
    })
    
    collector.on("collect", (i: ButtonInteraction) => {
        i.reply({
            content: "You clicked a button",
            ephemeral: true,
        })
    })

    collector.on("end", async (collection) => {
        collection.forEach((click) => {
            console.log(click.user.id, click.customId)
        })

        if (collection.first()?.customId === "ban_yes") {
            // ban the target user
        }

        await msgInt.editReply({
            content: "An action has already been taken.",
            components: [],
        })
    })
}
} as ICommand