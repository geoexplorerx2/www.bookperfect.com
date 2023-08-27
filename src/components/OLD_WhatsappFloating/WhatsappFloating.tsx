import React from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const WhatsappFloating = () => {

  const isDark = localStorage.theme === 'dark' ? true : false;

  return (
    <div>
      <FloatingWhatsApp
        phoneNumber={"+905434573317"}
        accountName={"Book Perfect"}
        chatboxHeight={400}
        allowEsc
        notification
        notificationSound={true}
        allowClickAway
        avatar={"https://bookperfect.imgix.net/logo/favicon.png"}
        messageDelay={1}
        darkMode={isDark}
      // statusMessage={""}
      // chatMessage={""}
      />
    </div>
  )
}

export default WhatsappFloating