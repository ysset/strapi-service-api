const favoriteCarsFunc = require('./favorite/favoriteCars');
const searchCarsFunc = require('./search/searchCars');
const repeatSearchCarsFunc = require('./search/repeatSearchCars');

module.exports = {
    favoriteCars: favoriteCarsFunc,
    searchCars: searchCarsFunc,
    researchCars: repeatSearchCarsFunc,
};
