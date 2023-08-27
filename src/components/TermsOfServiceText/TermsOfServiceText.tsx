import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface TermsOfServiceTextProps {
    wrapperClassNames?: string;
}


const TermsOfServiceText: FC<TermsOfServiceTextProps> = (props) => {
    // @ts-ignore
    const {t} = useTranslation()
    const { wrapperClassNames } = props
    const history = useHistory();
    const activeLang: any = useSelector((state: { LanguagesReducer: any; }) => state.LanguagesReducer.lang);


    const  handleClick = () => {
        history.push(`/${activeLang}/terms-of-use`);
    };

    return (
        <div className={`${wrapperClassNames} w-full text-right md:px-2 lg:px-11 right-0 bottom-2 z-10 dark:bg-transparent`}>
            <span className="cursor-pointer text-xs text-[#0E123D] dark:text-white">{t("BY CLICKING 'SEARCH', I AGREE TO THE ?")}<a onClick={() => handleClick()} className="cursor-pointer underline cursor-pointer"> Terms of Use</a></span>
        </div>
    )
}

export default TermsOfServiceText