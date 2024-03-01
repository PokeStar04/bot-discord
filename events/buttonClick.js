const { Events } = require("discord.js");
const { Users } = require("../dbObjects.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Click') return;
        const myUser = interaction.user.username

        const user = await Users.findOne({ where: { username: myUser } });

        if (user) {
            const addClick = user.current_click + user.click_value;
            const totalClick = user.click_count + user.click_value
            await Users.update(
                { current_click: addClick, click_count: totalClick },
                { where: { username: interaction.user.username } }
            );
            return interaction.reply(`Mon cpc est de : ${user.click_value}\nLE total de mes click: ${user.click_count}\nMon nombre de click actuel est de : ${user.current_click}`);


        } else {
            user = await Users.create({
                username: myUser,
                click_value: 1, // Set default values as needed
                click_count: 0,
                current_click: 0,
            });
            return interaction.reply(`Votre enregistement: ${myUser} vous aller pouvour jouer`);
        }
        return interaction.reply(`Could not find tag: ${myUser}`);

    }
};
