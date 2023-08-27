import React, { FC } from 'react';
import envelope from '../../images/icons/envelope.svg'
import userIcon from '../../images/icons/userIcon.svg'
import phoneIcon from '../../images/icons/phoneIcon.svg'
import editIcon from '../../images/icons/editIcon.svg'
import { UserDataType } from '../../data/types';


interface MyDataProps {
  // data: UserDataType[];
  data: any;
}

const userData: Record<string, any> = [
  {
    field: 'Name',
    value: 'Example Name',
    img: userIcon
  },
  {
    field: 'Email',
    value: 'Example@gmail.com',
    img: envelope
  },
  {
    field: 'Phone Number',
    value: '+123456789',
    img: phoneIcon
  },

]

const MyData: FC<MyDataProps> = ({data}) => {

  userData?.forEach((field: any) => {
    switch(field.field){
      case 'Name':
        field.value = data.field_name + ' ' + data.field_surname;
        break;
      case 'Email':
        field.value = data.mail ?? data.email;
        break;
      case 'Phone Number':
        field.value = data.field_telephone;
        break;
      default:

    }
  });
  
  return (
    <div className="box-border w-full min-h-[500px] p-4 bigMd:border-2 rounded-lg bigMd:bg-[#F4F8FF] dark:bg-transparent">
      <div className="text-base text-[#3944B3] font-poppins dark:text-[#fff]">My Data</div>
      <span className='opacity-60 dark:text-[#fff]'>These are your data</span>
      <div className='w-full h-full'>
        {
          userData?.map((data: Record<string, any>) => (

            <div className='w-full min-h-[60px] py-2 mt-4 flex flex-col md:flex-row justify-between items-center border-b border-[#DADBE8] space-y-4'>
              <div className='bigMd:w-14 bigMd:h-14 flex items-center'>
                <img src={data.img} />
                <span className='ml-2 whitespace-nowrap dark:text-[#fff]'>{data.field}</span>
              </div>
              <span className='xl:w-[400px] dark:text-[#fff]'>{data.value}</span>
              <span>
                {/* <img src={editIcon} alt='edit-icon' style={{opacity: 0.2}} /> */}
              </span>
            </div>
          ))
        }
      </div>
      {/* content */}
    </div>
  )
}

export default MyData;