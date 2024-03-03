const { Events, AttachmentBuilder } = require("discord.js");
const generateCanvas = require('../events/canvaPlay'); // Assurez-vous que le chemin d'importation est correct
const playCommand = require('../commands/game/play');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Refresh') return;

        await interaction.deferReply(); // Assurez-vous de différer la réponse avant l'édition
        const row = playCommand.getRow();

        const canvas = await generateCanvas(interaction);
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'avatar.png' });
        await interaction.editReply({
            content: `Canvas refreshed!`,
            files: [attachment],
            components: [row],

        });
        return;
    }
};
