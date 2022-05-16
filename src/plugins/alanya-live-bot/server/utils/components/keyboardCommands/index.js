const favoriteFunc = require('./favorite');
const favoriteCarsFunc = require('./favorite/favoriteCars');
const favoriteFlatsFunc = require('./favorite/favoriteFlats');
const search = require('./search');
const searchFlatsFunc = require('./search/searchFlats');
const repeatSearchFlatFunc = require('./search/repeatSearchFlats');
const searchCarsFunc = require('./search/searchCars');
const repeatSearchCarsFunc = require('./search/repeatSearchCars');

module.exports = {
    favorite: favoriteFunc,
    favoriteCars: favoriteCarsFunc,
    favoriteFlats: favoriteFlatsFunc,
    search,
    researchFlat: repeatSearchFlatFunc,
    searchCars: searchCarsFunc,
    searchFlats: searchFlatsFunc,
    researchCars: repeatSearchCarsFunc,
};
