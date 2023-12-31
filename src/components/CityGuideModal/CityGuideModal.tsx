import React, { FC, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronRight } from 'tabler-icons-react'
import Loader from '../Loader/Loader'


interface CityGuideModalProps {
    isOpen: boolean,
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>
    content: any,
    loading: boolean,
    handleMoreButton: (guide: any) => void
    guide: any
}

interface ContentProps {
    children: any
}

const Content: FC<ContentProps> = (props : any) => {
    const {children} = props
    if( Array.isArray(children) && children.length > 1 ){
        return (
            <div>
                <ul>
                    {children.map(child => <li>{child}</li>)}
                </ul>
            </div>
        )
       
    }else return children

    
}

const CityGuideModal: FC<CityGuideModalProps> = (props) => {

    // let [isOpen, setIsOpen] = useState(false)
    const {content, loading,isOpen, setIsOpen, handleMoreButton, guide} = props

    useEffect(() => {
        // console.log('AIResponse::this is the received guide', guide)
    } ,[guide])

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
    return (
      <>
       
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                     {guide?.title}
                    </Dialog.Title>
                    <div className='w-full min-h-[400px] flex flex-col justify-between'>

                        <div className="mt-2">
                        
                        {
                        loading ? <Loader data={true} wrapperClassNames='!h-full'/> : <Content children={content} /> }
                        </div>
    
                        <div className="w-full flex justify-end mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={ () => handleMoreButton(guide) }
                        >
                            Learn More <ChevronRight />
                        </button>
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

export default CityGuideModal