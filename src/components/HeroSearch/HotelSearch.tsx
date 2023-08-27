import { createStyles } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import { Calendar, CurrentLocation, Users } from 'tabler-icons-react';
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

const HotelSearch = () => {
  const [value, setValue] = useState('react'); 
  const { classes } = useStyles();

  return (
    <div>
     <br/>
        <div className="flightsearch" style={{display: 'inline-flex', flexWrap:'wrap'}} >
          <div style={{margin: '6px', marginTop: '23px'}}>
              <FloatingInput
                label = 'Where'
                placeholder = 'Where'
                icon = { <CurrentLocation size={18} />}
              />
          </div>
          <div style={{margin: '6px'}}>
              <DatePicker
                  style={{ marginTop: 16 }}
                  label="Check In"
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
          <div style={{margin: '6px'}}>
              <DatePicker
                  style={{ marginTop: 16 }}
                  label="Check Out"
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
              <div style={{margin: '6px', marginTop: '23px'}}>
                <FloatingInput 
                  label = "Passengers / Class"
                  placeholder = "Passengers / Class"
                  icon = { <Users size={18} />} 
                />
              </div>
          <div style={{margin: '6px', marginTop: '23px'}}>
                {/* <SearchButton /> */}
          </div>
         </div>
    </div>
  )
}

export default HotelSearch