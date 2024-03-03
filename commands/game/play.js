// Votre fichier principal (par exemple, playCommand.js)
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const generateCanvas = require('../../events/canvaPlay');
let row; // Définissez row en dehors de la fonction execute

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Jouer au clicker")
    ,
    async execute(interaction) {
        const clicker = new ButtonBuilder()
            .setCustomId("Click")
            .setLabel("Click")
            .setStyle(ButtonStyle.Danger);

        const shop = new ButtonBuilder()
            .setCustomId("Shop")
            .setLabel("Shop")
            .setStyle(ButtonStyle.Secondary);
        const refresh = new ButtonBuilder()
            .setCustomId("Refresh")
            .setLabel("Refresh")
            .setStyle(ButtonStyle.Primary);

        row = new ActionRowBuilder().addComponents(clicker, shop, refresh); // Affectez la valeur de row ici

        const canvas = await generateCanvas(interaction);
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'avatar.png' });

        await interaction.reply({
            content: `Click ! Click ! Click ! `,
            components: [row],
            files: [attachment],
        });

    },
    getRow: function () {
        return row;
    }
};
