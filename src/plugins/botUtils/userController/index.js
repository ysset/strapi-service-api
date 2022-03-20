const {lang} = require("../botsLanguages");

module.exports = async ({msg}) => {
  const user = await strapi.entityService.findOne('api::telegram-user.telegram-user', 1, {
    where: {
      telegramID: msg.from.id
    },
    populate: "*",
  });


  if (!user)
    await strapi.entityService.create('api::telegram-user.telegram-user', {
      data: {
        telegramID: msg.from.id,
        language: lang.currLang,
        username: msg.from.username,
      }
    });

  lang.currLang = msg.from.language_code;

  return user;
};
