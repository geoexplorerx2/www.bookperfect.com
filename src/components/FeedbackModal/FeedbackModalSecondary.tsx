import { FC, useState, Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { TextInput, createStyles, Textarea } from '@mantine/core';
import userIcon from '../../images/icons/userIcon.svg'
import DropFileInput from '../DropFile/DropFile';
import { useSelector } from 'react-redux'
import { ReactComponent as CommentIcon } from '../../images/icons/comment.svg'
import { ReactComponent as Stars } from '../../images/icons/StarsHeartsLikes.svg'
import { ReactComponent as PaperPlane } from '../../images/icons/paper-plane.svg'
import { values } from 'mobx';
import { ReactComponent as CloseIcon } from '../../images/icons/feedbackCloseIcon.svg'

interface FeedbackModalType {
    isOpened: boolean,
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValuesType {
    name: string,
    email: string,
    feedback: string,
}

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
        height: '57px',
        border: '1px solid #b4c9e573 !important',
        borderRadius: '1rem !important',
        backgroundColor: 'transparent',
        paddingTop: '24px !important',
        paddingLeft: '15px !important',
        '&::placeholder': {
            color: theme.colorScheme === 'dark' ? '#fff' : '#707070',
            fontWeight: 500
      },

    },
    wrapper: {
        margin: '1rem 0',
    }
}))


const FeedbackModal: FC<FeedbackModalType> = ({ isOpened, setIsOpened }) => {
    const theme = useSelector((state: any) => state.LightMode.mode);

    const { classes } = useStyles();


    const [formValues, setFormValues] = useState<FormValuesType>({
        name: '',
        email: '',
        feedback: ''
    })
    
    const [focusedInput, setFocusedInput] = useState({
        name: false,
        email: false,
        feedback: false
    })


    const handleInputFocus = (e: any) => {
        
        const target = e.currentTarget.name
     
        setFocusedInput(prevState => ({
            ...prevState, [target]: true 
        }))
        
    }
    
    
    const handleInputBlur = (e: any) => {
        
        const target = e.currentTarget.name
       

        setFocusedInput(prevState => ({
            ...prevState, [target]: false 
        }))
        
    }
    
    
    
    
    
    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.currentTarget.value
        let inputName = e.currentTarget.name
        setFormValues(prevState => {
            return { ...prevState, [inputName]: value }
        })
    }

    const handleSubmit = () => {

    }


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
                                <Dialog.Panel className="w-full max-w-[807px] flex flex-col items-center transform overflow-hidden rounded-2xl bg-white min-h-[500px] dark:bg-neutral-800 pt-9 pb-[75px] text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="relative text-2xl text-center font-light leading-6 text-[#3944B3] dark:text-[#fff] border-b border-[#B4C9E5] w-full pb-7"
                                    >
                                        <div className='w-full flex justify-center space-x-5'>
                                            <CommentIcon />  
                                            <span className='text-[20px] font-medium'>Leave your Feedback</span>

                                        </div>
                                        <Stars className='absolute bottom-0 right-0'/>
                                        <CloseIcon className='absolute top-0 right-6 opacity-[0.27]' onClick={() => {setIsOpened(false)}} />
                                    </Dialog.Title>

                                    <div className='inputs w-full px-[123px] min-h-[300px] pt-4'>
                                        <form onSubmit={handleSubmit}>
                                            <div className='relative'>
                                                <TextInput
                                                    name='name'
                                                    type='text'
                                                    onFocus={(e) => {handleInputFocus(e)}}
                                                    onBlur={(e) => {handleInputBlur(e)}}
                                                    classNames={{
                                                        input: classes.input,
                                                        wrapper: classes.wrapper

                                                    }}
                                                    required
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                    
                                                    // rightSection={<UserIcon />}

                                                />
                                                <span className={`absolute top-0 left-4 transition-all ${focusedInput.name || formValues.name ? 'translate-y-3 text-xs text-[#707070]' : 'translate-y-4 text-[#707070]' }`}>Name</span>
                                            </div>
                                            <div className='relative'>

                                                <TextInput
                                                    name='email'
                                                    type='email'
                                                   
                                                    classNames={{
                                                        input: classes.input,
                                                        wrapper: classes.wrapper

                                                    }}
                                                    onFocus={(e) => {handleInputFocus(e)}}
                                                    onBlur={(e) => {handleInputBlur(e)}}
                                                    required
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    // rightSection={<EnvelopeIcon />}

                                                />
                                                <span className={`absolute top-0 left-4 transition-all ${focusedInput.email || formValues.email ? 'translate-y-3 text-xs text-[#707070]' : 'translate-y-4 text-[#707070]' }`}>E-mail</span>

                                            </div>
                                        <div className='relative'>
                                            <Textarea
                                                value={formValues.feedback}
                                                onChange={handleChange}
                                                
                                                name="feedback"
                                                required
                                                classNames={{
                                                    input: classes.input,
                                                    wrapper: classes.wrapper

                                                }}
                                                onFocus={(e) => {handleInputFocus(e)}}
                                                onBlur={(e) => {handleInputBlur(e)}}
                                                styles={(theme) => ({
                                                    input: { height: '200px !important' }
                                                })}
                                            />
                                            <span className={`absolute top-0 left-4 transition-all ${focusedInput.feedback || formValues.feedback ? 'translate-y-3 text-xs text-[#707070]' : 'translate-y-4 text-[#707070]' }`}>Description</span>

                                        </div>
                                            {/* fileUpload */}
                                            {/* <div className='w-full rounded-2xl border-dashed border-2 p-4'> */}
                                                {/* <DropFile
                                               /> */}
                                                {/* <DropFileInput /> */}

                                            {/* </div> */}
                                        </form>
                                    </div>

                                    <div className="w-full px-[123px] mt-4 flex justify-end ">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center space-x-4 rounded-[333px] border border-transparent bg-[#3944B3] px-4 py-4 text-base font-medium text-white hover:bg-[#3944b3e6] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            //    close the modal
                                            onClick={() => setIsOpened(prev => !prev)}
                                        >
                                            <PaperPlane className='mr-4'/>  Submit

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

export default FeedbackModal