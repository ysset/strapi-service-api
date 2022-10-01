const beautifyId = require('./beautifyId');
const beautifyMonth = require('./getMonth');

const translateApartments = (apartments) =>
    apartments
        ?.map(({ layout = String, area = Number }) => {
            if (layout.includes('Duplex')) {
                if (layout.includes('Garden')) {
                    return 'Гарден-дуплекс' + layout.replace('Garden Duplex', ',') + `${area} м²`;
                }
                return 'Дуплекс' + layout.replace('Duplex', ',') + `${area} м²`;
            }
            return `${layout.trim()}, ${area} м²`;
        })
        .join('\n');

const beautifyParams = (params) => {
    for (let param in params) {
        if (params[param] === null || !params[param]) params[param] = 'неизвестно';
    }
    return params;
};

const beautifyBigNum = (cost) => cost.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

module.exports = {
    lang: 'ru',
    WELCOME: {
        first:
            '🇹🇷Турция сегодня — одна из самых удобных и безопасных стран для переезда. \n' +
            '\n' +
            'Здесь иностранцы могут быстро получить вид на жительство и даже турецкий паспорт, а сама Турция — гостеприимная и радушная страна с теплым морем. \n' +
            '\n' +
            'Осталось подобрать жилье! 🏡',
        second: 'На Ваш выбор роскошные виллы и апартаменты в новостройках, а также широкий выбор объектов недвижимости от собственников!',
    },
    MENU_BUTTON: 'Меню',
    CONTROL_PANEL: {
        text: 'Поиск по фильтрам',
    },
    START: {
        text: '/start',
        regex: /\/start/,
    },
    NO_FLATS: 'К сожалению по вашему запросу ничего не найдено, пожалуйста измените фильтры',
    NO_USERNAME:
        'Для использования данного бота пожалуйста установите имя пользователя(username) в настройках Telegram\n' +
        'Для повторного запуска бота напишите "старт" в чат.',
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
        text: 'Связаться с агентом',
    },
    WRITE_INLINE: {
        complex: {
            text: 'Связаться с агентом',
        },
        villa: {
            text: 'Связаться с агентом',
        },
        owner: {
            text: 'Связаться с собственником',
        },
    },
    WRITE_AGENT: {
        userText: {
            complex: (params) => {
                const { title, agentUsername, flatId, city, district } = beautifyParams(params);
                return (
                    'Благодарим Вас за использование нашего сервиса!\n\n' +
                    `${title}\n\n` +
                    `${city}, район: ${district}\n\n` +
                    `ID: ${beautifyId(flatId)}\n\n` +
                    `Менеджер агентства Eagle Group Real Estate & Invest ответит на любой Ваш вопрос!\n\n` +
                    `https://t.me/${agentUsername}`
                );
            },
            villa: (params) => {
                const { title, agentUsername, flatId, city, district } = beautifyParams(params);
                return (
                    'Благодарим Вас за использование нашего сервиса!\n\n' +
                    `${title}\n\n` +
                    `${city}, район: ${district}\n\n` +
                    `ID: ${beautifyId(flatId)}\n\n` +
                    `Менеджер агентства Eagle Group Real Estate & Invest ответит на любой Ваш вопрос!\n\n` +
                    `https://t.me/${agentUsername}`
                );
            },
            owner: (params) => {
                const { agentUsername, layout, area, city, district, neighborhood } = beautifyParams(params);
                return (
                    'Здравствуйте! \n\n' +
                    'Благодарим Вас за использование нашего сервиса!\n\n' +
                    `Апартаменты: ${layout}, ${area} м²\n\n` +
                    `Город: ${city} \n\n` +
                    `Район: ${district} \n\n` +
                    `Микрорайон: ${neighborhood}\n\n` +
                    'Представитель собственника ответит на любой ваш вопрос, для связи с ним перейдите по ссылке!\n\n' +
                    `https://t.me/${agentUsername}`
                );
            },
        },
        realtorText: (params) => {
            const { username, flatId, city, district, table } = beautifyParams(params);
            return (
                'Здравствуйте! \n' +
                '\n' +
                `Пользователь https://t.me/${username} интересуется данным объектом \n` +
                '\n' +
                `ID: ${beautifyId(flatId)} \n` +
                `Город: ${city} \n` +
                `Район: ${district} \n\n` +
                'Пожалуйста, ответьте ему как можно скорее!\n\n' +
                'Ссылка на объект:\n' +
                `https://xatta.ru/admin/content-manager/collectionType/api::${table.toLowerCase()}.${table.toLowerCase()}/${flatId}`
            );
        },
    },
    HOUSING_FULL_DESCRIPTION: {
        complex: (params) => {
            let {
                title,
                cost,
                apartments,
                city,
                district,
                metersFromTheSea,
                caption,
                area,
                infrastructure,
                apartmentEquipment,
                constructionCompletionDate,
            } = beautifyParams(params);
            apartments = translateApartments(apartments);
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            apartmentEquipment = apartmentEquipment?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            const [month, year] = constructionCompletionDate && constructionCompletionDate.split('.');
            let date = null;

            if (month && month <= 12 && year) date = `${beautifyMonth('ru', month)} ${year}`;

            return (
                `${title}\n\n` +
                `Цена от € ${beautifyBigNum(cost)}\n\n` +
                `Город: ${city}\n\n` +
                `Район: ${district}\n\n` +
                `Tерритория комплекса: ${beautifyBigNum(area)} м²\n\n` +
                `До Средиземного моря: ${beautifyBigNum(metersFromTheSea)} м\n\n` +
                `${caption}\n\n` +
                `${apartments ? `Планировки апартаментов: \n${apartments} \n\n` : ''}` +
                `В апартаментах:\n` +
                `${apartmentEquipment} \n\n` +
                `Инфраструктура комплекса: \n` +
                `${infrastructure} \n\n` +
                `Сдача объекта: ${date}\n\n`
            );
        },
        villa: (params) => {
            let {
                title,
                cost,
                city,
                district,
                metersFromTheSea,
                apartments,
                caption,
                infrastructure,
                apartmentEquipment,
                constructionCompletionDate,
            } = beautifyParams(params);
            apartments = translateApartments(apartments);
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            apartmentEquipment = apartmentEquipment?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            const [month, year] = constructionCompletionDate && constructionCompletionDate.split('.');
            let date = null;

            if (month && month <= 12 && year) date = `${beautifyMonth('ru', month)} ${year}`;

            return (
                `${title}\n\n` +
                `Цена от € ${beautifyBigNum(cost)}\n\n` +
                `Город: ${city}\n\n` +
                `Район: ${district}\n\n` +
                `До Средиземного моря: ${beautifyBigNum(metersFromTheSea)} м\n\n` +
                `${caption}\n\n` +
                `${apartments ? `Планировки: \n${apartments} \n\n` : ''}` +
                `В вилле:\n` +
                `${apartmentEquipment} \n\n` +
                `Инфраструктура: \n` +
                `${infrastructure} \n\n` +
                `${date ? `Сдача объекта: ${date}\n\n` : ''}`
            );
        },
        owner: ({
            cost,
            title,
            caption,
            city,
            district,
            neighborhood,
            layout,
            area,
            floors,
            furniture,
            yearOfConstruction,
            infrastructure,
            metersFromTheSea,
        }) => {
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            furniture = furniture?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            floors = floors?.map((el) => el.floor).join(' и ');

            return (
                `${title}\n\n` +
                `Цена: ${beautifyBigNum(cost)}\n\n` +
                `Город: ${city}\n\n` +
                `${district ? `Район: ${district}\n\n` : ''}` +
                `Микрорайон: ${neighborhood}\n\n` +
                `${
                    metersFromTheSea ? `До Средиземного моря: ${beautifyBigNum(metersFromTheSea)}м\n\n` : ''
                }` +
                `Этаж: ${floors}\n\n` +
                `Апартаменты: ${layout}, ${area} м²\n\n` +
                `${caption}\n\n` +
                `${furniture ? `В апартаментах:\n${furniture} \n\n` : ''}` +
                `${infrastructure ? `Инфраструктура:\n${infrastructure}\n\n` : ''}` +
                `${yearOfConstruction ? `Год постройки: ${yearOfConstruction}\n\n` : ''}`
            );
        },
    },
    SHORT_DESCRIPTION: {
        owner: (params) => {
            let { layout, area, floors, city, district, cost } = beautifyParams(params);
            floors = floors?.map((el) => el.floor).join(floors.length > 1 ? ' и ' : '');

            return (
                `Апартаменты${layout}, ${area} м², ${floors} этаж.\n` +
                `${city}, район ${district}.\n` +
                '\n' +
                `${beautifyBigNum(cost)} €\n`
            );
        },
        complex: (params) => {
            let { apartments, city, district, cost, title } = beautifyParams(params);
            apartments = translateApartments(apartments);

            return (
                `${title}\n\n` +
                `${city}, район ${district}.\n\n` +
                `Апартаменты:\n${apartments}\n\n` +
                `от ${beautifyBigNum(cost)} €`
            );
        },
        villa: (params) => {
            let { apartments, city, district, cost, title } = beautifyParams(params);
            apartments = translateApartments(apartments);

            return (
                `${title}\n\n` +
                `${city}, район ${district}.\n\n` +
                `Апартаменты:\n${apartments}\n\n` +
                `от ${beautifyBigNum(cost)} €`
            );
        },
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => `ID: ${beautifyId(flatId)} \nВыберите действие:`,
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
