import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TriggerNotificationAction } from "../store/actions/TriggerNotification";

interface UseNotificationType {
    // a function that returns another function 
    () : (children: ReactNode) => void
}


export const useNotification = () => {
    const NotificationSlice = useSelector((state: any) => state.NotificationSlice)
    const dispatch = useDispatch()
    
    return function renderNotification (children: ReactNode) {
        dispatch(TriggerNotificationAction(true ,children))

        setTimeout(() => {
            dispatch (TriggerNotificationAction(false)) 
        } , 2000)
    }


  };

  export default useNotification