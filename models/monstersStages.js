// Dans le modèle MonsterStages
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const MonsterStages = sequelize.define(
        "MonsterStages",
        {
            stageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'stages',
                    key: 'id'
                }
            },
            monsterId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'monsters',
                    key: 'id'
                }
            },
            timestamps: false
        }
    );

    // Définition de l'association avec Monsters
    const Monsters = sequelize.models.monsters;
    MonsterStages.belongsTo(Monsters, { foreignKey: 'monsterId' });

    return MonsterStages;
};
