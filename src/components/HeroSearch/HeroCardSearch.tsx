import { Card, createStyles, Image, Tabs, TabsProps, Text } from '@mantine/core';
import React, { useState } from 'react';
import { 
  Car,
  Home, 
  HotelService, 
  Map, 
  Photo, 
  PlaneDeparture, 
  PlaneInflight } from 'tabler-icons-react';
import FlightSearch from './FlightSearch';
import HotelSearch from './HotelSearch';
import TripDesignerSearch from './TripDesignerSearch';

const useStyles = createStyles((theme) => ({
  root: {
    // position: 'relative',
  },

  control: {
    // "border-top-left-radius": "20px",
    // zIndex: 1,
  },
}));

function StyledTabs(props: TabsProps) {
  return (
    <Tabs
      variant="unstyled"
      styles={(theme) => ({
        tabControl: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
          fontSize: theme.fontSizes.md,
          padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,

          '&:not(:first-of-type)': {
            borderLeft: 0,
          },

          '&:first-of-type': {
            borderTopLeftRadius: theme.radius.md,
            // borderBottomLeftRadius: theme.radius.md,
          },

          '&:last-of-type': {
            borderTopRightRadius: theme.radius.md,
            // borderBottomRightRadius: theme.radius.md,
          },
        },

        tabActive: {
          backgroundColor: theme.colors.gray[1],
          borderColor: theme.colors.gray[1],
          color: "blue",
        },
      })}
      {...props}
    />
  );
}

// TODO: 
// 1. Responsive Card
// 2. Location Search Input Popover 
// 3. Location Search Autocomplete: Google Location Autocomplete
// 4. Passengers + flight class: popover passengers number and flight class

const HeroCardSearch = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = "Stays";
  const { classes } = useStyles();
  const tabs = [
    {
      tabName: "Trip Designer", 
      tabIcon: <Map size={23} />,
      tabContent: <TripDesignerSearch />
    },
    {
      tabName: "Flights", 
      tabIcon: <PlaneDeparture size={23} />,
      tabContent: <FlightSearch />
    },
    {
     tabName: "Hotels", 
     tabIcon: <Home size={23} />,
     tabContent: <HotelSearch />
    },
    {
      tabName: "Flights + Hotels", 
      tabIcon: <Photo size={23} />,
      tabContent: "Flights + Hotels"
    },
    {
      tabName: "Activities", 
      tabIcon: <Car size={23} />,
      tabContent: "Activities"
    },
    // {
    //   tabName: "Packages", 
    //   tabIcon: <Car size={23} />,
    //   tabContent: "Packages"
    // },
    // {
    //   tabName: "Transfers", 
    //   tabIcon: <Car size={23} />,
    //   tabContent: "Transfers"
    // },
    // {
    //   tabName: "Routing", 
    //   tabIcon: <Car size={23} />,
    //   tabContent: "Routing"
    // },

  ];
  const [tabActive, setTabActive] = useState(currentTab);
  
  return (
    <Card
      shadow="sm"
      p="xl"
    >
    <Card.Section>
        <StyledTabs 
          // variant="pills" 
          active={activeTab} 
          onTabChange={setActiveTab}>

            {
             tabs?.map((tab) => {
                // const active = tab === tabActive;
                return (
                    <Tabs.Tab label={tab.tabName} icon={tab.tabIcon}>
                      {tab.tabContent}
                    </Tabs.Tab>
                );
              })
            }
        </StyledTabs>
    </Card.Section>

  </Card>
  )
}

export default HeroCardSearch;