import TYPES from "../../types/store";

// get the current link 
const href = window.location.pathname.split('/');

const initialState = {
    token: '',
    activemenu: {
        menu: 'My Profile',
        active: true,
        data: null,
        href: href[1]
    },
    userdata: '',
    socialloginsdk: '',
    userprofile: ''
};

// signin reducer
export const SigninReducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case TYPES.TOKEN:
            return {...state, token: action.payload};
        case TYPES.ACTIVE_PROFILE_SIDE_MENU:
            return {...state, activemenu: action.payload.menu};
        case TYPES.USER_DATA:
            return {...state, userdata: action.payload};
        case TYPES.USER_PROFILE:
            // console.log('user profile ==>', {action});
            return {...state, userprofile: action.payload};
        case TYPES.SOCIAL_LOGIN_SDK:
            return {...state, socialloginsdk: action.payload };
        case TYPES.RESET_ACTIVE_USER_MENU: 
            return {...state,  activemenu: {
                menu: '',
                active: true,
                data: null,
                href: null
            },}
        default:
            return state;
    }
};