export default function loadScript(document: any, script: any, id: any, jsSrc: any, callback: any, onError: any) {
    const element = document.getElementsByTagName(script)[0];
    const fjs = element;
    let js = element;

    js = document.createElement(script);
    js.id = id;
    js.src = jsSrc;

    if (fjs && fjs.parentNode) {
      fjs.parentNode.insertBefore(js, fjs);
    } else {
        document.head.appendChild(js);
    }

    js.onerror = onError;
    js.onload = callback
  };