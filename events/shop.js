const { Events, ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, } = require("discord.js");
const { Users } = require("../dbObjects.js");







module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Shop') return;

        const clickerData = await Users.findOne({
            where: { username: interaction.user.username },
            attributes: ['click_value', 'current_click']
        });
        console.log(clickerData);



        const click_X1 = new ButtonBuilder()
            .setCustomId("Click1")
            .setLabel("Click   x1")
            .setStyle(ButtonStyle.Primary);
        const click_X5 = new ButtonBuilder()
            .setCustomId("Click5")
            .setLabel("Click   x5")
            .setStyle(ButtonStyle.Secondary);
        const click_X10 = new ButtonBuilder()
            .setCustomId("Click10")
            .setLabel("Click   x10")
            .setStyle(ButtonStyle.Success);
        const click_X100 = new ButtonBuilder()
            .setCustomId("Click100")
            .setLabel("Click   x100")
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(click_X1, click_X5, click_X10, click_X100);

        await interaction.reply({
            content: 'Increase the power of your click:',
            components: [row],
        });




        // return interaction.reply(`Je fait spawn un bouton de shop`);





        // const command = interaction.client.commands.get(interaction.commandName);




        //     if (!command) {
        //         console.error(
        //             `No command matching ${interaction.commandName} was found.`
        //         );
        //         return;
        //     }

        //     try {
        //         await command.execute(interaction);
        //     } catch (error) {
        //         console.error(error);
        //         if (interaction.replied || interaction.deferred) {
        //             await interaction.followUp({
        //                 content: "There was an error while executing this command!",
        //                 ephemeral: true
        //             });
        //         } else {
        //             await interaction.reply({
        //                 content: "There was an error while executing this command!",
        //                 ephemeral: true
        //             });
        //         }
        //     }
    }
};
