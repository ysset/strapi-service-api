const lang = {
  currLang: null,
  ru: {
    WELCOME: "Добро пожаловать в DR.Invest Бот!",
    FAVORITE: {
      text: 'Закладки',
      regex: /Закладки/,
      description: "Квартиры которые вам понравились.",
      callback_data: "favorite"
    },
    SEARCH_FLAT: {
      text: 'Поиск квартир',
      regex: /Поиск квартир/,
      description: "Начать поиск новых квартир.",
    },
    NO_FAVORITE_NOW: "У вас пока нет сохраненных квартир!",
    UN_AUTHORIZE: "Кажется мы не смогли найти избранные квартиры, пожалуйста перезапустите бота!",
    WRITE_AGENT_INLINE: {
      text: "Написать агенту",
      callback_data: 'WRITE_AGENT',
    },
    SAVE_INLINE: {
      text: "Сохранить",
      callback_data: 'SAVE'
    },
    NEXT_INLINE: {
      text: "Следующая",
      callback_data: 'NEXT'
    },
  }
}

const userLang = () => {
  if (lang.currLang)
    return lang[lang.currLang]
};

module.exports = {
  userLang,
  lang
}
