import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import HeroHead from '../../components/HeroHeader/HeroHead';
import { helpsTypes } from '../../store/actions';



interface PrivacyPolicyProps {
};

const PrivacyPolicy: FC<PrivacyPolicyProps> = ({ }) => {
    const helpstypes = useSelector((state: any) => state.SupportReducer.helpstypes);
    const dispatch = useDispatch();
    const pathname = window.location.pathname.split('/');
    const pathnameFiltered = pathname.filter(path => path != "" );

    useEffect(() => {
        dispatch(
            helpsTypes()
        );
    }, []);

    const TERMS_OF_USE_DATA = helpstypes && helpstypes?.filter((termsofuse: any) => termsofuse.tid == '57');
    const TERMS_OF_USE_DATA_CONTENT = TERMS_OF_USE_DATA && TERMS_OF_USE_DATA[0]?.body;
    const PRIVACY_POLICY_DATA = '';

    // regulations data
    const privacyContent = () => {
        switch (pathnameFiltered[1]) {
            case 'privacy-policy':
                return PRIVACY_POLICY_DATA;;
            case 'terms-of-use':
                return TERMS_OF_USE_DATA_CONTENT;
            default:
                break;
        }
    };

    return (
        <div className=''>
            <Helmet>
                <meta charSet="utf-8" />
                <title> Privacy Policy </title>
            </Helmet>

            <HeroHead
                className={`hero-head-support flex-col flex`}
                searchCard='privacypolicy'
                headText=""
                subText=""
                headType="privacypolicy"
            />

            <div className={`container mt-16 min-h-screen ${pathnameFiltered[0] == 'privacy-policy' && PRIVACY_POLICY_DATA == '' ? 'h-screen' : ''}`}>
              <div dangerouslySetInnerHTML={{ __html: privacyContent() }} />
            </div>

        </div>
    )
};


export default PrivacyPolicy;