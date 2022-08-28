const beautifyId = require('./beautifyId');

module.exports = {
    lang: 'ru',
    WELCOME:
        'На Ваш выбор роскошные виллы и апартаменты в новостройках напрямую от застройщиков!\n' +
        'Для комфортного поиска используйте фильтры.',
    MENU_BUTTON: 'Меню',
    CONTROL_PANEL: {
        text: 'Поиск по фильтрам',
    },
    START: {
        text: '/start',
        regex: /\/start/,
    },
    NO_FLATS: 'К сожалению квартиры закончились(',
    NO_CARS: 'К сожалению машины закончились(',
    SERVER_ERROR: 'К сожалению произошла ошибка, попробуйте еще раз или позже!',
    SAVED: 'Добавлено в избранное',
    FAVORITE: {
        text: 'Сохраненные❤️',
    },
    FAVORITE_HOUSINGS: {
        text: 'Недвижимость ❤️',
    },
    SEARCH: {
        text: 'Поиск 🔍',
    },
    COMPLETE_SEARCHING: {
        text: 'Продолжить поиск 🔍',
    },
    SELECT_SUBGROUP: {
        text: 'Выберите подгруппу',
    },
    REPEAT_SEARCH_FLATS: {
        text: 'Искать Недвижимость заново',
    },
    NO_FAVORITE_NOW: 'У вас пока нет сохраненной недвижимости!',
    UN_AUTHORIZE: 'Кажется мы не смогли найти избранные квартиры, пожалуйста перезапустите бота!',
    WRITE_AGENT_INLINE: {
        text: 'Связаться с застройщиком',
    },
    WRITE_AGENT: {
        userText: ({ agentUsername, flatId, developerName, city, district }) =>
            `Здравствуйте! \n` +
            '\n' +
            'Благодарим Вас за использование нашего сервиса!\n' +
            '\n' +
            `ID: ${beautifyId(flatId)} \n` +
            `Комплекс:\n` +
            `Застройщик: ${developerName} \n` +
            `Город: ${city} \n` +
            `Район: ${district} \n` +
            `Менеджер компании «${developerName}» https://t.me//${agentUsername} ответит на любой ваш вопрос!`,
        realtorText: ({ username, flatId, developerName, city, district }) =>
            'Здравствуйте! \n' +
            '\n' +
            `Пользователь https://t.me/${username} интересуется данным объектом \n` +
            '\n' +
            `ID: ${beautifyId(flatId)} \n` +
            'Комплекс: \n' +
            `Застройщик: ${developerName} \n` +
            `Город: ${city} \n` +
            `Район: ${district} \n` +
            '\n' +
            'Пожалуйста, ответьте ему от лица застройщика как можно скорее!',
    },
    HOUSING_FULL_DESCRIPTION: ({
        name,
        developerName,
        cost,
        apartments,
        city,
        district,
        metersFromTheSea,
        locationUrl,
        caption,
        area,
        infrastructure,
        apartmentEquipment,
        constructionCompletionDate,
    }) => {
        apartments = apartments
            ?.map(({ layout = String }) => {
                if (layout.includes('Duplex')) {
                    if (layout.includes('Garden')) {
                        return 'Гарден-дуплекс' + layout.replace('Garden Duplex', '');
                    }
                    return 'Дуплекс' + layout.replace('Duplex', '');
                }
                return 'Апартаменты' + layout;
            })
            .join('\n');
        infrastructure = infrastructure?.map((el) => el.title.trim()).join('\n');
        apartmentEquipment = apartmentEquipment?.map((el) => el.title.trim()).join(', ');
        return (
            `Комплекс: ${name} \n` +
            `Застройщик: ${developerName} \n` +
            `Цена от € ${cost} \n ` +
            `Город: ${city} \n` +
            `Район: ${district} \n ` +
            `Геолокация: ${locationUrl} \n ` +
            `До Средиземного моря: ${metersFromTheSea}м \n ` +
            `${apartments ? `Планировки: \n${apartments}` : ''} \n` +
            `Описание комплекса: \n` +
            `${caption} Площадь территории комплекса: ${area}. Фурнитура апартаментов: ${apartmentEquipment} \n ` +
            `Инфраструктура комплекса: \n` +
            `${infrastructure} \n` +
            `Сдача объекта: ${constructionCompletionDate}`
        );
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => `Id квартиры: ${beautifyId(flatId)} \nВыберите действие:`,
    },
    GO_BACK_ACTION: {
        text: '<<Назад',
    },
    DELETE_ACTION: {
        text: 'Удалить из избранного',
    },
    DELETED: {
        text: 'Квартира удалена из избранного.',
    },
    FULL_DESCRIPTION: {
        text: 'Подробное описание',
    },
    SAVE_INLINE: {
        text: 'Сохранить',
    },
    NEXT_INLINE: {
        text: 'Следующая',
    },
};
