import { Transition } from '@headlessui/react'
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { CircleCheck } from 'tabler-icons-react';
import { useNotification } from '../../hooks';

interface NotificationProps {
    isOpened: boolean;
    children: ReactNode
}


const Notification: FC<NotificationProps> = (props) => {
    const {isOpened, children} = props
    const notificationSlice = useSelector((state: any) => state.NotificationSlice)
    let [isShowing, setIsShowing] = useState(true)
    const renderNotification = useNotification()
    const handleNotificationDisplay = () => {
        // setIsShowing(true)
        // setTimeout(() => {setIsShowing(false)} , 1500)
        renderNotification('hello friend')
    }
    
    
    if(!isOpened) return null
    return createPortal (
    //   <div className="flex flex-col items-center py-16">
    <>
        {/* <div className="h-32 w-32"> */}
          <Transition
            as={'div'}
            className=" min-w-[200px] max-h-[200px] rounded-2xl overflow-hidden border border-cyan-500 fixed right-0 bottom-4 z-[999]" 
            show={notificationSlice?.isOpen ?? false}
            enter="transform transition duration-[600ms]"
            // enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterFrom='opacity-0 translate-x-full '
            enterTo="opacity-100 translate-x-0"
            leave="transform duration-[200ms] transition ease-in-out"
            leaveFrom="opacity-100 translate-x-0 "
            leaveTo="opacity-0 translate-x-full "
            
          >
            <div className="w-full h-full py-6 px-2 rounded-md bg-white flex items-center justify-between shadow-[rgb(0_0_0_/_5%)_0px_1px_3px,_rgb(0_0_0_/_5%)_0px_28px_23px_-7px,_rgb(0_0_0_/_4%)_0px_12px_12px_-7px]" >
                <CircleCheck className='text-cyan-500 mr-6' />
                <div>
                    {notificationSlice.children}
                </div>

            </div>
          </Transition>
        {/* </div> */}
       {/* </div> */}
    </>
    , 
    document.getElementById('notification')!
  )
}

export default Notification