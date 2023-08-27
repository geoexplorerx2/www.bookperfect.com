// program to convert first letter of a string to uppercase
export const capitalizeFirstLetter = (string: string) => {
    const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized;
};