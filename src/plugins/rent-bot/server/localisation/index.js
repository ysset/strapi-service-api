const localisation = {
    ru: require('./ru'),
};

const userLang = (lang) => localisation[lang] || localisation.ru;
/**
 * @type {{userLang: (function(*)), localisation: {ru: {WELCOME: {first: string, second: string}, INPUT_ERROR: {date: string}, DELETED: {text: string}, WRITE_AGENT_INLINE: {text: string}, HOUSING_FULL_DESCRIPTION: function(*): string, SERVER_ERROR: string, UN_AUTHORIZE: string, SAVED: string, NO_USERNAME: string, FAVORITE: {text: string}, lang: string, FULL_DESCRIPTION: {text: string}, WRITE_AGENT: {userText: function(*): string, realtorText: function(*): string}, NO_FAVORITE_NOW: string, SEARCH: {text: string}, CONTROL_PANEL: {text: string}, COMPLETE_SEARCHING: {text: string}, DATE: string, SAVE_INLINE: {text: string}, SHORT_DESCRIPTION: function(*): string, NEXT_INLINE: {text: string}, REPEAT_SEARCH_FLATS: {text: string}, START: {regex: RegExp, text: string}, GO_BACK_ACTION: {text: string}, DELETE_ACTION: {text: string}, NO_FLATS: string}|{lang?: string, WELCOME?: {first: string, second: string}, INPUT_ERROR?: {date: string}, DATE?: string, CONTROL_PANEL?: {text: string}, START?: {regex: RegExp, text: string}, NO_FLATS?: string, NO_USERNAME?: string, SERVER_ERROR?: string, SAVED?: string, FAVORITE?: {text: string}, SEARCH?: {text: string}, COMPLETE_SEARCHING?: {text: string}, REPEAT_SEARCH_FLATS?: {text: string}, NO_FAVORITE_NOW?: string, UN_AUTHORIZE?: string, WRITE_AGENT_INLINE?: {text: string}, WRITE_AGENT?: {userText: function(*): string, realtorText: function(*): string}, HOUSING_FULL_DESCRIPTION?: function(*): string, SHORT_DESCRIPTION?: function(*): string, GO_BACK_ACTION?: {text: string}, DELETE_ACTION?: {text: string}, DELETED?: {text: string}, FULL_DESCRIPTION?: {text: string}, SAVE_INLINE?: {text: string}, NEXT_INLINE?: {text: string}}}}}
 */
module.exports = {
    userLang,
    localisation,
};
