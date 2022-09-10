const beautifyId = require('./beautifyId');

const translateApartments = (apartments) =>
    apartments
        ?.map(({ layout = String, area = Number }) => {
            if (layout.includes('Duplex')) {
                if (layout.includes('Garden')) {
                    return 'Гарден-дуплекс' + layout.replace('Garden Duplex', '') + `${area} м²`;
                }
                return 'Дуплекс' + layout.replace('Duplex', '') + `${area} м²`;
            }
            return `Апартаменты:\n${layout.trim()} ${area} м²`;
        })
        .join('\n');
module.exports = {
    lang: 'ru',
    WELCOME: {
        first:
            'Здравствуйте!\n\n' +
            'Представляем Вам умный каталог для выбора недвижимости в Турции!\n' +
            'На Ваш выбор роскошные виллы и апартаменты в новостройках напрямую от застройщиков!\n\n' +
            'Наша цель, объединив все объекты недвижимости в этом каталоге, помочь Вам с комфортом приобрести новое жилье в Турции!\n\n' +
            'Для начала работы нажмите «Старт».\n\n' +
            'По вопросам сотрудничества @oknemzuk_gelo',
        second:
            'На Ваш выбор роскошные виллы и апартаменты в новостройках напрямую от застройщиков!\n' +
            'Для комфортного поиска используйте фильтры.',
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
    HOUSING_FULL_DESCRIPTION: {
        complex: ({
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
            apartments = translateApartments(apartments);
            infrastructure = infrastructure?.map((el) => el.title.trim()).join('\n');
            apartmentEquipment = apartmentEquipment?.map((el) => el.title.trim()).join(', ');
            return (
                `Комплекс: ${name} \n\n` +
                `Застройщик: ${developerName} \n\n` +
                `Цена от € ${cost} \n\n` +
                `Город: ${city} \n\n` +
                `Район: ${district} \n\n` +
                `Геолокация: ${locationUrl} \n\n` +
                `До Средиземного моря: ${metersFromTheSea}м \n` +
                `${apartments ? `\nПланировки: \n${apartments} \n\n` : ''}` +
                `Описание комплекса: \n` +
                `${caption} Площадь территории комплекса: ${area}. Фурнитура апартаментов: ${apartmentEquipment} \n\n` +
                `Инфраструктура комплекса: \n` +
                `${infrastructure} \n\n` +
                `Сдача объекта: ${constructionCompletionDate}`
            );
        },
        owner: ({
            cost,
            code,
            city,
            district,
            neighborhood,
            layout,
            area,
            floors,
            heatingType,
            furniture,
            yearOfConstruction,
            infrastructure,
            metersFromTheSea,
        }) => {
            infrastructure = infrastructure?.map((el) => el.title.trim()).join('\n');
            floors = floors?.map((el) => el.floor).join(' и ');
            return (
                `Цена: ${cost}\n` +
                '\n' +
                `Код: ${code}\n` +
                '\n' +
                `Город: ${city}\n` +
                `Район: ${district}\n` +
                `Микрорайон: ${neighborhood}\n` +
                '\n' +
                `Апартаменты: ${layout}, ${area} м²\n` +
                `Этаж: ${floors}\n` +
                `Отопление: ${heatingType}\n` +
                `Мебель: ${furniture}\n` +
                `Год постройки: ${yearOfConstruction}\n` +
                '\n' +
                `Инфраструктура комплекса: ${infrastructure}\n` +
                '\n' +
                `До Средиземного моря: ${metersFromTheSea}м\n`
            );
        },
    },
    SHORT_DESCRIPTION: {
        owner: ({ layout, area, floors, city, district, cost }) => {
            floors = floors?.map((el) => el.floor).join(floors.length > 1 ? ' и ' : '');
            cost = cost.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
            return (
                `Апартаменты${layout}, ${area} м², ${floors} этаж.\n` +
                `${city}, район ${district}.\n` +
                '\n' +
                `${cost} €\n`
            );
        },
        complex: ({ apartments, city, district, cost }) => {
            apartments = translateApartments(apartments);
            cost = cost.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
            return `${apartments}\n` + `${city}, район ${district}.\n` + '\n' + `${cost} €\n`;
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
