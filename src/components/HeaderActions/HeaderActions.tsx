import React from 'react';
import { Link } from "react-router-dom";
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  ActionIcon,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown } from 'tabler-icons-react';
import LanguagePicker from './LanguagePicker';
import MasterHeader from '../../lib/MasterHeader/MasterHeader';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    }
  }
}));

interface Links {
  link: string; 
  label: string;
};

interface HeaderActionProps {
  links: { 
      link: string; 
      label: string; 
      links?: Links[] 
    }[];
};

export interface Paths {
  link: string;
};

const HeaderActions = ({ links }: HeaderActionProps) => {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  
  const items = links.map((link) => {

  const goToPage = (link: string) => {
    window.location.replace(link);
  };
  
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <Link 
              to={link.link} 
              className={classes.link}
              onClick = { () => goToPage(link.link)}
              >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </Link>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <Link 
        to={link.link} 
        onClick = { () => goToPage(link.link)} 
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });
  
   return (
     <MasterHeader />
  );
};

export default HeaderActions;