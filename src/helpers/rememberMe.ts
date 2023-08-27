// setter
export function setRememberMeUser(credentials: any){
    const now = new Date();
    const credential: any = {
        token: credentials.token,
        expiry: now.getTime() + credentials.ttl 
    };

    localStorage.setItem('rememberMe', JSON.stringify(credential));
};

// getter
export function getRememberMeUser(){
    const hasRememberCredentials: any = localStorage.getItem('rememberMe');

    if(!hasRememberCredentials) return;

    const validCredentials = JSON.parse(hasRememberCredentials);
    const now = new Date();

    // if(now.getTime() > validCredentials.expiry){
    //     localStorage.removeItem('rememberMe');
    //     return;
    // };

    return validCredentials;
}