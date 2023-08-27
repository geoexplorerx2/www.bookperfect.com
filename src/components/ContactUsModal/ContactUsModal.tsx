import { FC, useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput, createStyles, Textarea } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux'
import { feedback } from '../../store/actions';
import useForm from '../../hooks/useForm';
import useValidate from '../../hooks/useValidate';

interface ContactModal {
    title?: string;
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValuesType {
    contactUsName: string,
    contactUsMail: string,
    contactUsMessage: string,
};

const UserIcon: FC = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M5.9812 18.6943C6.54549 17.5828 7.40654 16.6493 8.4689 15.9972C9.53126 15.3452 10.7534 15 12 15C13.2465 15 14.4686 15.3452 15.531 15.9972C16.5934 16.6493 17.4544 17.5828 18.0187 18.6943" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

const EnvelopeIcon: FC = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5.25L12 13.5L3 5.25" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10.3594 12L3.23438 18.5344" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.7656 18.5344L13.6406 12" stroke="#3944B3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}
// find me
const useStyles = createStyles((theme) => ({
    input: {
        height: '50px',
        border: '2px solid #d7daf0 !important',
        borderRadius: '1rem !important',
        backgroundColor: 'transparent',
    },
    wrapper: {
        margin: '1rem 0',
    }
}))


const ContactUsModal: FC<ContactModal> = ({ isOpened, setIsOpened, title = 'Contact Us' }) => {
    const theme = useSelector((state: any) => state.LightMode.mode);
    const dispatch = useDispatch();
    const { classes } = useStyles();

    // const [formValues, setFormValues] = useState<FormValuesType>({
    //     contactUsMessage: '',
    //     contactUsMail: '',
    //     contactUsName: ''
    // });

    const {
        values,
        errors,
        handleChange,
        handleSubmit
    } = useForm( _handleContactUs, useValidate, 'contactUs' );

    function _handleContactUs() {
        const ContactUsData = {
            name: values?.contactUsName,
            email: values?.contactUsMail,
            message: values?.contactUsMessage,
        };
        // console.log('contactUsModalForm: ContactUsData', ContactUsData)
        // dispatch(
        //     feedback(
        //         ContactUsData,
        //         (res: any) => {
        //             console.log({ res });
        //             setIsOpened(false);
        //         }
        //     )
        // );
    };

    useEffect(() => {
        // console.log('contactUsModalForm: errors', errors)
    } ,[errors])

    return (
        <>
            <Transition appear show={isOpened} as={Fragment}>
                <Dialog as="div" className="relative z-40"
                    onClose={() => setIsOpened(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl flex flex-col items-center transform overflow-hidden rounded-2xl bg-white min-h-[500px] dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl text-center font-light leading-6 text-[#3944B3] dark:text-[#fff]"
                                    >
                                        {title}
                                    </Dialog.Title>

                                    <div className='inputs w-11/12 min-h-[300px] pt-4'>
                                       
                                        <form onSubmit={handleSubmit}>
                                            <TextInput
                                                name='contactUsName'
                                                type='text'
                                                placeholder='Your name'
                                                classNames={{
                                                    input: classes.input,
                                                    wrapper: classes.wrapper

                                                }}
                                                required
                                                onChange={handleChange}
                                                rightSection={<UserIcon />}
                                            />
                                            <TextInput
                                                name='contactUsMail'
                                                type='email'
                                                placeholder='Your email'
                                                classNames={{
                                                    input: classes.input,
                                                    wrapper: classes.wrapper

                                                }}
                                                required
                                               
                                                onChange={handleChange}
                                                rightSection={<EnvelopeIcon />}

                                            />

                                            <Textarea
                                                onChange={handleChange}
                                                placeholder="Message"
                                                name="contactUsMessage"
                                                required
                                                classNames={{
                                                    input: classes.input,
                                                    wrapper: classes.wrapper

                                                }}
                                                styles={(theme) => ({
                                                    input: { height: '200px !important' }
                                                })}
                                            />
                                        </form>
                                    </div>

                                    {errors.contactUsName &&
                                        <div className='absolute w-[28em] top-[7em] right-[3em]'>
                                            <div className="arrow-up absolute right-[.9em] top-[.4em]"></div>
                                            <div className="absolute rounded-md w-[50%] right-[.1em] top-[.8em] bg-[#FF2424] flex items-center justify-between p-2">
                                                <span className='w-[10%]'>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                                                    </svg>

                                                </span>
                                                <span className='w-[90%] text-[.7em] text-[#fff] flex justify-center text-left'>{errors.contactUsName}</span>
                                            </div>
                                        </div>
                                    }
                                    {errors.contactUsMail &&
                                        <div className='absolute w-[28em] top-[11em] right-[3em]'>
                                            <div className="arrow-up absolute right-[.9em] top-[.4em]"></div>
                                            <div className="absolute rounded-md w-[50%] right-[.1em] top-[.8em] bg-[#FF2424] flex items-center justify-between p-2">
                                                <span className='w-[10%]'>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                                                    </svg>

                                                </span>
                                                <span className='w-[90%] text-[.7em] text-[#fff] flex justify-center text-left'>{errors.contactUsMail}</span>
                                            </div>
                                        </div>
                                    }
                                    {errors.contactUsMessage &&
                                        <div className='absolute w-[28em] top-[15em] right-[3em]'>
                                            <div className="arrow-up absolute right-[.9em] top-[.4em]"></div>
                                            <div className="absolute rounded-md w-[50%] right-[.1em] top-[.8em] bg-[#FF2424] flex items-center justify-between p-2">
                                                <span className='w-[10%]'>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="white" stroke-width="2" stroke-miterlimit="10" />
                                                        <path d="M10 6.25V10.625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="white" />
                                                    </svg>

                                                </span>
                                                <span className='w-[90%] text-[.7em] text-[#fff] flex justify-center text-left'>{errors.contactUsMessage}</span>
                                            </div>
                                        </div>
                                    }

                                    <div className="w-11/12 mt-4 flex justify-end ">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-[#3944B3] px-4 py-2 text-sm font-medium text-white hover:bg-[#3944b3e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={() => handleSubmit()}
                                        >
                                            SEND MESSAGE
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>)

}

export default ContactUsModal