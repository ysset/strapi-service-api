/**
 * @type {{modifyRequestWithUserData?: (function({msg: *, bot: *}): Promise<*>), beautifyParams?: (function(*): *), dateStorage: {isDate: function(*): boolean, dates: Map<unknown, unknown>, createDateFilter: function({telegramID: *, date: *}): void, deleteDate: function(*): void}, getUser?: (function(*): Promise<{chatId: *, messageId: *, user: any}>), beautifyId?: (function(*): string), translateApartments?: (function(*): *), beautifyBigNum?: (function(*): *), eventStorage: {callEvent: function(*): unknown, clearEvents: function(*): void, createEvent: function({telegramID: *, event: *}): void, events: Map<unknown, unknown>, isEvent: function(*): boolean}, getFilePath: function(*): String, getDate: function(*): Promise<void>, getMonth?: (function(*, *): *), getUserInfo: function(*): Promise<void>, actions: {realtor: {}, admin: {}, rent: {SEARCH_WRITE_AGENT: string, SEARCH_FLATS: string, SEARCH_FULL_DESCRIPTION: string, PREVIOUS_FLAT: string, SAVE: string}}|{rent?: {SEARCH_WRITE_AGENT: string, SEARCH_FLATS: string, SEARCH_FULL_DESCRIPTION: string, PREVIOUS_FLAT: string, SAVE: string}, realtor?: {}, admin?: {}}}}
 */
module.exports = {
    ...require('./localisation'),
    ...require('./user'),
    getFilePath: require('./getFilePath'),
    actions: require('./actions'),
    getDate: require('./event/getDate'),
    getUserInfo: require('./event/getUserInfo'),
    dateStorage: require('./event/dateStorage'),
    eventStorage: require('./event/eventStorage'),
};
