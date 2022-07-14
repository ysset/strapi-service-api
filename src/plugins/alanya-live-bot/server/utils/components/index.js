const { localisation, userLang } = require('../../../../botUtils/botsLanguages');
const getUser = require('../../../../botUtils/userController');
const callbacks = require('./componentList');

const index = {
    START: {
        regex: /\/start/,
        fn: async (msg) => {
            await getUser({ msg });

            Object.keys(index).forEach((key) => {
                index[key].regex = userLang()[key].regex;
            });

            await strapi.bots.alanyaBot.clearTextListeners();
            if (localisation.currentLang) {
                for (const command in index) {
                    strapi.bots.alanyaBot.onText(index[command].regex, async (msg) =>
                        index[command].fn({ ...msg, user: await getUser({ msg }) })
                    );
                }
            }
            return inlineCallBacks.ENTER_COMMAND(msg);
        },
    },

    FAVORITE_CARS: {
        regex: userLang()?.FAVORITE_CARS.regex,
        fn: callbacks.FAVORITE_CARS,
    },

    SEARCH_CARS: {
        regex: userLang()?.SEARCH_CARS.regex,
        fn: callbacks.SEARCH_CARS,
    },

    REPEAT_SEARCH_CARS: {
        regex: userLang()?.REPEAT_SEARCH_CARS.regex,
        fn: callbacks.REPEAT_SEARCH_CARS,
    },
};

const inlineCallBacks = {
    NEXT: callbacks.NEXT,
    SAVE: callbacks.SAVE,
    WRITE_AGENT: callbacks.WRITE_AGENT,
    SEARCH_FLATS: callbacks.SEARCH_FLATS,
    REPEAT_SEARCH_FLATS: callbacks.REPEAT_SEARCH_FLATS,
    FAVORITE: callbacks.FAVORITE,
    FAVORITE_FLATS: callbacks.FAVORITE_FLATS,
    FULL_DESCRIPTION: callbacks.FULL_DESCRIPTION,
    SEARCH: callbacks.SEARCH,
    ENTER_COMMAND: callbacks.ENTER_COMMAND,
};

/**
 * to send mach photos
 */
// for (let layout of photo.layoutPhoto) {
//   arrOfPhoto.push({
//     ...layout.formats.thumbnail,
//     media: `/Users/ysset/WebstormProjects/tgBotStrapi/public${layout.formats.medium.url}`,
//     type: 'photo'
//   });
// }

module.exports = {
    commands: index,
    inlineCallBacks,
};
