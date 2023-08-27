const useValidate = (values: any, type: any) => {
    let errors: any = {};
    switch (type) {
        case 'login':
            if(!values.username){
                errors.username = 'Username is required';
            }
            if(!values.password){
                errors.password = 'Password is required';
            } else if(values.password.length < 8) {
                errors.password = 'Password must be at least 8 characters';
            }
            break;
        case 'signup':
            if(!values.email){
                errors.email = 'Email address is required';
            } else if(!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = 'Email address is invalid';
            }
            if(!values.name) errors.name = 'Name is required';
            if(!values.surname) errors.surname = 'Surname is required';
            if(!values.country) errors.country = 'Country is required';
            if(!values._password){
                errors._password = 'Password is required';
            } else if(values._password.length < 8) {
                errors._password = 'Password must be at least 8 characters';
            }
            if(!values.confirmpassword){
                errors.confirmpassword = 'Confirm your password';
            }
            if(values._password && values.confirmpassword && values._password != values.confirmpassword){
                errors.pwdnotmatch = 'Password do not match'
            }
            break;
        case 'membership':
            if(!values.membershipemail){
                errors.membershipemail = 'Email address is required';
            } else if(!/\S+@\S+\.\S+/.test(values.membershipemail)) {
                errors.membershipemail = 'Email address is invalid';
            }
            break;
        case 'feedback':
            if(!values.feedbackname) errors.feedbackname = 'Name is required';
            if(!values.feedback) errors.feedback = 'Feedback message is required';
            if(!values.feedbackemail){
                errors.feedbackemail = 'Email address is required';
            } else if(!/\S+@\S+\.\S+/.test(values.feedbackemail)) {
                errors.feedbackemail = 'Email address is invalid';
            }
            break;
        case 'contactUs':
            if(!values.contactUsName) errors.contactUsName = 'Name is required';
            if(!values.contactUsMessage) errors.contactUsMessage = 'message is required';
            if(!values.contactUsMail){
                errors.contactUsMail = 'Email address is required';
            } else if(!/\S+@\S+\.\S+/.test(values.contactUsMail)) {
                errors.contactUsMail = 'Email address is invalid';
            }
            break;
        default:
            break;
    };  

    return errors;
};

export default useValidate;