const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "users",
        {
            username: {
                type: Sequelize.STRING,
                unique: true
            },
            click_value: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            click_count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            current_click: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );
};
