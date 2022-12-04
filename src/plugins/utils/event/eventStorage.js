const storage = {
    events: new Map(),
    createEvent: ({ telegramID, event }) => {
        if (!storage.isEvent(telegramID)) storage.events.set(telegramID, event);
    },
    callEvent: (telegramID) => storage.events.get(telegramID),
    isEvent: (telegramID) => storage.events.has(telegramID),
    clearEvents: (telegramID) => {
        while (storage.isEvent(telegramID)) storage.events.delete(telegramID);
    },
};
module.exports = storage;
