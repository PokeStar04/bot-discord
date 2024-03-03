const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite"
});

const Tags = require("./models/tags.js")(sequelize, Sequelize.DataTypes);
const Users = require("./models/users.js")(sequelize, Sequelize.DataTypes);
const Shop = require("./models/shop.js")(sequelize, Sequelize.DataTypes);
const Items = require("./models/items.js")(sequelize, Sequelize.DataTypes);
const Monsters = require('./models/monsters.js')(sequelize, Sequelize.DataTypes);
const Stages = require('./models/stages.js')(sequelize, Sequelize.DataTypes);
const MonsterStages = require('./models/monstersStages.js')(sequelize, Sequelize.DataTypes);

// Monsters.belongsToMany(Stages, { through: MonsterStages });
// Stages.belongsToMany(Monsters, { through: MonsterStages });

module.exports = { Tags, Users, Shop, Items, Monsters, Stages, MonsterStages };
