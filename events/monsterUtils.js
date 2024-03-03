const { MonsterStages, Monsters, Users, Stages } = require("../dbObjects.js");
const { Op } = require('sequelize');

async function addMonstersStage(currentMonsterStage, level) {
    try {
        await MonsterStages.create({
            stageId: level,
            monsterId: currentMonsterStage,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            console.log("Entry already exists");
        }
        console.log(error);
    }
}

async function resetMonsterHealth(currentStage) {
    const tableauID = await MonsterStages.findAll({
        where: { stageId: currentStage },
        attributes: ['monsterId']
    });
    const tableauIDs = tableauID.map(instance => instance.monsterId);

    for (const monsterId of tableauIDs) {
        await MonsterStages.update(
            { health: Sequelize.col('max_health') },
            { where: { monsterId: monsterId, stageId: currentStage } }
        );
    }
}

async function getCurrentMonsterInfo(currentStage, myUser) {
    const previousMonsters = await MonsterStages.findAll({
        where: { stageId: { [Op.lt]: currentStage } },
        include: [Monsters]
    });

    const allMonsters = [...previousMonsters];

    const currentStageMonsters = await MonsterStages.findAll({
        where: { stageId: currentStage },
        include: [Monsters]
    });
    allMonsters.push(...currentStageMonsters);

    let currentMonster = null;

    for (const monsterData of allMonsters) {
        const monster = monsterData.monster;
        if (monster && monster.health > 0) {
            currentMonster = {
                id: monsterData.monsterId,
                name: monster.monster_name,
                max_health: monster.max_health,
                health: monster.health,
                gold: monster.gold,
                image_path: monster.image_path
            };
            break;
        }
    }

    if (!currentMonster) {
        const nextStage = currentStage + 1;

        await Users.update({ current_stage: nextStage }, { where: { username: myUser } });

        const stageData = await Stages.findOne({ where: { stages_level: nextStage } });
        const selectedMonsterIds = [];

        const stageMonsterNumber = stageData.monster_number;
        const monsterIds = await Monsters.findAll({ attributes: ['id'] });

        for (let monsters_count = 0; monsters_count < stageMonsterNumber; monsters_count++) {
            const randomIndex = Math.floor(Math.random() * monsterIds.length);
            const selectedMonsterId = monsterIds[randomIndex].id;
            selectedMonsterIds.push(selectedMonsterId);
        }

        for (const monsterId of selectedMonsterIds) {
            await addMonstersStage(monsterId, nextStage);
        }

        const firstMonsterId = selectedMonsterIds[0];
        const firstMonster = await MonsterStages.findOne({
            where: { stageId: nextStage, monsterId: firstMonsterId },
            include: [Monsters]
        });

        currentMonster = {
            id: firstMonster.monsterId,
            name: firstMonster.monster.monster_name,
            max_health: firstMonster.monster.max_health,
            health: firstMonster.monster.max_health,
            gold: firstMonster.monster.gold,
            image_path: firstMonster.image_path
        };
    }
    return currentMonster;
}

module.exports = { getCurrentMonsterInfo, addMonstersStage };
