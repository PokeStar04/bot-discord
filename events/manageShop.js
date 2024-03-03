
const { Users } = require("../dbObjects.js");
const { Events } = require("discord.js");
const { Items } = require("../dbObjects.js");
const { Shop } = require("../dbObjects.js");

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isButton()) return;
        const myUser = interaction.user.username
        const customId = interaction.customId;
        const userData = await Users.findOne({
            where: { username: myUser }
        });
        const userId = userData.id;
        const itemData = await Items.findAll({});
        for (let currentItem = 0; currentItem < itemData.length; currentItem++) {
            if (customId == itemData[currentItem].item_name && userData.gold >= itemData[currentItem].price) {
                const existingShopRecord = await Shop.findOne({
                    where: {
                        idUsers: userId,
                        idItems: itemData[currentItem].id,
                    },
                });
                if (existingShopRecord) {
                    // Update the existing record if it exists
                    await existingShopRecord.update({
                        item_number: existingShopRecord.item_number + 1,
                    });
                } else {
                    // Create a new record if it doesn't exist
                    await Shop.create({
                        idUsers: userId,
                        idItems: itemData[currentItem].id,
                        item_number: 1,
                    });
                }
                const updatedShop = await Shop.findAll({
                    where: { idUsers: userId },
                });
                let totalDamage = 0;
                for (const shopRecord of updatedShop) {
                    const itemId = shopRecord.idItems;
                    const itemNumber = shopRecord.item_number;
                    const itemDetails = await Items.findByPk(itemId);
                    if (itemDetails) {
                        const damagePerItem = itemDetails.damage;
                        totalDamage += damagePerItem * itemNumber;
                    } else {
                        console.log(`Item with ID ${itemId} not found.`);
                    }
                }
                await Users.update(
                    { click_value: totalDamage, gold: userData.gold - itemData[currentItem].price },
                    { where: { username: myUser } }
                );

                return interaction.reply(`${itemData[currentItem].item_name} Acheté. pour ${itemData[currentItem].price} vous avez gagner  ${itemData[currentItem].damage} de force`);
            }
            if (customId == itemData[currentItem].item_name && userData.gold < itemData[currentItem].price) {
                return interaction.reply(`${itemData[currentItem].item_name} est trop cher il te manque ${itemData[currentItem].price - userData.gold} gold`);

            }

            //return interaction.reply(`tre`);
        }
        return

    }
};
