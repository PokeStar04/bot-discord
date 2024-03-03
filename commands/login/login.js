const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Users } = require("../../dbObjects.js");
const { where } = require("sequelize");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("login")
        .setDescription("Se connecter"),
    async execute(interaction) {
        const tag = await Users.create({
            username: interaction.user.username
        });
        return interaction.reply(`Tag ${tag.username} ajouté.`);
    }
};
