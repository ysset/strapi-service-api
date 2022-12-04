/**
 * @param apartments
 * @returns {*}
 */
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

module.exports = translateApartments;
