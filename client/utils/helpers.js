export function Capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',  minute: 'numeric', second: 'numeric' };
    return date.toLocaleString(undefined, options);
};