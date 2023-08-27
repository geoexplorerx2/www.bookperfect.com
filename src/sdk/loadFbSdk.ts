const SDK_SCRIPT_ID = "facebook-jssdk";

export default function createScriptElement(id: string, src: string) {
    return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
            return;
        }

        const js = document.createElement("script");
        js.id = id;
        js.src = src;
        js.onload = resolve;
        js.onerror = reject;

        const el = document.getElementsByTagName("script")[0];
        el.parentNode!.insertBefore(js, el);
    });
};

export async function loadFbSdk(language: string) {
    await createScriptElement(
        SDK_SCRIPT_ID, 
        `https://connect.facebook.net/${language}/sdk.js`
    );
};