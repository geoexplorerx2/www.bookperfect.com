import { Dialog, Transition } from '@headlessui/react'
import { createStyles } from '@mantine/core'
import { Cookies } from "react-cookie";
import leftImage from '../../images/homepage_information.png'
import React, { FC, Fragment, useEffect, useState } from 'react'
import ButtonSecondary from '../../lib/Button/ButtonSecondary'
import { ChevronLeftIcon, XIcon } from '@heroicons/react/solid'
import { ReactComponent as Arrow } from '../../images/icons/arrow-right.svg'
import { Step } from '../../data/TripDesignerSteps'
import { ReactComponent as CrossIcon } from "../../images/icons/PopUpCloseIcon.svg";
import { useDispatch, useSelector } from 'react-redux';
import { hasUserBeenHereBeforeClear } from '../../store/actions';

const useStyles = createStyles((theme) => ({
    modal: {
        //   background: 'transparent !important'
    },
    root: {
        width: ''
    }
}
))

interface StepsModalType {
    steps: Step[],
    hasUserBeenHereBefore?: boolean
};

const cookie = new Cookies();

const StepsModal: FC<StepsModalType> = (props) => {
    const { steps, hasUserBeenHereBefore } = props
    const hasuserbeenherebefore: any = useSelector((state: { UserReducer: any; }) => state.UserReducer.hasuserbeenherebefore);
    let beenherebefore = cookie.get('beenherebefore');

    const { classes } = useStyles();

    const [isModalOpen, setIsModalOpen] = useState<any>((beenherebefore == undefined) || beenherebefore == 'false');
    const [activeStep, setActiveStep] = useState<number>(1);
    const [nextStepButtonText, setNextStepButtonText] = useState('Next');
    const [isLastStep, setIsLastStep] = useState(false);

    const dispatch = useDispatch();

    const { 
        title, 
        subtitle, 
        ComponentToRender 
    } = steps[activeStep - 1]

    let numOfSteps = steps.length
    const handlePrevStep = () => {
        if (activeStep == 1) return
        setNextStepButtonText('Next')
        setActiveStep(prevActiveStep => prevActiveStep - 1)
        setIsLastStep(false)
    }

    const handleNextStep = () => {

        if (activeStep == numOfSteps) return
        if (activeStep == numOfSteps - 1) {
            setNextStepButtonText('Start Trip')
            setIsLastStep(true)
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1)
    };

    useEffect(() => {
        // console.log('the active step just changed:', activeStep)
    }, [activeStep]);

    const handleModalClose = () => {
        setIsModalOpen(false);

        cookie.set('beenherebefore', 'true');

        dispatch(
           hasUserBeenHereBeforeClear()
        );
    };

    useEffect(() => {
      if(!hasuserbeenherebefore && hasuserbeenherebefore !== '') setIsModalOpen(!hasuserbeenherebefore);
    }, [hasuserbeenherebefore]);
    
    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => handleModalClose()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-[0.7]" />
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
                                <Dialog.Panel className="w-full relative grid xl:grid-cols-2 justify-center xl:justify-start max-w-[925px] min-h-[400px] transform rounded-2xl bg-transparent xl:bg-white dark:bg-[#171925] shadow-xl transition-all">

                                    <div className="h-full hidden xl:flex flex-col items-center pb-12 pt-[53px]">
                                        <img className='w-full max-w-[354px] h-full max-h-[287px]' src={leftImage} />
                                        <h5 className='text-xl text-[#3944B3] dark:text-white text-center font-normal mt-8'>Trip Designer</h5>
                                        <p className='text-sm text-[#3F4249] font-light max-w-[340px] text-center mt-2 dark:text-[#F4F8FF]'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form humour.</p>
                                        <ButtonSecondary className="!leading-none ml-92 !rounded-2xl group border border-[#3944B3] dark:border-white dark:hover:border-[#3944B3] hover:border-[#F75847] min-w-[333px] md:min-w-[auto] md:w-full !h-[38px] lg:w-[167px] lg:!h-[40px] mt-9">
                                            <span className="text-[#3944B3] group-hover:text-[#F75847] dark:text-white dark:group-hover:text-[#3944B3] w-full">More Info</span>
                                            <i className="ml-3 las la-arrow-right text-xl text-[#3944B3] dark:text-white dark:group-hover:text-[#3944B3] group-hover:text-[#F75847]"></i>
                                        </ButtonSecondary>
                                    </div>

                                    <div className="h-full max-w-[340px] w-full xs:max-w-[495px] sm:max-w-none sm:w-[495px] min-h-[457px] sm:min-h-[592px] relative  bg-gradient-to-b from-[#FE9A7A] to-[#FA6455] dark:from-[#202232] dark:to-[#202232] px-5 py-7 xs:pb-40 sm:p-[52px] rounded-2xl">
                                        
                                        <div className='absolute bottom-0 left-0  translate-y-[10px] sm:translate-y-[0] w-full flex justify-end px-5 cursor-pointer' onClick={() => handleModalClose()}>
                                           <div className='flex w-[20%]  justify-center sm:mt-0 sm:items-center my-2 py-1 rounded-md'>
                                             <span className='text-[#fff] w-[60%]   text-[14px] font-medium flex justify-end px-1'>SKIP</span>
                                             <span className='text-[10px] text-[#fff] flex justify-start w-[40%] items-center'>{'>>'}</span>
                                           </div>
                                        </div>

                                        <div className='component_container w-full xs:max-w-[unset] flex items-center justify-center h-full max-h-[219px] sm:max-h-[290px] rounded-2xl bg-white '>
                                            <div className='w-[220px] sm:w-auto'>
                                                <ComponentToRender />

                                            </div>
                                        </div>
                                        <h5 className='text-center text-xl text-white font-bold mt-5 select-none'>{title}</h5>
                                        <div className='w-full flex justify-center mt-2'>

                                            <p className='text-center text-xs sm:text-base text-white max-w-[284px] select-none'>{subtitle}</p>
                                        </div>
                                        <div className='bottom_buttons absolute bottom-7 sm:bottom-12 px-5 sm:px-[52px] w-full left-0 flex justify-between mt-12'>
                                            <div className='flex flex-start'>

                                                <div className='w-9 h-9 text-white border-white border-2 boder-white select-none rounded-full flex items-center justify-center' onClick={handlePrevStep}>
                                                    <Arrow className='rotate-180 w-4 h-4 text-white select-none' />
                                                </div>
                                                <div className={`steps_container ml-2 flex items-center select-none ${isLastStep ? 'hidden md:flex' : 'flex'} `}>
                                                    {[...Array(5)].map((item, index) => (
                                                        <div className={`bg-white rounded-full overflow-hidden flex items-center justify-center mx-2
                                                            ${index + 1 == activeStep ? 'w-9 h-9 text-[#F75847] dark:text-black' : 'w-2 h-2 text-white'}
                                            `}>
                                                            {activeStep}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <ButtonSecondary className={`h-10 !leading-none ml-92 !rounded-2xl border-2 border-white select-none whitespace-nowrap
                                                                        ${isLastStep ? 'w-full md:w-[148px] ml-2 bg-white' : 'w-28 '}
                                            `} onClick={()=>nextStepButtonText=='Start Trip'?handleModalClose():handleNextStep()}>
                                                <span className={`text-[#F75847] dark:text-white w-full text-base font-bold select-none whitespace-nowrap
                                                                    ${isLastStep ? 'text-[#F75847] dark:text-white' : 'text-white'}
                                                `}>{nextStepButtonText}</span>
                                                <i className={`ml-3  las la-arrow-right text-white
                                                                 ${isLastStep ? 'text-[#F75847] dark:text-white' : 'text-white'}
                                                `}></i>
                                            </ButtonSecondary>
                                        </div>
                                        <div
                                            className='w-7 h-7 sm:w-11 sm:h-11 absolute right-0 top-0 flex items-center justify-center bg-white rounded-full z-10 translate-x-[50%] -translate-y-1/2 cursor-pointer'
                                            onClick={() => handleModalClose()}
                                        >
                                            <CrossIcon className='text-[#F75847] dark:text-black w-10 h-10' /> 
                                            {/* <span className='font-semibold text-[#F75847] dark:text-[#000]'>SKIP</span> */}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default StepsModal