const storage = {
    dates: new Map(),
    createDateFilter: ({ telegramID, date }) => {
        storage.deleteDate(telegramID);
        storage.dates.set(telegramID, date);
    },
    isDate: (telegramID) => storage.dates.has(telegramID),
    deleteDate: (telegramID) => {
        while (storage.isDate(telegramID)) storage.dates.delete(telegramID);
    },
};

module.exports = storage;
