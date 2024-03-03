const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "stages",
        {
            stages_level: {
                type: Sequelize.INTEGER,
            },
            monster_number: {
                type: Sequelize.INTEGER,
                defaultValue: 5,
            },

            timestamps: false
        }
    );
};
