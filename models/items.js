const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "items",
        {
            item_name: {
                type: Sequelize.STRING,
                unique: true
            },
            damage: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            price: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            bonus: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            passive: Sequelize.BOOLEAN,
            timestamps: false
        }
    );
};
