const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "shop",
        {
            idUsers: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            idItems: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'items',
                    key: 'id'
                }
            },
            item_number: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            timestamps: false
        }
    );
};
