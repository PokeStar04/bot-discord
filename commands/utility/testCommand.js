const { SlashCommandBuilder } = require("discord.js");
const { Users } = require("../../dbObjects.js");
const { Stages } = require("../../dbObjects.js");
const { Monsters } = require("../../dbObjects.js");
const { MonsterStages } = require("../../dbObjects.js");
const { addMonstersStage } = require('../../events/monsterUtils.js');



module.exports = {
  data: new SlashCommandBuilder()
    .setName("test_command")
    .setDescription("Test"),
  async execute(interaction) {
    const myUser = interaction.user.username;
    const userData = await Users.findOne({ where: { username: myUser } });
    const currentStage = userData.current_stage;
    const stageData = await Stages.findOne({ where: { stages_level: currentStage } });
    const selectedMonsterIds = [];



    const stageMonsterNumber = stageData.monster_number;
    const monsterIds = await Monsters.findAll({ attributes: ['id'] });

    // Sélection aléatoire des monstres
    for (let monsters_count = 0; monsters_count < stageMonsterNumber; monsters_count++) {
      const randomIndex = Math.floor(Math.random() * monsterIds.length);
      const selectedMonsterId = monsterIds[randomIndex].id;
      selectedMonsterIds.push(selectedMonsterId);
    }

    // Ajout des monstres au stage
    for (const monsterId of selectedMonsterIds) {
      addMonstersStage(monsterId, currentStage);
    }

    // Récupération des monstres pour affichage
    const tableauID = await MonsterStages.findAll({
      where: { stageId: 1 },
      attributes: ['monsterId']
    });

    const tableauIDs = tableauID.map(instance => instance.monsterId);
    if (!stageData) {
      console.log("No stage found for the user's current level.");
      return await interaction.reply("No stage found for the user's current level.");
    }

    for (const currentItem of tableauIDs) {
      const monster = await MonsterStages.findOne({
        where: { stageId: currentStage, monsterId: currentItem },
        include: [Monsters]
      });

      console.log("ID du monstre :", monster.monsterId);
      console.log("Nom du monstre :", monster.monster.monster_name);
      console.log("Santé du monstre :", monster.monster.health);
      console.log("Or du monstre :", monster.monster.gold);
      console.log("Image du monstre :", monster.monster.image_path);
      // Et ainsi de suite pour d'autres propriétés
    }

    await interaction.reply("Commande de Testpour faire des manipulation sans avancer dans le jeu: Je l'ai pas supprimer expres.");
  }



};
