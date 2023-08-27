// @ts-ignore
export const formatTurkishCharacters  = (word: string) => {
    var string = word;

    // turkish characters
    var letters: any = {
        "İ": "I",
        "Ş": "S",
        "Ğ": "G",
        "Ü": "U",
        "Ö": "O",
        "Ç": "C",
        "ı": "i",
        "ş": "s",
        "ğ": "g",
        "ü": "u",
        "ö": "o",
        "ç": "c"
    };

    string = string.replace(/(([İŞĞÜÖÇışğüöç]))+/g, letter => {
        var s = "";
        for (var i = 0; i < letter.length; i++) {
            s += letters[letter[i]];
        }
        
        return s;
    });

    return string;
};