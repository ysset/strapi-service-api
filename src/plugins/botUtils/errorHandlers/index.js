const {userLang} = require("../botsLanguages");
module.exports = {
  alanyaBot: {
    NO_FLATS: async () => strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_FLATS),
    NO_CARS: async () =>  strapi.bots.alanyaBot.sendMessage(chatId, userLang().NO_CARS),
    SERVER_ERROR: async () =>  strapi.bots.alanyaBot.sendMessage(chatId, userLang().SERVER_ERROR),
  },
  drInvest: {
    NO_FLATS: async () =>  strapi.bots.drInvest.sendMessage(chatId, userLang().NO_FLATS),
    NO_CARS: async () =>  strapi.bots.drInvest.sendMessage(chatId, userLang().NO_CARS),
    SERVER_ERROR: async () =>  strapi.bots.drInvest.sendMessage(chatId, userLang().SERVER_ERROR),
  }
}
