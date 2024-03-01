const { Sequelize, DataTypes } = require("sequelize");


// const sequelize = new Sequelize("database", "username", "password", {
//     host: "localhost",
//     dialect: "sqlite",
//     logging: false,
//     storage: "database.sqlite"
// });


// const Objet = require("../../models/objets")(sequelize, DataTypes);


// Objet.create({
//     item_name: "Épée",
//     damage: 10,
//     passive: true
// }).then(epée => {
//     console.log("Épée créée :", epée.toJSON());
// }).catch(err => {
//     console.error("Erreur lors de la création de l'épée :", err);
// });

// // Créer la dague avec 4 de dégâts et passive à true
// Objet.create({
//     item_name: "Dague",
//     damage: 4,
//     passive: true
// }).then(dague => {
//     console.log("Dague créée :", dague.toJSON());
// }).catch(err => {
//     console.error("Erreur lors de la création de la dague :", err);
// });

module.exports = {
    data: {
        name: 'nom_de_la_commande',
        description: 'Description de la commande',
    },
    execute(interaction) {
        // Logique de la commande ici
    },
};
