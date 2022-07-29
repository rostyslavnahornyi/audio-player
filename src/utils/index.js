export const secondsToHMS = (time) => {
    return new Date(time * 1000)
        .toISOString()
        .substr(12, 7)
};
