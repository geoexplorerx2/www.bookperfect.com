export default function ULtoArray(ul: any) {
    let div = document.createElement('div');
    div.innerHTML = ul;

    // TODO: check ul type as HTML element / ul tag
    let list = div.getElementsByTagName('li');

    let data = [];

    for (let i = 0; i < list.length; i++) {
        data.push({text: list[i].innerText});
    };

    return data;
};