import { Button, Chip, Chips, createStyles, Grid, Input, Radio, RadioGroup, SimpleGrid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import { At, Calendar, CurrentLocation, Photo, Search, Users } from 'tabler-icons-react';
import SearchButton from '../SearchButton/SearchButton';
import FloatingInput from './FloatingInput';

const useStyles = createStyles((theme) => ({
    root: {
     //   position: 'relative',
     // width: '210px'
    },
  
    input: {
    //   height: 'auto',
    //   paddingTop: 18,
    },
  
    label: {
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: theme.fontSizes.xs,
      paddingLeft: theme.spacing.sm,
      paddingTop: theme.spacing.sm / 2,
      zIndex: 1,
    },
}));

const FlightSearch = () => {
  const [value, setValue] = useState('one-way'); 
  const { classes } = useStyles();

  return (
      <div>
        <div>
          <br />
          <Chips multiple={false} value={value} onChange={setValue} variant="filled">
            <Chip value="one-way">One Way</Chip>
            <Chip value="round-trip">Round Trip</Chip>
            <Chip value="multi-city">Multi-City</Chip>
          </Chips>
          {/* <RadioGroup  value={value} onChange={setValue} required>
              <Radio value="react" label="One Way" />
              <Radio value="svelte" label="Round Trip" />
              <Radio value="ng" label="Multi-City" />
          </RadioGroup>  */}
        </div>
        {/* <br/> */}
        <div className="flightsearch" style={{display: 'inline-flex', flexWrap:'wrap'}} >
          <div style={{margin: '6px', marginTop: '17px'}}>
              <FloatingInput
                label = 'From'
                placeholder = 'From'
                icon = { <CurrentLocation size={18} />}
              />
          </div>
          <div style={{margin: '6px', marginTop: '17px'}}>
              <FloatingInput 
                label = 'To'
                placeholder = 'To'
                icon = { <CurrentLocation size={18} />} 
              />
          </div>
          <div style={{margin: '6px', marginTop: '-3px'}}>
            <DatePicker
                style={{ marginTop: 16 }}
                label="Departure"
                classNames={classes}
                clearable={false}
                radius="md"
                size="lg"
                autoComplete="nope"
                rightSection={
                  <Calendar size={18} />
                }
            />
          </div>
            {/* <div style={{margin: '6px', marginTop: '17px'}}>
              <FloatingInput 
                label = "Passengers / Class"
                placeholder = "Passengers / Class"
                icon = { <Users size={18} />} 
              />
            </div> */}

            <div style={{marginTop: '6px'}} className="px-4 py-4 lg:py-0 flex items-center justify-center">
              <SearchButton link = "/search/flights" />  
            </div>
         </div>

         {/* <Grid style={{width: '900px', marginLeft: '5px'}}>
                <Grid.Col md={6} lg={3}>

                   <FloatingInput />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>

                   <FloatingInput />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                   <DatePicker
                        style={{ marginTop: 16 }}
                        label="Departure"
                        classNames={classes}
                        clearable={false}
                        radius="md"
                        size="lg"
                        autoComplete="nope"
                        rightSection={
                          <Calendar size={18} />
                        }
                    />
                </Grid.Col>
                <Grid.Col md={6} lg={3}>
                   <FloatingInput />
                </Grid.Col>
            </Grid> */}
      </div>
  )
}

export default FlightSearch;