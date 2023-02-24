export const handleNumberFormat = (number, item = '') => {
    if (number === 0 && item === 'vote') return item;
    else if (Math.floor(number / 1000) === 0) return number;
    else if (Math.floor(number / 1000000) === 0) return (number / 1000).toFixed(1) + 'k';
    else if (Math.floor(number / 1000000000) === 0) return (number / 1000000).toFixed(1) + 'M';
    else if (Math.floor(number / 1000000000000) === 0) return (number / 1000000000).toFixed(1) + 'G';
    return '';
}