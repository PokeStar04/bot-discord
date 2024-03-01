const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "objets",
        {
            item_name: {
                type: Sequelize.STRING,
                unique: true
            },
            damage: {
                type: Sequelize.INTEGER,
                defaultValue: 1,

            },
            passive: Sequelize.BOOLEAN,
            timestamps: false
        }
    );
};
