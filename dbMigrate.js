// Import tables
const { Items } = require("./dbObjects");

// Get the different migrations (Array of Objects)
// Should be a require from different migration files
const { itemsMigrations } = require("./migrations/migrationSeed01.json");

for (currentItem = 0; currentItem < itemsMigrations.length; currentItem++) {
    console.log(itemsMigrations[currentItem]);
    addItems(itemsMigrations[currentItem]);
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



