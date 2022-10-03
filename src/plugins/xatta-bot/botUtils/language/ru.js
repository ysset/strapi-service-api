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
        text: 'Изменить фильтры',
    },
    START: {
        text: '/start',
        regex: /\/start/,
    },
    NO_FLATS: `Вы посмотрели все объекты по заданным фильтрам!`,
    NO_USERNAME:
        'Для корректной работы сервиса установите себе имя пользователя Telegram в настройках.\n' +
        'После установки напишите в чат старт\n' +
        '\n' +
        'Username - Ваше имя пользователя в Telegram.\n' +
        'Пошаговая инструкция по установке имени пользователя.\n' +
        '\n' +
        ' 1. Нажмите кнопку «Настройки» в правом нижнем углу экрана\n' +
        '\n' +
        ' 2. Нажмите кнопку «Изм.» в правом верхнем углу экрана\n' +
        '\n' +
        ' 3. Нажмите на графу «Имя пользователя» в середине экрана\n' +
        '\n' +
        ' 4. Придумайте и впишите имя пользователя в свободную графу, затем нажмите «Готово» в верхнем правом углу\n' +
        '\n' +
        ' 5. Вернитесь в сервис и напишите в чат старт\n' +
        '\n' +
        'Готово! Теперь сервис работает корректно! Приятного использования!',
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
        text: 'Повторный поиск по фильтрам',
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
                    'Объект:\n\n' +
                    `${title}\n\n` +
                    `${city}, район ${district}\n\n` +
                    `ID: ${beautifyId(flatId)}\n\n\n` +
                    `Менеджер агентства ${process.env.AGENCY_NAME} свяжется с Вами в ближайшее время и ответит на любой Ваш вопрос!\n` +
                    'Вы также можете связаться с менеджером по данной ссылке:\n' +
                    `https://t.me/${agentUsername}`
                );
            },
            villa: (params) => {
                const { title, agentUsername, flatId, city, district } = beautifyParams(params);
                return (
                    'Благодарим Вас за использование нашего сервиса!\n\n' +
                    'Объект:\n\n' +
                    `${title}\n\n` +
                    `${city}, район ${district}\n\n` +
                    `ID: ${beautifyId(flatId)}\n\n\n` +
                    `Менеджер агентства ${process.env.AGENCY_NAME} свяжется с Вами в ближайшее время и ответит на любой Ваш вопрос!\n` +
                    'Вы также можете связаться с менеджером по данной ссылке:\n\n' +
                    `https://t.me/${agentUsername}`
                );
            },
            owner: (params) => {
                const { title, agentUsername, flatId, city, district } = beautifyParams(params);
                return (
                    'Благодарим Вас за использование нашего сервиса!\n\n' +
                    'Объект:\n\n' +
                    `${title}\n\n` +
                    `${city}, район ${district}\n\n` +
                    `ID: ${beautifyId(flatId)}\n\n\n` +
                    `Менеджер агентства ${process.env.AGENCY_NAME} свяжется с Вами в ближайшее время и ответит на любой Ваш вопрос!\n` +
                    'Вы также можете связаться с менеджером по данной ссылке:\n\n' +
                    `https://t.me/${agentUsername}`
                );
            },
        },
        realtorText: (params) => {
            const { username, flatId, city, district } = beautifyParams(params);
            return (
                'Здравствуйте! \n' +
                '\n' +
                `Пользователь https://t.me/${username} интересуется данным объектом \n` +
                '\n' +
                `ID: ${beautifyId(flatId)} \n` +
                `Город: ${city} \n` +
                `Район: ${district} \n\n` +
                'Пожалуйста, ответьте клиенту как можно скорее!'
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
                `<b>${title}</b>\n\n` +
                `<b>Цена от € ${beautifyBigNum(cost)}</b>\n\n` +
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
                `<b>${title}</b>\n\n` +
                `<b>Цена от € ${beautifyBigNum(cost)}</b>\n\n` +
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
                `<b>${title}</b>\n\n` +
                `<b>Цена: ${beautifyBigNum(cost)}</b>\n\n` +
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
        owner: (params, favorite) => {
            let { title, layout, area, floors, city, district, cost } = beautifyParams(params);
            floors = floors?.map((el) => el.floor).join(floors.length > 1 ? ' и ' : '');

            return (
                `<b>${title}</b>\n\n` +
                `Апартаменты${layout}, ${area} м², ${floors} этаж.\n` +
                `${city}, район ${district}.\n\n` +
                `<b>${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ Эта квартира в избранном ❤️' : ''}`
            );
        },
        complex: (params, favorite) => {
            let { apartments, city, district, cost, title } = beautifyParams(params);
            apartments = translateApartments(apartments);

            return (
                `<b>${title}</b>\n\n` +
                `${city}, район ${district}.\n\n` +
                `Апартаменты:\n${apartments}\n\n` +
                `<b>от ${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ Этот комплекс в избранном ❤️' : ''}`
            );
        },
        villa: (params, favorite) => {
            let { apartments, city, district, cost, title } = beautifyParams(params);
            apartments = translateApartments(apartments);

            return (
                `<b>${title}</b>\n\n` +
                `${city}, район ${district}.\n\n` +
                `Апартаменты:\n${apartments}\n\n` +
                `<b>от ${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ Эта вилла в избранном ❤️' : ''}`
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
        text: 'Сохранить ❤️',
    },
    NEXT_INLINE: {
        text: 'Далее',
    },
};
