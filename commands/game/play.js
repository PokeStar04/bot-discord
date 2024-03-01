const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Jouer au clicker")
    ,
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const reason =
            interaction.options.getString("reason") ?? "No reason provided";

        const clicker = new ButtonBuilder()
            .setCustomId("Click")
            .setLabel("Click")
            .setStyle(ButtonStyle.Danger);

        const shop = new ButtonBuilder()
            .setCustomId("Shop")
            .setLabel("Shop")
            .setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder().addComponents(clicker, shop);





        await interaction.reply({
            content: `Are you s`,
            components: [row],
            files: [
                'src/asset/monster/monster1.jpeg',
            ],
        });
    }
};
