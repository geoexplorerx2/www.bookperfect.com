import { Button, Chip, Chips, createStyles, Grid, Input, Radio, RadioGroup, SimpleGrid } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import { At, Calendar, CurrentLocation, Photo, Search, Users } from 'tabler-icons-react';
import SearchButton from '../SearchButton/SearchButton';
import ClassSelect from './ClassSelect';
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

const TripDesignerSearch = () => {
  const [value, setValue] = useState('one-way'); 
  const { classes } = useStyles();

  return (
      <div>
        <div>
          <div style={{display: 'flex', flexDirection:'column'}}>
            {/* <div style={{margin: '6px' }}>
              Class:
            </div> */}
            <div style={{margin: '6px' }}>
              <ClassSelect />
            </div>
          </div>  
        </div>

         <Grid>
           <Grid.Col md={6} lg={5}>
            <div style={{margin: '6px'}}>
                <DatePicker
                    style={{ marginTop: 16 }}
                    label="Start Date"
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
           </Grid.Col>
           <Grid.Col md={6} lg={5}>
            <div style={{margin: '6px', marginTop: '17px' }}>
              <FloatingInput 
                  label = "Travellers"
                  placeholder = "Passengers / Class"
                  icon = { <Users size={18} />} 
              />
            </div>
           </Grid.Col>
           {/* <Grid.Col md={6} lg={2}> */}
              <div style={{marginTop: '5px'}} className="px-4 py-4 lg:py-0 flex items-center justify-center">
                {/* <SearchButton />   */}
              </div>
           {/* </Grid.Col> */}
         </Grid>


      </div>
  )
}

export default TripDesignerSearch;