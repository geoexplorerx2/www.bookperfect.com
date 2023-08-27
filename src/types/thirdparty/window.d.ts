import { FB } from "./fb";

declare global {
    interface Window {
        fbAsyncInit: () => void | undefined | null;
        FB: FB | undefined | null;
        gapi: GAPI | undefined | null;
    }
};