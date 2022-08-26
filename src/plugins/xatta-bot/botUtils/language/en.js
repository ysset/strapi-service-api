module.exports = {
    lang: 'en',
    WELCOME:
        'At your choice, all new buildings directly from the developer. For a comfortable search, use filters!',
    MENU_BUTTON: 'Menu',
    CONTROL_PANEL: {
        text: 'control panel',
    },
    START: {
        text: '/start',
        regex: /\/start/,
    },
    NO_FLATS: 'Unfortunately the flats are over(',
    SERVER_ERROR: 'Sorry, an error occurred, please try again or later!',
    SAVED: 'Added to favorites',
    FAVORITE: {
        text: 'Saved❤️',
    },
    SELECT_SUBGROUP: {
        text: 'Select subgroup',
    },
    FAVORITE_HOUSINGS: {
        text: 'Property ❤️',
    },
    SEARCH: {
        text: 'Search 🔍',
    },
    SEARCH_FLATS: {
        text: 'Property 🔍',
    },
    REPEAT_SEARCH_FLATS: {
        text: 'Search Properties again',
    },
    NO_FAVORITE_NOW: "You don't have any real estate saved yet!",
    UN_AUTHORIZE: "It seems we couldn't find the featured apartments, please restart the bot!",
    WRITE_AGENT_INLINE: {
        text: 'Contact agent',
    },
    WRITE_AGENT: {
        userText: (username, agentUsername) =>
            `${username} here is a link to the realtor https://t.me/${agentUsername}. \nPlease text him =) `,
        realtorText: (username, agentUsername) =>
            `${agentUsername} user https://t.me/${username} is interested in your apartment. `,
        orderInfo: ({ id, name, cost, city, district, locationUrl, paymentMethod }) =>
            `Apartment: \nid: ${id} \nName: ${name} \nPrice: ${cost} \nAddress: ${city} ${district}${
                locationUrl ? ` \nLocation: ${locationUrl}` : ''
            } \n${paymentMethod}`,
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
        apartments = apartments?.map((el) => el.layout + ' ');
        infrastructure = infrastructure?.map((el) => el.title + '\n');
        apartmentEquipment = apartmentEquipment?.map((el) => el.title + '\n');
        const main = `Name: ${name}\nDeveloper: ${developerName}\nPrice from: ${cost}\n${
            apartments ? `Layouts: ${apartments}` : ''
        }\nAddress: ${city} ${district}\nTo the sea: ${metersFromTheSea}\nOn the map: ${locationUrl}`;
        const second = `\nDescription: ${caption}\nArea: ${area}\nAmenities: ${infrastructure}\nFittings and furniture: ${apartmentEquipment}\n\nCompletion date: ${constructionCompletionDate}`;
        return main + second;
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => {
            if (flatId < 10) return `Apartment id: #000${flatId} \nSelect action:`;
            if (flatId > 10 && flatId < 100) return `Apartment id: #00${flatId} \nSelect action:`;
            if (flatId > 100 && flatId < 1000) return `Apartment id: #0${flatId} \nSelect action:`;
            return `Apartment id: ${flatId} \nSelect action:`;
        },
    },
    GO_BACK_ACTION: {
        text: '<<Back',
    },
    DELETE_ACTION: {
        text: 'Remove from favorites',
    },
    DELETED: {
        text: 'The apartment has been removed from favorites.',
    },
    FULL_DESCRIPTION: {
        text: 'Detailed description',
    },
    SAVE_INLINE: {
        text: 'Save',
    },
    NEXT_INLINE: {
        text: 'Next',
    },
};
