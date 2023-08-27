import { ReactNode } from 'react';
import TYPES from "../../types/store";
export const TriggerNotificationAction = (isOpen: boolean , children?: ReactNode) => {
    return async (dispatch: (arg0: { type: any; payload: {isOpen: boolean, children: ReactNode}; }) => void) => {
        dispatch({
            type: TYPES.TRIGGER_NOTIFICATION,
            payload:  { isOpen, children},
        });
    };
};

