
const { Users } = require("../dbObjects.js");
const { Events } = require("discord.js");


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;

        const customId = interaction.customId;

        let responseMessage = '';
        const clickerData = await Users.findOne({
            where: { username: interaction.user.username },
            attributes: ['click_value', 'click_count', 'current_click']
        });
        // Utilisez des déclarations conditionnelles pour déterminer le message en fonction de customId
        if (customId === 'Click1' && clickerData.current_click >= 3) {
            const cost = 3
            await Users.update(
                { click_value: clickerData.click_value + 1, current_click: clickerData.current_click - cost },
                { where: { username: interaction.user.username } }
            );
            responseMessage = 'Increase the power of your click (1)';
        } else if (customId === 'Click5' && clickerData.current_click >= 13) {
            const cost = 13
            await Users.update(
                { click_value: clickerData.click_value + 5, current_click: clickerData.current_click - cost },
                { where: { username: interaction.user.username } }
            );
            responseMessage = 'Increase the power of your click (5)';
        } else if (customId === 'Click10' && clickerData.current_click >= 24) {
            const cost = 24
            await Users.update(
                { click_value: clickerData.click_value + 10, current_click: clickerData.current_click - cost },
                { where: { username: interaction.user.username } }
            );
            responseMessage = 'Increase the power of your click (10)';
        } else if (customId === 'Click100' && clickerData.current_click >= 100) {
            const cost = 80
            await Users.update(
                { click_value: clickerData.click_value + 100, current_click: clickerData.current_click - cost },
                { where: { username: interaction.user.username } }
            );
            responseMessage = 'Increase the power of your click (100)';
        } else {
            // Si l'identifiant personnalisé n'est pas 'Click1', 'Click5' ou 'Click10'
            return;
        }

        await interaction.reply({
            content: responseMessage,
        });
    }
};
