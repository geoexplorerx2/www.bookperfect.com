import { ReactNode } from 'react';
import TYPES from "../../types/store"




const initialState: any = {
   isOpen: false,
   children: null
}


const NotificationSlice = (state = initialState, action: {type: string , payload : {isOpen: boolean, children: ReactNode}}) => {

    switch (action.type) {
        case TYPES.TRIGGER_NOTIFICATION:
            return {...state, children: action.payload.children, isOpen: action.payload.isOpen }
        default:
            return state
    }
}
export default NotificationSlice