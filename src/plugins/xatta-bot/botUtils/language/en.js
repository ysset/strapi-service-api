const beautifyId = require('./beautifyId');
const beautifyMonth = require('./getMonth');

module.exports = {
    lang: 'en',
    WELCOME: {
        first:
            'Hello!\n\n' +
            'Introducing a smart directory for selecting real estate in Turkey!\n\n' +
            'Your choice of luxury villas and apartments in new buildings directly from developers!\n\n' +
            'Our goal is to bring together all the properties in this directory to help you comfortably buy a new home in Turkey!\n\n' +
            'Press Start to get started.\n\n' +
            'For cooperation @oknemzuk_gelo',
        second:
            'Your choice of luxury villas and apartments in new buildings directly from developers!\n' +
            'Use filters for a comfortable search.',
    },
    MENU_BUTTON: 'Menu',
    CONTROL_PANEL: {
        text: 'control panel',
    },
    START: {
        text: '/start',
        regex: /\/start/,
    },
    NO_FLATS: 'Sorry, no results were found for your search, please change your filters',
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
    COMPLETE_SEARCHING: {
        text: 'Continue searching 🔍',
    },
    REPEAT_SEARCH_FLATS: {
        text: 'Search Properties again',
    },
    NO_FAVORITE_NOW: "You don't have any real estate saved yet!",
    UN_AUTHORIZE: "It seems we couldn't find the featured apartments, please restart the bot!",
    WRITE_AGENT_INLINE: {
        text: 'Contact developer',
    },
    WRITE_AGENT: {
        userText: ({ agentUsername, flatId, developerName, city, district }) =>
            `Hello! \n` +
            '\n' +
            'Thank you for using our service!\n' +
            '\n' +
            `ID: ${beautifyId(flatId)} \n` +
            `Complex:\n` +
            `Developer: ${developerName} \n` +
            `City: ${city} \n` +
            `District: ${district} \n` +
            `The manager of the company "${developerName}" https://t.me//${agentUsername} will answer any of your questions!`,
        realtorText: ({ username, flatId, developerName, city, district }) =>
            'Hello! \n' +
            '\n' +
            `User https://t.me/${username} is interested in this object \n` +
            '\n' +
            `ID: ${beautifyId(flatId)} \n` +
            'Complex: \n' +
            `Developer: ${developerName} \n` +
            `City: ${city} \n` +
            `District: ${district} \n` +
            '\n' +
            'Please answer him on behalf of the developer as soon as possible!',
    },
    HOUSING_FULL_DESCRIPTION: ({
        name,
        developerName,
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
        yearOfConstruction,
    }) => {
        apartments = apartments?.map((el) => el.layout.trim()).join('\n');
        infrastructure = infrastructure?.map((el) => el.title.trim()).join('\n');
        apartmentEquipment = apartmentEquipment?.map((el) => el.title.trim()).join(', ');
        const [month, year] = constructionCompletionDate && constructionCompletionDate.split('.');
        const [monthOwner, yearOwner] = yearOfConstruction && yearOfConstruction.split('.');

        return (
            `Complex: ${name} \n` +
            `Developer: ${developerName} \n` +
            `Price from € ${cost} \n ` +
            `City: ${city} \n` +
            `${district ? `District: ${district} \n` : ''}` +
            `${metersFromTheSea ? `To the Mediterranean Sea: ${metersFromTheSea}m \n` : ''}` +
            `${apartments ? `Layouts: \n${apartments}` : ''} \n` +
            `Complex description: \n` +
            `${caption} Area of the complex: ${area}. Apartment furnishings: ${apartmentEquipment} \n ` +
            `Complex infrastructure: \n` +
            `${infrastructure}\n` +
            `${
                month && month <= 12 && year ? `Object handover: ${beautifyMonth('en', month)} ${year}` : ''
            } ` +
            `${
                monthOwner && month <= 12 && yearOwner
                    ? `Object handover: ${beautifyMonth('en', monthOwner)} ${yearOwner}`
                    : ''
            } `
        );
    },
    CHOOSE_THE_ACTION: {
        text: (flatId) => `Apartment id: ${beautifyId(flatId)} \nSelect action:`,
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
