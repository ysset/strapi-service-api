module.exports = (cost) => cost.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
