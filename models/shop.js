const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "shop",
        {
            item_name: {
                type: Sequelize.STRING,
                unique: true
            },
            damage: {
                type: Sequelize.INTEGER,
                defaultValue: 1,

            },
            cost: Sequelize.INTEGER,
            item_number: Sequelize.INTEGER,
            passive: Sequelize.BOOLEAN,
            total_damage: {
                type: Sequelize.VIRTUAL,
                get() {
                    // Calcul dynamique de la valeur de usage_count
                    return this.getDataValue("damage") * this.getDataValue("item_number");
                }
            },

            timestamps: false
        }
    );
};
