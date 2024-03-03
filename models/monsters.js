const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "monsters",
        {
            monster_name: {
                type: Sequelize.STRING,
                unique: true,
            },
            health: {
                type: Sequelize.INTEGER,
                defaultValue: 10,
            },
            max_health: {
                type: Sequelize.INTEGER,
                defaultValue: 10,
            },
            gold: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            },
            level: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
            }, image_path: Sequelize.STRING,
            timestamps: false,
        }
    );
};

