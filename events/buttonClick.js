
const { Events, AttachmentBuilder } = require("discord.js");
const { Users, Monsters, Stages } = require("../dbObjects.js");
const { getCurrentMonsterInfo } = require('./monsterUtils');
const generateCanvas = require('../events/canvaPlay');
const playCommand = require('../commands/game/play');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton() || interaction.customId !== 'Click') return;

        const myUser = interaction.user.username;
        let userData = await Users.findOne({ where: { username: myUser } });
        const currentStage = userData.current_stage;

        const stageData = await Stages.findOne({ where: { stages_level: currentStage } });
        const stageMonsterNumber = stageData.monster_number;
        const monsterIds = await Monsters.findAll({ attributes: ['id'] });

        const selectedMonsterIds = [];
        for (let monsters_count = 0; monsters_count < stageMonsterNumber; monsters_count++) {
            const randomIndex = Math.floor(Math.random() * monsterIds.length);
            const selectedMonsterId = monsterIds[randomIndex].id;
            selectedMonsterIds.push(selectedMonsterId);
        }

        const currentMonster = await getCurrentMonsterInfo(currentStage, interaction);

        if (userData) {
            const totalClick = userData.click_count + userData.click_value;
            const updatedHealth = currentMonster.health - userData.click_value;
            try {
                await Monsters.update(
                    { health: updatedHealth },
                    { where: { id: currentMonster.id } }
                );
            } catch (error) {
                console.log(error);
            }
            if (updatedHealth < 1) {
                const updateGold = userData.gold + currentMonster.gold
                await Users.update(
                    { gold: updateGold, click_count: totalClick },
                    { where: { username: myUser } }
                );
            } else {
                await Users.update(
                    { click_count: totalClick },
                    { where: { username: myUser } }
                );
            }
            if (updatedHealth < 1) {
                const upgradeMonsterHealth = Math.round(currentMonster.max_health * 1.3);
                const upgradeMonsterGold = Math.round(currentMonster.gold * 1.5);
                try {
                    await Monsters.update(
                        { max_health: upgradeMonsterHealth, gold: upgradeMonsterGold },
                        { where: { id: currentMonster.id } }
                    );
                } catch (error) {
                    console.log(error);
                }
            }



            await interaction.deferReply();
            const row = playCommand.getRow();

            const canvas = await generateCanvas(interaction);
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'avatar.png' });
            await interaction.editReply({
                content: `Canvas refreshed!`,
                files: [attachment],
                components: [row],
            });
        } else {
            userData = await Users.create({
                username: myUser,
                click_value: 1,
                click_count: 0,
                current_click: 0,
            });
            await interaction.reply(`Votre enregistrement: ${myUser} vous pouvez jouer`);
        }
    }
};
