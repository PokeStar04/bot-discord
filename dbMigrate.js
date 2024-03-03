// Import tables
const { Items, Monsters, Stages } = require("./dbObjects");
// Get the different migrations (Array of Objects)
// Should be a require from different migration files
const { itemsMigrations, monstersMigrations, stagesMigrations } = require("./migrations/migrationSeed01.json");

for (currentMonster = 0; currentMonster < monstersMigrations.length; currentMonster++) {
    console.log(monstersMigrations[currentMonster]);
    addMonsters(monstersMigrations[currentMonster]);
}
for (currentItem = 0; currentItem < itemsMigrations.length; currentItem++) {
    console.log(itemsMigrations[currentItem]);
    addItems(itemsMigrations[currentItem]);
}
for (currentStage = 0; currentStage < stagesMigrations.length; currentStage++) {
    console.log(stagesMigrations[currentStage]);
    addStages(stagesMigrations[currentStage]);
}

async function addItems(currentItem) {
    try {
        await Items.create({
            item_name: currentItem.item_name,
            damage: currentItem.damage,
            price: currentItem.price,
            bonus: currentItem.bonus,
            passive: currentItem.passive
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            console.log("Entry already exists");
        }
        console.log(error);
    }
}

async function addMonsters(currentMonster) {
    try {
        await Monsters.create({
            monster_name: currentMonster.monster_name,
            health: currentMonster.health,
            max_health: currentMonster.max_health,
            gold: currentMonster.gold,
            level: currentMonster.level,
            image_path: currentMonster.image_path
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            console.log("Entry already exists");
        }
        console.log(error);
    }
}

async function addStages(currentStage) {
    try {
        await Stages.create({
            stages_level: currentStage.stages_level,
            monster_number: currentStage.monster_number
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            console.log("Entry already exists");
        }
        console.log(error);
    }
}
