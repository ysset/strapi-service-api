/**
 * @type {{modifyRequestWithUserData?: (function({msg: *, bot: *}): Promise<*&{msg: *, chatId: *, localisation: *, deleteById: function(*, *=): *, messageId: *, reply: function(*, *=): *, delete: function(*=): *, user: any}>), beautifyParams?: (function(*): *), getUser?: (function(*): Promise<{chatId: *, messageId: *, user: any}>), getFilePath: function(*): String, beautifyId?: (function(*): string), translateApartments?: (function(*): *), getMonth?: (function(*, *): *), beautifyBigNum?: (function(*): *), actions: {realtor: {}, admin: {}, rent: {SEARCH_WRITE_AGENT: string, SEARCH_FLATS: string, SEARCH_FULL_DESCRIPTION: string, PREVIOUS_FLAT: string, SAVE: string}}|{rent?: {SEARCH_WRITE_AGENT: string, SEARCH_FLATS: string, SEARCH_FULL_DESCRIPTION: string, PREVIOUS_FLAT: string, SAVE: string}, realtor?: {}, admin?: {}}}}
 */
module.exports = {
    ...require('./localisation'),
    ...require('./user'),
    getFilePath: require('./getFilePath'),
    actions: require('./actions'),
};
