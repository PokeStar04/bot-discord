const { Events, ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, } = require("discord.js");
const { Items } = require("../dbObjects.js");
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Shop') return;
        const itemData = await Items.findAll({
            attributes: ['item_name', 'price', 'damage']
        });
        const buttons = itemData.map(item =>
            new ButtonBuilder()
                .setCustomId(item.item_name)
                .setLabel(item.item_name)
                .setStyle(ButtonStyle.Primary)
        );
        const itemList = new ActionRowBuilder().addComponents(buttons);
        await interaction.reply({
            content: 'Increase the power of your click:',
            components: [itemList],
        });
    }
};
