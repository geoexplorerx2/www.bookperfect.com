import { Button, ThemeIcon } from '@mantine/core'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'tabler-icons-react'
import { goToPage } from '../../common/goToPage'
import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker'

interface SearchButtonProps {
  link?: string;
  passengers?: any;
  type?: string;
  classNames?:string;
  date?: any;
  _date?: any;
  trip?: string;
  onErrors?: (value: any) => void;
  destination?: any;
  departure?: any;
  multiRow?: any;
  textClassNames?: string;
  departureTime?: any;
  arrivalTime?: any;
};

const SearchButton: FC<SearchButtonProps> = ({ link, passengers, trip = "", type, classNames, date, _date, onErrors, destination, departure, multiRow, textClassNames, departureTime, arrivalTime}: any) => {
  const gaEventTracker = useAnalyticsEventTracker('Travel');
  const errors: any = {};
  // const _destination =  destination.slice(0, 1);

  const passengersSize = () => {
    let size = 0;

    passengers?.forEach((rw: any) => {
      size += rw.adults;
      size += rw.children;
    });

    return size;
  };

  const handleSearch = () => { 
    // track search button click
    // TODO: category for each search / each input related search / has user completed search entry
    gaEventTracker('search');

    if(['flight', 'hotel', 'packages', 'transfers'].includes(type)){
      if(trip != 'multiStop' && type != 'flight' && type != 'hotel' && departure && departure.length == 1)  {
        onErrors({
          departure: 'please select a departure',
          index: 0
        });
        return;
      };
      
      // console.log(destination.slice(1), {multiRow});

      if(trip != 'multiStop' && type != 'hotel' && type != 'flight' && destination && destination.length == 1)  {
        onErrors({
          destination: 'please select a destination',
          index: 0
        });
        return;
      };

      if(type == 'flight' && multiRow.length > 0){
        let depar = departure.slice(1);
        let dest = destination.slice(1);

        if(trip == 'multiStop') {
          for (var i = 0; i < multiRow.length; i++) {
            let deparExist = depar.find((dp: any) => dp.id == multiRow[i].id);
            let destExist = dest.find((dt: any) => dt.id == multiRow[i].id);

            if( !deparExist ) {
              onErrors({
                departure: 'please select a departure',
                index: i,
                id: multiRow[i].id
              });
             return;
            };

            if( !destExist ) {
              onErrors({
                destination: 'please select a destination',
                index: i,
                id: multiRow[i].id
              });
             return;
            };

            if( !date[i] ) {
              onErrors({
                date: 'please select a date',
                index: i,
                id: multiRow[i].id
              });
             return;
            };
          };

          // for (var i = 0; i < multiRow.length; i++) {
          //   if( !dest[i] ) {
          //     onErrors({
          //       destination: 'please select a destination',
          //       index: i,
          //       id: multiRow[i].id
          //     });
          //    return;
          //   };
          // };

          // for (var i = 0; i < multiRow.length; i++) {
          //   if( !date[i] ) {
          //     onErrors({
          //       date: 'please select a date',
          //       index: i,
          //       id: multiRow[i].id
          //     });
          //    return;
          //   };
          // };

          // r1_date: first row date for multi stop
          // r2_date: second row date for multi stop
          for(let i = 0; i < multiRow.length - 1; i++) {
            let r1_date = date && multiRow[i] && date.filter((d: any) => d.id == multiRow[i].id);
            let r2_date = date && multiRow[i + 1] && date.filter((d: any) => d.id == multiRow[i + 1].id);


              let dDate = r1_date[r1_date.length - 1].date.split('/');
              let rDate = r2_date[r2_date.length - 1].date.split('/');
        
              let dd = Number(dDate[0]);
              let mm = Number(dDate[1]);
              let yy = Number(dDate[2]);
        
              let _dd = Number(rDate[0]);
              let _mm = Number(rDate[1]);
              let _yy = Number(rDate[2]);
        
              let departureD = new Date(yy, mm - 1, dd);
              let returnD = new Date(_yy, _mm - 1, _dd);
        
              if(returnD < departureD) {
                onErrors({
                  date: 'End date must be equal or greater than start date',
                  type: 'comparison',
                  index: i + 1,
                  id: multiRow[i + 1].id
                });
                return;
              };
          }
        } else {
          if( !depar || depar.length == 0 ) {
            onErrors({
              departure: 'please select a departure',
              index: 0,
              id: multiRow[0].id
            });
           return;
          };

          if( !dest || dest.length == 0 ) {
            onErrors({
              destination: 'please select a destination',
              index: 0,
              id: multiRow[0].id
            });
           return;
          };


          if( !date || date.length == 0 ) {
            onErrors({
              date: 'please select a date',
              index: 0,
              id: multiRow[0].id
            });
           return;
          };
        }

        // if(dest.length < multiRow.length) {

        // }
      }

      if(type == 'hotel'){
        let dest = destination.slice(1);
        for (var i = 0; i < multiRow.length; i++) {
          let destExist = dest.find((dt: any) => dt.id == multiRow[i].id);

          if( !destExist ) {
            onErrors({
              destination: 'please select a destination',
              index: i,
              id: multiRow[i].id
            });
           return;
          };

          let r1_date = date && multiRow[i] && date.filter((d: any) => d.id == multiRow[i].id);
          let r2_date = _date && multiRow[i] && _date.filter((d: any) => d.id == multiRow[i].id);

          if( r1_date.length == 0 ){
            onErrors({
              date: 'please select a date',
              index: i,
              id: multiRow[i].id
            });
           return;
          };

          if( r2_date.length == 0 ){
            onErrors({
              _date: 'please select a date',
              index: i,
              id: multiRow[i].id
            });
           return;
          };

          // r1_date: first row date for multi stop
          // r2_date: second row date for multi stop
          if(date && _date){
            for(let i = 0; i < multiRow.length; i++) {
              let r1_date = date && multiRow[i] && date.filter((d: any) => d.id == multiRow[i].id);
              let _r1_date = date && multiRow[i + 1] && date.filter((d: any) => d.id == multiRow[i + 1].id);
              let r2_date = _date && multiRow[i] && _date.filter((d: any) => d.id == multiRow[i].id);
   
                let dDate = r1_date && r1_date[r1_date.length - 1] && r1_date[r1_date.length - 1].date.split('/');
                let _dDate = _r1_date && _r1_date[_r1_date.length - 1] && _r1_date[_r1_date.length - 1].date.split('/');
                let rDate = r2_date && r2_date[r2_date.length - 1] && r2_date[r2_date.length - 1].date.split('/');
          
                let dd = dDate && Number(dDate[0]);
                let mm = dDate && Number(dDate[1]);
                let yy = dDate && Number(dDate[2]);

                // next row departure date
                let __dd = _dDate && Number(_dDate[0]);
                let __mm = _dDate && Number(_dDate[1]);
                let __yy = _dDate && Number(_dDate[2]);
          
                let _dd = rDate && Number(rDate[0]);
                let _mm = rDate && Number(rDate[1]);
                let _yy = rDate && Number(rDate[2]);
          
                let departureD = new Date(yy, mm - 1, dd);
                let returnD = new Date(_yy, _mm - 1, _dd);

                // next row departure date
                let _departureD = new Date(__yy, __mm - 1, __dd);
          
                if(returnD < departureD) {
                  onErrors({
                    _date: 'Check-out date must be equal or greater than check-in date',
                    index: i,
                    type: 'comparison',
                    id: multiRow[i].id
                  });
                  return;
                };

                if(trip == 'withAccommodation'){
                  if(_departureD < returnD){
                    onErrors({
                      date: 'Ranges must be subsequent',
                      type: 'subsequent',
                      index: i + 1,
                      id: multiRow[i + 1].id
                    });
                    return;
                  }
                }
            }
          }

        }
      };

      if(trip == 'withAccommodation' && multiRow.length > 1){
        let dest = destination.slice(1);
        if(dest.length < multiRow.length) {
          for (var i = 0; i < multiRow.length; i++) {
            if( !dest[i] ) {
              onErrors({
                destination: 'please select a destination',
                index: i
              });
             return;
            };
          };
        }
      }

      // transfers search controllers
      // departure and destination
      if(type == 'transfers'){
        if(!departure) {
          onErrors({
            departure: 'please select a departure',
            index: 0
          });
          return;
        };

        if(!destination) {
          onErrors({
            destination: 'please select a destination',
            index: 0
          });
          return;
        };

        if(!date) {
          onErrors({
            date: 'Please select a date'
          });
          return;
        };

        if(departureTime.hour == '' ){
          onErrors({
            time: 'Please select time'
          });
          return;
        };

        if(trip == 'roundTrip') {

          if(!_date){
            onErrors({
              _date: 'Please select a date'
            });
            return;
          }

          if(arrivalTime.hour == '' ){
            onErrors({
              _time: 'Please select time'
            });
            return;
          };

        };

      }

      if(date && date.length > 0){
        for (var i = 0; i < date.length; i++) {
          if( !date[i].date || date[i].date == '' ) {
            // alert('Please select a date at ' + i + ' line');
            // errors.date = 'Please select a date at ' + i + ' line'; 
            onErrors({
              date: 'Please select a date at ' + i + ' line'
            });
            break;
          };
        };
      }

      if(type != 'flight' && type != 'hotel' && type != 'transfers' && date && date.length == 0) {
        // alert('Please select a date');
        // errors.date = 'Please select a date';
        onErrors({
          date: 'Please select a date'
        });
        return;
      };

    };

    if(['flighthotel', 'routing', 'activities'].includes(type)) {
      if(trip != 'multiStop' && type != 'activities' && !departure){
        onErrors({
          departure: 'please select a departure',
          index: 0
        });
        return;
      };

      if(type == 'routing' && !departure)  {
        onErrors({
          departure: 'please select a departure',
          index: 0
        });
        return;
      };

      if(type == 'routing' && trip == 'flightwithcar' && !destination)  {
        onErrors({
          destination: 'please select a destination',
          index: 0
        });
        return;
      };
      
      if(trip != 'multiStop' && type != 'hotel' && type != 'routing' && !destination)  {
        onErrors({
          destination: 'please select a destination',
          index: 0
        });
        return;
      };

      if(!date && type != 'hotel') {
        // alert('Please select a date');
        // errors.date = 'Please select a date';
        onErrors({
          date: 'Please select a date'
        });
        return;
      };
    };

    // for one length row 
    if(['flight', 'hotel', 'transfers'].includes(type)){

      if(!departure && type != 'hotel' && type != 'transfers') {
        onErrors({
          departure: 'please select a departure',
          index: 0
        });
        return;
      };
      
      if(trip == 'oneway' && type != 'hotel' && type != 'transfers' && !destination) {
        onErrors({
          destination: 'please select a destination',
          index: 0
        });
        return;
      };

      if(trip == 'roundTrip' && type != 'hotel' && type != 'transfers' && !destination) {
        onErrors({
          destination: 'please select a destination',
          index: 0
        });
        return;
      };

      if(_date && _date.length > 0){
        for (var i = 0; i < _date.length; i++) {
          if( !_date[i].date || _date[i].date == '' ) {
            // alert('Please select a return date at line ' + i );
            // errors._date = 'Please select a date at ' + i + ' line'; 
            onErrors({
              _date: 'Please select a date at ' + i + ' line'
            });
            break;
          };
        }
      }

      if(_date && _date.length == 0 && type != 'hotel' ) {
        // alert('Please select a date');
        // errors._date = 'Please select a date';
        onErrors({
          _date: 'Please select a date'
        });
        return;
      };

      // if(type == 'transfers' && trip == 'roundTrip' && !_date) {
      //   // alert('Please select a date');
      //   // errors._date = 'Please select a date';
      //   onErrors({
      //     _date: 'Please select a date'
      //   });
      //   return;
      // };

    };

    if(['flighthotel', 'activities'].includes(type)) {
      if(!_date) {
        // alert('Please select a date');
        // errors._date = 'Please select a date';
        onErrors({
          _date: 'Please select a date'
        });
        return;
      };
    };

    if(['trip designer'].includes(type) && !date) {
      // alert('Please select a date');
      onErrors({
        date: 'Please select a date'
      });
      return;
    };

    var row_size = 0;
    if(['trip designer', 'hotel', 'flighthotel', 'routing'].includes(type)){
      for (var i = 0; i < passengers.length; i++) {
        row_size = passengers[i].adults + passengers[i].children;
        if(row_size > 6 ) { 
          // alert('maximum passenger per room is 6');
          break; 
        }
      };
    }

    if(date && _date && _date != '' && type != 'hotel'){
      if(Array.isArray(_date)){
        let dDate = date[date.length - 1].date.split('/');
        let rDate = _date[_date.length - 1].date.split('/');
  
        let dd = Number(dDate[0]);
        let mm = Number(dDate[1]);
        let yy = Number(dDate[2]);
  
        let _dd = Number(rDate[0]);
        let _mm = Number(rDate[1]);
        let _yy = Number(rDate[2]);
  
        let departureD = new Date(yy, mm - 1, dd);
        let returnD = new Date(_yy, _mm - 1, _dd);
  
        if(returnD < departureD) {
          onErrors({
            _date: 'End date must be equal or greater than start date',
            type: 'comparison'
          });
          return;
        };
      } else {
        if(_date < date) {
          onErrors({
            _date: 'End date must be equal or greater than start date',
            type: 'comparison'
          });
          return;
        };
      }
    };
    
    switch (type) {
      case 'trip designer':
        if(row_size > 6 ){
          // alert('maximum passenger per room is 6');
          onErrors({
            passengers_limit: 'maximum passengers per room is 6'
          });
          return;
        }
        if(passengersSize() > 9 ) {
          // alert('maximum passenger should not be greater than 9');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 9'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'flight':
        if(passengersSize() > 9 ) {
          // alert('maximum passenger should not be greater than 9');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 9'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'hotel':
        if(row_size > 6 ){
          // alert('maximum passenger per room is 6');
          onErrors({
            passengers_limit: 'maximum passengers per room is 6'
          });
          return;
        }
        if(passengersSize() > 15 ) {
          // alert('maximum passenger should not be greater than 15');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 15'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'flighthotel':
        if(row_size > 6 ){
          // alert('maximum passenger per room is 6');
          onErrors({
            passengers_limit: 'maximum passengers per room is 6'
          });
          return;
        }
        if(passengersSize() > 9 ) {
          // alert('maximum passenger should not be greater than 9');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 9'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'activities':
        if(passengersSize() > 15 ) {
          // alert('maximum passenger should not be greater than 15');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 15'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'packages':
        goToPage(link, 'redirect');
        break;
      case 'transfers':
        if(passengersSize() > 54 ) {
          // alert('maximum passenger should not be greater than 54');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 54'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      case 'routing':
        if(row_size > 6 ){
          // alert('maximum passenger per room is 6');
          onErrors({
            passengers_limit: 'maximum passenger per room is 6'
          });
          return;
        }
        if(passengersSize() > 9 ) {
          // alert('maximum passenger should not be greater than 54');
          onErrors({
            passengers_limit: 'maximum passengers should not be greater than 9'
          });
          return;
        }
        else goToPage(link, 'redirect');
        break;
      default:
        break;
    }

  };

  return (
    <Link
      //  to={link}
      style={{ border: '.1vw solid #fff' }}
      type="button"
      onClick={(e: any) => handleSearch()}
      className={`
      ${classNames} w-[74px] h-[71px] flex items-center justify-center text-neutral-50
      focus:outline-none rounded-2xl md:rounded-lg bg-gradient-to-b from-[#FE9A7A] to-[#FA6455] 
      shadow-[0px_4px_6px_1px_rgb(248_113_72_/_21%)] hover:shadow-none hover:bg-gradient-to-b
      hover:from-[#407BFE] hover:to-[#3944B3] transition-[background-image] duration-500
       
       `

      }
    >
      <span className={`${textClassNames} md:hidden text-white font-medium text-sm tracking-[0.23em] mr-[10px]`} >SEARCH</span>


      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-9 md:w-9 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"

      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </Link>
  )
}

export default SearchButton
