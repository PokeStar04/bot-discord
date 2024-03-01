const { Events } = require("discord.js");
const { Users } = require("../dbObjects.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'login') return;

        try {

            const tag = await Users.create({
                username: interaction.user.username
            });

            return interaction.reply(`Tag ${tag.username} ajouté.`);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la création de l'utilisateur:", error);

            if (error.name === "SequelizeUniqueConstraintError") {
                console.log("Utilisateur créé.");
                return interaction.reply("Vous êtes déjà enregistré.");
            } else {
                return interaction.reply("Une erreur s'est produite lors de la création de l'utilisateur. Veuillez réessayer plus tard.");
            }
        }
    }
};
