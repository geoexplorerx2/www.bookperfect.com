const ToTranslationFormat = (text: string) => {
    return text.toUpperCase().replaceAll(' ','_')
}


export default ToTranslationFormat