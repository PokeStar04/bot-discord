const { createCanvas, loadImage } = require('@napi-rs/canvas');
const { request } = require('undici');
const { Users, Stages, Monsters, MonsterStages } = require("../dbObjects.js");
const { getCurrentMonsterInfo } = require('./monsterUtils');
const path = require('path');
const fs = require('fs');
const coinEmoji = "💰";
async function generateCanvas(interaction) {
    const myUser = interaction.user.username;
    const userData = await Users.findOne({ where: { username: myUser } });
    const currentStage = userData.current_stage;

    const canvas = createCanvas(700, 450);
    const context = canvas.getContext('2d');

    const background = await loadImage('./wallpaper.jpg');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#0099ff';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    const { body } = await request(interaction.user.displayAvatarURL({ extension: 'jpg' }));
    const chunks = [];
    for await (const chunk of body) {
        chunks.push(chunk);
    }
    const avatarBuffer = Buffer.concat(chunks);
    const avatar = await loadImage(avatarBuffer);
    // Calculer le rayon du cercle en fonction de la taille de l'avatar
    const avatarSize = Math.min(avatar.width, avatar.height);
    const circleRadius = avatarSize / 2;

    context.save();

    context.beginPath();

    context.arc(125 + circleRadius, 125 + circleRadius, circleRadius, 0, Math.PI * 2, true);

    context.clip();

    context.drawImage(avatar, 125, 125, avatarSize, avatarSize);

    context.restore();


    context.font = '24px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText(interaction.member.displayName, 20, canvas.height - 250);

    const damageTxt = String("Damage : " + userData.click_value + " ");
    const goldTxt = String("Gold : " + userData.gold + " ");
    const score = String("Score : " + userData.click_count);
    const positionGoldTxt = { x: 90, y: 40 };
    const positionDamageTxt = { x: 300, y: 40 };
    const positionScore = { x: 510, y: 40 }; context.fillText(damageTxt, positionDamageTxt.x, positionDamageTxt.y);

    context.fillText(goldTxt, positionGoldTxt.x, positionGoldTxt.y);
    context.fillText(score, positionScore.x, positionScore.y);

    const currentMonster = await getCurrentMonsterInfo(currentStage, myUser);
    const imagePath = currentMonster.image_path ? path.resolve(__dirname, currentMonster.image_path) : path.resolve(__dirname, './aigle.png');

    if (fs.existsSync(imagePath)) {
        const monsterImage = await loadImage(imagePath);
        context.drawImage(monsterImage, 250, 225, 200, 200);
    } else {
        console.log("Le fichier d'image n'existe pas :", imagePath);
    }

    const maxHealth = currentMonster.max_health;
    const currentHealth = currentMonster.health;
    const barWidth = 200;
    const barHeight = 20;
    const barX = 250;
    const barY = 190;
    const healthBarWidth = (currentHealth / maxHealth) * barWidth;

    // Dessiner le rectangle blanc en arrière-plan
    context.fillStyle = '#FFFFFF';
    context.fillRect(barX, barY, barWidth, barHeight);

    // Dessiner le rectangle vert en avant-plan pour représenter la vie actuelle du monstre
    if (currentHealth / maxHealth > 0.5) {
        context.fillStyle = '#00FF00';
    } else if (currentHealth / maxHealth > 0.2) {
        context.fillStyle = '#FFFF00';
    } else {
        context.fillStyle = '#FF0000';
    }
    context.fillRect(barX, barY, healthBarWidth, barHeight);

    // Dessiner le contour noir de la barre de vie
    context.strokeStyle = '#000000';
    context.strokeRect(barX, barY, barWidth, barHeight);

    context.fillStyle = '#FFFFFF'; // Définir la couleur du texte en blanc

    const monsterHealthTxt = String(currentMonster.health + "/" + currentMonster.max_health);
    const positionMonsterHealthTxt = { x: 320, y: 180 };
    context.fillText(monsterHealthTxt, positionMonsterHealthTxt.x, positionMonsterHealthTxt.y);

    return canvas;
}

module.exports = generateCanvas;