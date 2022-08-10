module.exports = {
    lang: 'en',
    WELCOME: 'Welcome to Xatta Bot!',
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
        orderInfo: ({ id, title, cost, city, district, locationUrl, paymentMethod }) =>
            `Apartment: \nid: ${id} \nName: ${title} \nPrice: ${cost} \nAddress: ${city} ${district}${
                locationUrl ? ` \nLocation: ${locationUrl}` : ''
            } \n${paymentMethod}`,
    },
    HOUSING_FULL_DESCRIPTION: ({
        title,
        id,
        cost,
        city,
        housingArea,
        rooms,
        locationUrl,
        caption,
        metersFromTheSea,
        constructionCompletionDate,
    }) =>
        `${title}/id: ${id} \nPrice: ${cost} | City: ${city} ${
            housingArea ? `\nArea ${housingArea} m2 |` : ''
        } ${rooms ? `Rooms: ${rooms}` : ''} \nLocation: ${locationUrl} ${
            metersFromTheSea ? `\nTo sea: ${metersFromTheSea} m` : ''
        } ${
            constructionCompletionDate ? `\nCompletion Date: ${constructionCompletionDate}` : ''
        } \n\n${caption}`,
    CHOOSE_THE_ACTION: {
        text: (flatId) => `Apartment number: ${flatId} \nSelect action:`,
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
    FIRST_TIME_START_PRESS: {
        text:
            'Catalogue-bot for selecting real estate\n' +
            '\n' +
            '\n' +
            '\n' +
            ' • Why would you need me?\n' +
            '\n' +
            "I'll make it easy for you to choose any property.\n" +
            "Now you won't need to scroll through profile telegram channels for a long time, trying to save your favorite options somewhere, just press the 'Next➡'️ button to view it, if you like some apartment, the 'Save❤️' button\n" +
            '\n' +
            'You can look for an apartment for yourself, see the prices for housing in Alanya, immediately book and buy the option you like.\n' +
            '\n' +
            ' • What can I do?\n' +
            '\n' +
            'More about commands\n' +
            '\n' +
            'Would you like to explore the catalog? — Press "Search🔍"\n' +
            '\n' +
            'Review favorite options? — "Saved❤️"\n' +
            '\n' +
            'Missing command buttons? - Click on the icon to the left of the microphone\n' +
            '\n' +
            'Keep your favorite apartment? - "Save❤️" (When you save an apartment, it disappears from the general list and appears in the "Saved❤️" tab)\n' +
            '\n' +
            'Go to the next apartment? - "Next➡️"\n' +
            '\n' +
            'Contact the seller? - "Contact📶"\n' +
            '\n' +
            'Need help? - Press "Menu", then "Help".\n' +
            '\n' +
            '\n' +
            'Also, I have a handy segmentation.\n' +
            '\n' +
            ' 1. Under construction.\n' +
            '\n' +
            'Do you want to invest in real estate? \n' +
            'Then feel free to choose this item, we add the best real estate options from the foundation pit to the final finish.\n' +
            '\n' +
            '2. New buildings.\n' +
            '\n' +
            'Do you want to buy an apartment in a new house?\n' +
            "Here's the best option for you, from singles to duplexes.\n" +
            '\n' +
            ' 3. Resale.\n' +
            '\n' +
            'If you want to buy an apartment on a budget, study this market segment. Sometimes, real diamonds appear here)\n' +
            '\n' +
            '4. Villas.\n' +
            '\n' +
            'Elite real estate. \n' +
            'In addition to the obvious advantages like owning a territory and a swimming pool, you will have the opportunity to get Turkish citizenship almost instantly.\n' +
            '\n' +
            '\n' +
            'Ability to contact the seller directly from the bot.\n' +
            '\n' +
            'Have you chosen an apartment for yourself? - You can safely click on the "Contact📶" button. A chat will open where you can clarify any details you are interested in and agree on the purchase of real estate.\n',
    },
};
