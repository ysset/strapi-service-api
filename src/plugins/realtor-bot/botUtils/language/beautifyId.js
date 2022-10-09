module.exports = (flatId) => {
    if (flatId < 10) return `#000${flatId}`;
    if (flatId > 10 && flatId < 100) return `#00${flatId}`;
    if (flatId > 100 && flatId < 1000) return `#0${flatId}`;
    return `#${flatId}`;
};
