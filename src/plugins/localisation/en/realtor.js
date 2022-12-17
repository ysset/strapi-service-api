const { beautifyId, translateApartments, getMonth, beautifyBigNum } = require('../../utils/localisation');

module.exports = {
    lang: 'en',
    WELCOME: {
        first:
            '🇹🇷Turkey today is one of the most convenient and safe countries to move to. \n' +
            '\n' +
            'Here foreigners can quickly get a residence permit and even a Turkish passport, and Turkey itself is a hospitable and welcoming country with a warm sea. \n' +
            '\n' +
            'It remains to find housing! 🏡',
        second: 'Your choice of luxury villas and apartments in new buildings, as well as a wide range of properties from the owners!',
    },
    GET_USER_INFO: 'To facilitate interaction, please enter your full name and phone number',
    ENTER_PHONE_NUMBER: 'Please verify your phone number to continue searching.',
    MENU_BUTTON: 'Menu',
    CONTROL_PANEL: {
        text: 'Filters 🔍',
    },
    INF_TOUR_BUTTON: {
        text: 'I want to take a free tour 🚀!',
    },
    INF_TOUR: 'You are signed up for a free tour! Our manager will contact you soon!',
    INF_TOUR_REALTOR: ({ username, phoneNumber }) =>
        `User wants info tour\n` +
        `${username ? `@${username}` : ''}\n` +
        `${phoneNumber ? `${phoneNumber}` : ''}`,
    CANCEL_INFO_TOUR_INLINE: {
        text: `'I don't want to go to info tour'`,
    },
    GET_USER_INFO_SUCCESS: '✅',
    START: {
        text: '/start',
        regex: /\/start/,
    },
    GET_USER_PHONE_BUTTON: {
        text: 'Confirm phone number and continue searching',
    },
    NO_FLATS: 'You have looked at all objects according to the given filters!',
    NO_USERNAME:
        'For the correct operation of the service, set your Telegram username in the settings.\n' +
        'After installation, text start\n' +
        '\n' +
        'Username - your username in Telegram.\n' +
        'Step by step instructions for setting the username.\n' +
        '\n' +
        ' 1. Click the "Settings" button in the lower right corner of the screen\n' +
        '\n' +
        ' 2. Press the "Change" button in the upper right corner of the screen\n' +
        '\n' +
        ' 3. Click on the "Username" field in the middle of the screen\n' +
        '\n' +
        ' 4. Think up and enter a username in the free field, then click "Done" in the upper right corner\n' +
        '\n' +
        ' 5. Go back to the service and chat start\n' +
        '\n' +
        'Ready! Now the service is working correctly! Enjoy using it!',
    SERVER_ERROR: 'Sorry, an error occurred, please try again or later!',
    SAVED: 'Added to favorites',
    FAVORITE: {
        text: 'Saved ❤️',
    },
    FAVORITE_HOUSINGS: {
        text: 'Property ❤️',
    },
    SEARCH: {
        text: 'Search 🔍',
    },
    COMPLETE_SEARCHING: {
        text: 'Continue searching 🔍',
    },
    SELECT_SUBGROUP: {
        text: 'Select a subgroup',
    },
    REPEAT_SEARCH_FLATS: {
        text: 'Search by filters again',
    },
    NO_FAVORITE_NOW: `You don't have any properties saved yet!`,
    UN_AUTHORIZE: `We don't seem to be able to find the featured items, please restart the bot!`,
    WRITE_AGENT_INLINE: {
        text: 'Contact agent',
    },
    WRITE_INLINE: {
        complex: {
            text: `I'm interested`,
        },
        villa: {
            text: `I'm interested`,
        },
        owner: {
            text: `I'm interested`,
        },
    },
    CANCEL_INTEREST_INLINE: { text: 'Cancel order' },
    CANCEL_INTEREST: {
        user: 'Your order has been cancelled',
        realtor: (params) => {
            const { username, phoneNumber } = params;
            return (
                'User:\n\n' +
                `${username ? `https://t.me/${username}\n` : ''}` +
                `${phoneNumber}\n\n` +
                'No longer interested in this object \n\n'
            );
        },
    },
    INPUT_ERROR: {
        phoneNumber: 'Please enter a valid phone number',
        fullName: 'Please enter a valid name',
    },
    WRITE_AGENT: {
        userText: {
            complex: ({ agentUsername }) => {
                return (
                    `Agency manager ${process.env.AGENCY_NAME} will contact you shortly and answer any of your questions!\n` +
                    '\n' +
                    'You can also contact the manager using this link:\n' +
                    `https://t.me/${agentUsername}`
                );
            },
            villa: ({ agentUsername }) => {
                return (
                    `Agency manager ${process.env.AGENCY_NAME} will contact you shortly and answer any of your questions!\n` +
                    '\n' +
                    'You can also contact the manager using this link:\n' +
                    `https://t.me/${agentUsername}`
                );
            },
            owner: ({ agentUsername }) => {
                return (
                    `Agency manager ${process.env.AGENCY_NAME} will contact you shortly and answer any of your questions!\n` +
                    '\n' +
                    'You can also contact the manager using this link:\n' +
                    `https://t.me/${agentUsername}`
                );
            },
        },
        realtorText: (params) => {
            const { username, flatId, city, district, phoneNumber } = params;
            return (
                'Hello! \n\n' +
                'User:\n' +
                `${username ? `https://t.me/${username}\n` : ''}` +
                `${phoneNumber}\n\n` +
                'Interested in this object \n\n' +
                `ID: ${beautifyId(flatId)} \n` +
                `City: ${city} \n` +
                `District: ${district} \n\n` +
                'Please reply to the customer as soon as possible!'
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
                paymentMethod,
            } = params;
            apartments = translateApartments(apartments);
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            apartmentEquipment = apartmentEquipment?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            const [month, year] = constructionCompletionDate && constructionCompletionDate.split('.');
            let date = null;

            if (month && month <= 12 && year) date = `${getMonth('ru', month)} ${year}`;

            return (
                `<b>${title}</b>\n\n` +
                `<b>Price from € ${beautifyBigNum(cost)}</b>\n\n` +
                `City: ${city}\n\n` +
                `District: ${district}\n\n` +
                `Complex area: ${beautifyBigNum(area)} m²\n\n` +
                `${
                    metersFromTheSea ? `To the Mediterranean: ${beautifyBigNum(metersFromTheSea)} \n\n` : ''
                }` +
                `${paymentMethod ? `Payment method: ${paymentMethod}\n\n` : ''}` +
                `${caption}\n\n` +
                `${apartments ? `Apartment plans: \n${apartments} \n\n` : ''}` +
                'Apartment:\n' +
                `${apartmentEquipment} \n\n` +
                'Complex infrastructure: \n' +
                `${infrastructure} \n\n` +
                `${date ? `Delivery object: ${date}\n\n` : ''}`
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
                paymentMethod,
            } = params;
            apartments = translateApartments(apartments);
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            apartmentEquipment = apartmentEquipment?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            const [month, year] = constructionCompletionDate && constructionCompletionDate.split('.');
            let date = null;

            if (month && month <= 12 && year) date = `${getMonth('ru', month)} ${year}`;

            return (
                `<b>${title}</b>\n\n` +
                `<b>Price from € ${beautifyBigNum(cost)}</b>\n\n` +
                `City: ${city}\n\n` +
                `District: ${district}\n\n` +
                `${
                    metersFromTheSea ? `To the Mediterranean: ${beautifyBigNum(metersFromTheSea)} m\n\n` : ''
                }` +
                `${paymentMethod ? `Payment method: ${paymentMethod}\n\n` : ''}` +
                `${caption}\n\n` +
                `${apartments ? `Layouts: \n${apartments} \n\n` : ''}` +
                'In the villa:\n' +
                `${apartmentEquipment} \n\n` +
                'Infrastructure: \n' +
                `${infrastructure} \n\n` +
                `${date ? `Delivery object: ${date}\n\n` : ''}`
            );
        },
        owner: (params) => {
            let {
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
                paymentMethod,
            } = params;
            infrastructure = infrastructure?.map((el) => '• ' + el.title.trim() + ';').join('\n');
            furniture = furniture?.map((el) => '- ' + el.title.trim() + ';').join('\n');
            floors = floors?.map((el) => el.floor).join(' and ');

            return (
                `<b>${title}</b>\n\n` +
                `<b>Price: ${beautifyBigNum(cost)}</b>\n\n` +
                `City: ${city}\n\n` +
                `${district ? `District: ${district}\n\n` : ''}` +
                `${neighborhood ? `Neighbourhood: ${neighborhood}\n\n` : ''}` +
                `${
                    metersFromTheSea ? `To the Mediterranean: ${beautifyBigNum(metersFromTheSea)}m\n\n` : ''
                }` +
                `Floor: ${floors}\n\n` +
                `Apartments: ${layout}, ${area} m²\n\n` +
                `${paymentMethod ? `Payment method: ${paymentMethod}\n\n` : ''}` +
                `${caption}\n\n` +
                `${furniture ? `In the apartment:\n${furniture} \n\n` : ''}` +
                `${infrastructure ? `Infrastructure:\n${infrastructure}\n\n` : ''}` +
                `${yearOfConstruction ? `Build year: ${yearOfConstruction}\n\n` : ''}`
            );
        },
    },
    SHORT_DESCRIPTION: {
        owner: (params, favorite) => {
            let { title, layout, area, floors, city, district, cost } = params;
            floors = floors?.map((el) => el.floor).join(floors.length > 1 ? ' and ' : '');

            return (
                `<b>${title}</b>\n\n` +
                `Apartments${layout}, ${area} m², ${floors} floor.\n` +
                `${city}, district ${district}.\n\n` +
                `<b>${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ This apartment is in favorites ❤️' : ''}`
            );
        },
        complex: (params, favorite) => {
            let { apartments, city, district, cost, title } = params;
            apartments = apartments.map(({ layout, area }) => `${layout}, ${area} м²`).join('\n');

            return (
                `<b>${title}</b>\n\n` +
                `${city}, district ${district}.\n\n` +
                `Apartments:\n${apartments}\n\n` +
                `<b>from ${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ This complex is in favorites ❤️' : ''}`
            );
        },
        villa: (params, favorite) => {
            let { apartments, city, district, cost, title } = params;
            apartments = apartments.map(({ layout, area }) => `${layout}, ${area} м²`).join('\n');

            return (
                `<b>${title}</b>\n\n` +
                `${city}, district ${district}.\n\n` +
                `Apartments:\n${apartments}\n\n` +
                `<b>from ${beautifyBigNum(cost)} €</b>\n\n` +
                `${favorite ? '❤️ This villa is favorite ❤️' : ''}`
            );
        },
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => `ID: ${beautifyId(flatId)} \nSelect action:`,
    },
    GO_BACK_ACTION: {
        text: '<<Back',
    },
    DELETE_ACTION: {
        text: 'Remove from favorites',
    },
    DELETED: {
        text: 'Object has been removed from favorites.',
    },
    FULL_DESCRIPTION: {
        text: 'Detailed description',
    },
    SAVE_INLINE: {
        text: 'Save ❤️',
    },
    NEXT_INLINE: {
        text: 'Next',
    },
    PREVIOUS_INLINE: {
        text: 'Back',
    },
};
