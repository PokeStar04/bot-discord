const { Events } = require("discord.js");
const { Users } = require("../dbObjects.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Click') return;


        myUser = interaction.user.username

        const user = await Users.findOne({ where: { username: myUser } });

        if (user) {
            const addClick = user.current_click + user.click_value;
            const totalClick = user.click_count + user.click_value
            await Users.update(
                { current_click: addClick, click_count: totalClick },
                { where: { username: interaction.user.username } }
            );
            return interaction.reply(`Mon cpc est de : ${user.click_value}\nLE total de mes click: ${user.click_count}\nMon nombre de click actuel est de : ${user.current_click}`);


        }
        return interaction.reply(`Could not find tag: ${myUser}`);



        console.log(interaction.user.username);

        try {
            const tag = await Users.create({
                username: interaction.user.username
            });


            return interaction.reply(`Tag ${tag.username} added.`);
        } catch (error) {
            // console.error("An error occurred during User creation:", error);

            if (error.name === "SequelizeUniqueConstraintError") {

                console.log('cest la mercde')
                console.log(error);
                await execute("commands/login/login.js")

            }

        }



        try {
            const clickerData = await Users.findOne({
                where: { username: interaction.user.username },
                attributes: ['click_value', 'click_count', 'current_click']
            });
            console.log(clickerData);

            if (clickerData) {
                const clickerDataString = `${clickerData.click_value + clickerData.click_count + clickerData.current_click}`;
                const addClick = clickerData.current_click + clickerData.click_value;
                const totalClick = clickerData.click_count + clickerData.click_value
                await Users.update(
                    { current_click: addClick, click_count: totalClick },
                    { where: { username: interaction.user.username } }
                );




                return interaction.reply(`Mon cpc est de : ${clickerData.click_value}\nLE total de mes click: ${clickerData.click_count}\nMon nombre de click actuel est de : ${clickerData.current_click}`);

                //  return interaction.reply(`List of tags: ${clickerDataString}`);
            } else {
                return interaction.reply("No tags found.");
            }
        } catch (error) {
            console.error(error);
            return interaction.reply("An error occurred while processing your request.");
        }


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
