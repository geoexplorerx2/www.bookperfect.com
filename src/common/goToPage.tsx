export const goToPage = (link: string, type: string, close: boolean = false) => {
    // window.location.replace(link);
    switch (type) {
        case 'redirect':
            let open = window.open(link, '_blank');
            if(close){
                setTimeout(function closeTab(){
                    open && open.close();
                }, 1000);
            };
            break;
        case 'local':
            window.location.replace(link);
            break;
        default:
            window.location.replace(link);
            break;
    }
};