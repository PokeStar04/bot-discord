# Discord Clicker Bot

Discord Bot used as a template to learn Node.js.

## How to Install

- Clone the repository: `git clone https://github.com/PokeStar04/bot-discord`
- Create a config file in the base directory with the following fields:

  ```json
  {
    "token": "Your Bot Token Here",
    "clientId": "Your Bot Application ID Here",
    "guildId": "The Guild ID (you can get it by right-clicking the guild icon while in developer mode)"
  }
  ```

- npm i to install dependencies
- node dbInit.js Inisalizate database
- node dbMigrate.js Migrate intial data in db
- node deployCommands.js to register your commands in the guild
- node index.js to launch the Bot

## How to Play

Use the `/login` command to add userData in the database.
Use the `/play` command to launch the game.
