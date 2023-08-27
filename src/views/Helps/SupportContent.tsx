import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { stripHtml } from '../../common/stripHtml';

interface SupportContentProps {
    type: string;
    heading: string;
};

const SupportContent: FC<SupportContentProps> = ({ type = "", heading = "", }) => {
    const aboutCompany = useSelector((state: { CompanyReducer: any; }) => state.CompanyReducer.about);
    const jobs = useSelector((state: { CompanyReducer: any; }) => state.CompanyReducer.jobs);
    const companyData = useSelector((state: { CompanyReducer: any; }) => state.CompanyReducer.company);
    const helpstypes = useSelector((state: any) => state.SupportReducer.helpstypes);
    const activeSideMenu = useSelector((state: { SigninReducer: any; }) => state.SigninReducer.activemenu);
    
    const renderContent = () => {
        switch (type) {
            case 'bookings':
                return '';
            case 'about':
              // aboutCompany &&  stripHtml(aboutCompany[0].body);
               return aboutCompany && (aboutCompany[0].body);
            case 'jobs':
              // jobs && jobs[0] &&  stripHtml(jobs[0].body);
              return jobs && jobs[0] && (jobs[0].body);
            case 'company':
              return companyData && activeSideMenu.data && companyData?.filter((company_data: any) => company_data.tid == activeSideMenu.data.tid)[0]?.body;
            // case 'covid-19updates':
            //     let data = helpstypes && helpstypes.filter((help: any) => help.tid == 47 )[0];
            //   return data && stripHtml(data.body);
            default:
                return activeSideMenu && ((activeSideMenu.submenu ? activeSideMenu.submenu.body : activeSideMenu.data.body) ?? (activeSideMenu.data.description ?? ''));
         }
    };
    
    const Children = (
        <React.Fragment>
            <div className="box-border w-full h-[573px] p-4 border-2 rounded-lg bg-[#F4F8FF] dark:bg-black overflow-auto">
               <div className="text-base text-lg text-[#3944B3] dark:text-[#fff] font-poppins"> { activeSideMenu.submenu != '' ? ( activeSideMenu.submenu && activeSideMenu.submenu.name ) : (activeSideMenu.data.name ?? heading) } </div>
               <div className='font-poppins dark:text-[#fff] '>
                 {/* { renderContent() } */}
                 <div dangerouslySetInnerHTML={{ __html: renderContent() }} />
               </div>
            </div>
        </React.Fragment>
    );  

  return (
    <div>
       { Children }
    </div>
  )
};

export default SupportContent;