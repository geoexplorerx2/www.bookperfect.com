import React, { FC, useEffect, useState } from 'react'
import { Disclosure as HeadlesUiDisclosure, Transition } from '@headlessui/react'
import ChevronDownIcon from '@heroicons/react/solid/ChevronDownIcon'
import { ReactComponent as Arrow } from '../../images/icons/DisclosureArrow.svg'
import Heading from '../../lib/Heading/Heading'
import { stripHtml } from '../../common/stripHtml'
import FAQTab from './FAQTab'
import { useSelector } from 'react-redux'
import StringToBoolean from '../../common/StringToBoolean'

export interface DisclosureItemType {
  title: string,
  description: string,
  field_title: string,
  field_body: string,
  id: string,
  open: boolean,
};

interface DisclosureType {
  items: DisclosureItemType[],
  customContainer?: string,
  withTabs?: boolean;
  heading?: any;
  innerContainerClassNames?: string,
};


const Disclosure: FC<DisclosureType> = ({ items, customContainer = "md:px-[10.1vw]", withTabs = false, heading = "Frequently Asked Questions", innerContainerClassNames }) => {
  const activesearchhelp: any = useSelector((state: { SupportReducer: any; }) => state.SupportReducer.activesearchhelp);
  const supportHelp = useSelector((state: { SupportReducer: any; }) => state.SupportReducer.support);

  const [active, setActive] = useState(0);
  const [updateUI, setUpdateUI] = useState(new Date().getTime());
  const [openDisclosure, setOpenDisclosure] = useState<any>([0]);

  const yOffset = -90;
  const ref = React.useRef<any>([]);

  let supporthelps_unique: any = {};
  let filter_duplicated_supporthelps = supportHelp.filter((help: { tid: string | number; }) => !supporthelps_unique[help.tid as keyof any] && (supporthelps_unique[help.tid] = true));

  let faq_exist = filter_duplicated_supporthelps.find((faq_help: any) => faq_help.tid == '58');

  // console.log('filter_duplicated_supporthelps',filter_duplicated_supporthelps)
  useEffect(() => {
    if (activesearchhelp) {
      for (let item of items) {
        if (activesearchhelp && item && (activesearchhelp.field_title.replaceAll(' ', '') == item.field_title.replaceAll(' ', ''))) {
          let idx = items.indexOf(item);
          setUpdateUI(new Date().getTime());
          ref.current[idx]?.click();

          let refId = ref.current[idx]?.id;
          const toView = document.getElementById(`${refId}`) as HTMLInputElement | null;

          const scrollPosition = toView?.getBoundingClientRect()?.top! + window.pageYOffset + yOffset;
          window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
          // toView?.scrollIntoView();
        }
      }
    };

    if (supportHelp && faq_exist && faq_exist.tid == '58') {
      const toView = document.getElementById(`58`) as HTMLInputElement | null;

      const scrollPosition = toView?.getBoundingClientRect()?.top! + window.pageYOffset + yOffset;
      window.scrollTo(
        {
          top: scrollPosition,
          behavior: 'smooth'
        });
      // toView?.scrollIntoView();
    }
  }, [activesearchhelp, supportHelp, items]);

  const handleOpenDisclosure = (open: boolean, index: number) => {
    // setOpenDisclosure((prev: any) => [...prev, index])
  };

  const refs = items.map(() => {
    return React.createRef<HTMLButtonElement>();
  });

  // handle close faq
  const handleClosing = () => {
    let currentFaqRef = ref.current.find((_ref: any) => StringToBoolean(_ref.dataset.open));
    currentFaqRef && currentFaqRef.click();
  };

  return (
    <div className={`relative w-full px-3 ${customContainer} z-10`}>
      <div className={`${innerContainerClassNames} p-2 mx-auto w-full rounded-2xl`} id='58'>
        <Heading
          desc={''}
          headingWrapperClassNames='!text-base sm:!text-[32px] !text-[#3944B3] dark:!text-white'
          subheadingClassNames='!text-[#0E123D] text-[10px] md:text-lg dark:!text-white md:mt-2'
          className="md:!mb-6"
        >{heading}</Heading>
        <div className='mt-7'>
          {withTabs && <FAQTab />}
        </div>
        {
          items?.map((item: any, index: number) => {
            const { id, } = item

            return (
              index < 10 &&
              (
                <HeadlesUiDisclosure key={id} as="div" defaultOpen={!activesearchhelp && index == active} >
                  {({ open }) => (
                    <>
                      <HeadlesUiDisclosure.Button
                        data-id={id}
                        data-open={open}
                        onClick={() => handleClosing()} 
                        ref={(el: any) => ref.current[index] = el} 
                        // ref={refs[index]}
                        className={`w-full h-16 flex items-center mt-[10px] justify-between rounded-2xl bg-white dark:bg-transparent px-7 py-5 text-left text-xs md:text-sm font-medium text-[#0E123D] dark:text-white focus:outline-none border border-[#CBDBF8] shadow-[0px_9px_20px_-7px_rgba(0,_10,_255,_0.09)] ${open ? 'rounded-b-none border-b-0' : ''}`}>
                        <span className='max-w-[250px] md:max-w-none'> {item.field_title ?? item.title} </span>

                        <Arrow
                          className={`transition-all duration-500
                          ${open ? 'rotate-180 transform' : ''}
                           !w-[18px]  !h-[9px]  text-black dark:text-white`}
                        />
                      </HeadlesUiDisclosure.Button>
                      
                      <Transition
                        // show={index == active }
                        enter="transition duration-100 ease-out"
                        enterFrom="transform opacity-0"
                        enterTo="transform opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform opacity-100"
                        leaveTo="transform opacity-0"
                      >

                        <HeadlesUiDisclosure.Panel className="px-7 pb-8 text-sm text-[#3F4249] dark:text-white font-light bg-white dark:bg-transparent border border-[#CBDBF8] rounded-b-2xl border-t-0 transition-all" >
                          {(item.field_body && stripHtml(item.field_body)) ?? item.description}
                        </HeadlesUiDisclosure.Panel>

                      </Transition>
                    </>
                  )}
                </HeadlesUiDisclosure>
              )
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Disclosure
