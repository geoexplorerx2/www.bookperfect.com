import TYPES from "../../types/store";

const getInitialLang = () => {
    const langFromURL = window.location.pathname.split('/')[1] 
    
   const initialLang =  langFromURL.length > 1 ? langFromURL : 'en'

   return initialLang
}

const initialState = {
    lang: getInitialLang()
};

// signin reducer
export const LanguagesReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TYPES.LANGUAGE:
            return {...state, lang: action.payload};
        default:
            return state;
    }
};