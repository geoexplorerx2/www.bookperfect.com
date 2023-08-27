import { useEffect, useState } from "react";

const useForm = (callback: any, validate: any, formType: any ) => {

    const [values, setValues] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    // submit if no errors
    useEffect(() => {
        if(Object.keys(errors).length === 0 && isSubmitting){
            callback();
        }
    }, [errors]);
    
    const handleSubmit = () => {
        // if(event) event.preventDefault();
        setErrors(validate(values, formType));
        setIsSubmitting(true);
    };

    const handleChange = (event: any, shouldPersist: boolean = true) => {
        if(event.hasOwnProperty('cca2')){
            setValues((value: any) => ({ ...value, country: event.cca2})); 
        } else if (!shouldPersist) {
            setValues((value: any) => ({ ...value, 'phone': event}));
        } else {
            shouldPersist && event.persist();
            setValues((value: any) => ({ ...value, [event.target.name]: event.target.value }));
        }
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useForm;