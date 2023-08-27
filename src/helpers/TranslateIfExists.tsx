import { useTranslation } from "react-i18next"
import { capitalizeFirstLetter } from "../common/capitalizeFirstLetter"
import ToTranslationFormat from "./toTranslationFormat"

const TranslateIfExists = (text: string) => {
    // @ts-ignore
    const {t, i18n} = useTranslation()
    // return translation if exists, otherwise, return the original text without underscore
    return i18n.exists(`${ToTranslationFormat(text)}`) 
            ? t(`${ToTranslationFormat(text)}`)
            : capitalizeFirstLetter(text.replaceAll('_','\ ').toLocaleLowerCase())

}

export default TranslateIfExists