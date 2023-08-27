import { FC, useEffect, useState } from 'react'
import HeroInputSearch from '../HeroInputSearch/HeroInputSearch'
import  BackButtonIcon from '../../images/icons/BackButton.svg'
import { ChevronRight } from 'tabler-icons-react'
import { SupportTerms, TabType } from '../../views/Helps/Support'
import { useSelector } from 'react-redux'
import { activateSideMenu, supportHelps } from '../../store/actions'
import { useDispatch } from 'react-redux'
import { arrayBuffer } from 'stream/consumers'
import SupportSearchForm from '../HeroInputSearch/SupportSearchForm'



interface MobileSupportHeaderProps {
  wrapperClassNames?: string,
  activeTabName: any,
}


const MobileSupportHeader: FC<MobileSupportHeaderProps> = (props) => {
  const SupportState = useSelector((state: any) => state.SupportReducer.support)
  const activeSideMenu = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.activemenu);
  const helpstypes = useSelector((state: any) => state.SupportReducer.helpstypes);

  // setting the index of the current TabMenu so that we can determine the parent menu
  const [indexOfActiveTab, setIndexOfActiveTab] = useState(SupportState.map(function (tab: TabType) {
    return tab.name;
  }).indexOf(activeSideMenu.menu));
  const RootMenuTab: TabType = { name: '', type: 'root' }
  const [prevTab, setPrevTab] = useState<TabType>(SupportState.at(-2) ?? RootMenuTab)
  const dispatch = useDispatch();
  
  // this function recursively goes through the submenus of
  // the SupportMenus and finds all the ancestors of the current active menu
  const RecursivelygetAncestors: any = (target: TabType, children: TabType[], ancestors = []) => {
    
    if(Array.isArray(children)){
      
      for (let node of children) {
        // @ts-ignore
        if (node.name === target.menu) {
          // @ts-ignore
          return ancestors.concat(node);
        }
        let found: any;
        // @ts-ignore
        if (Array.isArray(node.subterms)) {
          // @ts-ignore
          found = RecursivelygetAncestors(target, node.subterms, ancestors.concat(node));
  
        }
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  };
  
  const [parentMenusState, setParentMenusState] = useState(RecursivelygetAncestors(activeSideMenu, helpstypes));

  useEffect(() => {
    setParentMenusState(
      RecursivelygetAncestors(activeSideMenu, helpstypes)
    );
  }, [activeSideMenu]);

  const handlePrevTab = (prevTab: TabType) => {
    var activemenu = {
      menu: prevTab.name ?? prevTab.menu,
      active: true,
      data: prevTab,
    };

    // support  
    dispatch(
      supportHelps(
        prevTab
      )
    );

    // sidebar
    dispatch(
      activateSideMenu(
        activemenu
      )
    );

  };

  const handleGoBack = () => {
    // if there is a parent menu to the current menu
    // dispatch the parent menu to set it active 
    if (Array.isArray(parentMenusState) && parentMenusState.length > 1) {
      handlePrevTab(parentMenusState.at(-2));
    };
    // if there is no parent to the currently active menu
    // set the active menu to empty so that the menus and submenus
    // components get unmounted
    if ((Array.isArray(parentMenusState) && parentMenusState.length <= 1)) {
      // @ts-ignore
      handlePrevTab({ type: 'RESET' })
    };
  };

  const { wrapperClassNames, activeTabName } = props;

  return (
    <div className={`${wrapperClassNames} bg-[#FFF9F9] px-[10.1vw] pt-[34px] pb-3 dark:bg-[transparent]`}>

      <HeroInputSearch 
        searchStyle='mt-0' 
        placeholder='Search our help articles' 
        lengthStyle='w-full !my-0 flex md:block mx-auto my-7' 
      />
      {/* <div className='border border-orange-400'>

      <SupportSearchForm  />
      </div> */}

      <div className='breadcrumb_container flex items-center overflow-hidden mt-3'>
        <div className='flex justify-center items-center border border-[#3842B2] rounded-[10px] bg-[#FE9A7A] w-9 h-9 overflow-hidden p-4 cursor-pointer'>

          <img 
            src={BackButtonIcon} 
            onClick={handleGoBack} 
            alt="back button" 
            className=' max-w-none' 
          />
        </div>
        {/* <div className='h-8 w-8 flex items-ceneter justify-center border border-orange-400'>
          <BackButtonIcon className='flex items-center justify-center border border-green-400'/>
        </div> */}

        <div className='ml-3 h-full flex'>
          <ChevronRight className='w-[14px] h-[14px] text-[#3944B3] dark:text-[#fff] mr-4' />
          <span className='text-xs text-[#3944B3] dark:text-[#fff]'>{activeTabName?.menu ?? 'tabName'}</span>
          {
            activeTabName?.submenu && 
            <>
              <ChevronRight className='w-[14px] h-[14px] text-[#3944B3] dark:text-[#fff] ml-4 mr-4' />
              <span className='text-xs text-[#3944B3] dark:text-[#fff]'>{activeTabName?.submenu.name ?? ''}</span>
            </>
          }
        </div>
      </div>

    </div>
  )
}

export default MobileSupportHeader