import { FC, useState } from 'react';
import { Button, createStyles, Group } from '@mantine/core';
import { ReactComponent as hamburgerIcon } from "../../images/icons/Hamburger.svg";
import { ReactComponent as xIcon } from "../../images/icons/x.svg";
import { UiDrawer } from '../../lib/Drawer/Drawer';
import { NAVIGATION_MENU } from '../../lib/MasterHeader/NavigationMenu';
import { NavLink, useHistory } from "react-router-dom";
import { ReactComponent as SupportIcon } from '../../images/icons/SupportIcon.svg'
import { ReactComponent as FAQIcon } from '../../images/icons/FAQIcon.svg'
import { useSelector } from 'react-redux';
import { supportHelps } from '../../store/actions/SupportActions';
import { useDispatch } from "react-redux";



const MobileMenu: FC = () => {
  const production = process.env.REACT_APP_PRODUCTION;
  const [opened, setOpened] = useState(false);
  const Icon = opened ? xIcon : hamburgerIcon;
  const theme = useSelector((state: any) => state.LightMode);

  const dispatch = useDispatch()

  const handleFaqClick = () => {
    setOpened(false);


    let faq = {
      name: 'Frequently Asked Questions',
      tid: 58
    };

    dispatch(
      supportHelps(
        faq
      )
    );

    history.push(production == 'true' ? '/' : '/support')
  }

  const handleSupportClick = () => {
    setOpened(false);
    let resetview = {
      type: 'RESET'
    };

    dispatch(
      supportHelps(
        resetview
      )
    );

    history.push(production == 'true' ? '/' : '/support')
  }

  const useStyles = createStyles(() => ({
    drawer: {
      marginTop: '107px',
      backgroundColor: theme.mode == 'dark' ? '#202232' : '#FFF9F9',
      paddingRight: '0 !important'
    },
    closeButton: {
      display: 'none'
    },
    root: {
      paddingRight: '0 !important'
    }

  }));
  const { classes } = useStyles()
  const history = useHistory()
  return (
    <div className='xl:hidden mr-2 rotate-180'>
      <UiDrawer
        opened={opened}
        onClose={() => setOpened(false)}
        position='right'
        padding="xl"
        size="70%"
        overlayColor='transparent'
        // className='mt-20'
        classNames={{ drawer: classes.drawer, closeButton: classes.closeButton, root: classes.root }}
      >
        <div className='max-h-[95%] overflow-y-scroll flex flex-col space-y-7'>
          <ul className='flex flex-col space-y-7'>


            {NAVIGATION_MENU.map((item) => {

              const { icon: Icon, name, href } = item
              if (name === 'More') { return }
              return (




                <NavLink
                  exact
                  strict
                  target={item.targetBlank ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`inline-flex items-center xl:text-xs text-sm xl:my-0 font-normal text-[#3944B3] dark:text-black py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
                  to={{
                    pathname: production == 'true' ? '/' : item.href || undefined,
                  }}
                  onClick={(e: any) => { setOpened(false); history.push(item.href) }}
                  activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
                  key={item.id}
                >
                  <li className='flex items-center justify-center'>

                    {" "}
                    {/* <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div> */}
                    {Icon && <Icon className={`text-[#3944B3] dark:text-white ${href === '/flights' ? 'mr-[10px]' : 'mr-5'}`} />}
                    <span className='text-sm text-[#3944B3] dark:text-white'>

                      {item.name}
                    </span>


                  </li>
                </NavLink>

              )
            }
            )}



          </ul>
          <div className="w-[calc(100%_-_24px)] min-h-[48px]  text-sm !border-[#F75847] dark:!border-white border rounded-lg bg-white 
                                dark:bg-transparent text-[#F75847]  my-4 flex justify-center items-center"
            onClick={() => { setOpened(false); history.push(production == 'true' ? '/' : 'travelguide') }}
          >
            <span className="w-[2px] h-[5px] mr-4 bg-[#F75847] text- dark:bg-white "></span>
            {/* {route()} */}
            <span className='dark:text-white'>
              Travel Guide & Blog

            </span>
          </div>
          <div className='flex flex-col space-y-7'>

            <NavLink
              exact
              strict
              rel="noopener noreferrer"
              className={`inline-flex items-center xl:text-xs text-sm xl:my-0 font-normal text-[#3944B3] dark:text-black py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
              to={{
                pathname: production == 'true' ? '/' : '/support',
              }}
              onClick={handleSupportClick}
              activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
              key={'support'}
            >
              {" "}
              {/* <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div> */}
              <SupportIcon className="mr-5 text-[#3944B3] dark:text-white" />
              <span className='dark:text-white'> Support
              </span>
            </NavLink>
            <NavLink
              exact
              strict
              rel="noopener noreferrer"
              className={`inline-flex items-center xl:text-xs text-sm xl:my-0 font-normal text-[#3944B3] dark:text-black py-2 rounded-full hover:text-[#ed4b45] dark:hover:bg-neutral-800 dark:hover:text-neutral-200`}
              to={{
                pathname: production == 'true' ? '/' : '/support/faq',
              }}
              onClick={handleFaqClick}
              // activeClassName="active-nav-item !text-[#ed4b45] dark:bg-neutral-800 dark:!text-neutral-100"
              key={'support'}
            >
              {" "}
              {/* <div className="bullets w-[2px] h-[5px] rounded-[3px] bg-[#3944B3] dark:bg-black mr-4"></div> */}
              <FAQIcon className="mr-5 text-[#3944B3] dark:text-white" />
              <span className='dark:text-white'>

                FAQ
              </span>

            </NavLink>
          </div>


        </div>
      </UiDrawer>

      <Group position="center">
        <Button className='p-0 rotate-180' onClick={() => setOpened(prev => !prev)}><Icon color={`#F75847`} /></Button>
      </Group>
    </div>

  )
}
export default MobileMenu