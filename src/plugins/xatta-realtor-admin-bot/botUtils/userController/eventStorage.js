const storage = {
    events: new Map(),
    createEvent: ({ telegramID, event }) => storage.events.set(telegramID, event),
    callEvent: (telegramID) => storage.events.get(telegramID.toString()),
    isEvent: (telegramID) => storage.events.has(telegramID.toString()),
};
module.exports = storage;
