export default function SearchItemOfArray (objectname: string, key: string, array: any) {
    for (var i=0; i < array.length; i++) {
        if (array[i][objectname] === key) {
            return array[i];
        }
    }
};