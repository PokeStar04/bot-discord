const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { Users } = require("../../dbObjects.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("login")
        .setDescription("Se connecter")
    ,
    async execute(interaction) {

    }





};
