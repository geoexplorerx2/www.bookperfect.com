import React, { FC, useEffect, useRef, useState } from 'react';
import uploadIcon from '../../images/icons/upload.svg'
import { ImageConfig } from './ImageConfig';
// import uploadImg from '../../images/icons/iconscloud-upload-regular-240.png';

interface DropFileInputProps{
    onFileAdded?: Function;
};

const DropFileInput: FC<DropFileInputProps> = ({onFileAdded}) => {
    
    const wrapperRef = useRef<HTMLInputElement>(null);

    const [fileList, setFileList] = useState<File[]>([]);

    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef?.current?.classList?.remove('dragover');

    const onDrop = () => wrapperRef.current?.classList.remove('dragover');
    const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
        // do not do anything if nothing is uploaded
        if (e.target.files == null) return;
        
        const newFile = e.target.files[0];

        if (newFile) {
            const updatedList = [...fileList, newFile] as any;
            setFileList(updatedList);
        };
    };

    const fileRemove = (file: File) => {
        const updatedList: File[] = [...fileList];
        updatedList.splice(fileList.indexOf((file)), 1);
        setFileList(updatedList);
    };

    useEffect(() => {
        onFileAdded && onFileAdded(fileList)
    }, [fileList]);

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label relative flex justify-between items-center py-4 pr-6 pl-8">
                    <img src={uploadIcon} alt="upload-image" className='w-12 h-12' />
                    {/* <img src={uploadImg} alt="" /> */}
                    <div>
                        <p className='font-medium text-sm dark:text-[#fff]'>Select a file or drag and drop here</p>
                        <p className='text-xs font-normal text-[#666666] dark:text-[#fff]'>JPG, PNG or PDF, file size no more than 10MB</p>
                    </div>
                    <input 
                      type="file" 
                      id='files' 
                      placeholder='SELECT FILE' 
                      className={' w-full opacity-0 top-0 left-0 h-full absolute dark:text-[#fff]'} 
                      value="" 
                      onChange={onFileDrop} 
                    />
                    <label htmlFor="files" className='border border-[#3944B3] dark:border-[#fff] w-24 h-9 cursor-pointer flex justify-center items-center rounded-md text-xs font-normal dark:text-[#fff]'>Select file</label>
                </div>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item flex justify-between items-center max-h-[100px]">

                                    <img src={ImageConfig.default}  className="w-24 h-24"/>
                                    <div className="drop-file-preview__item__info h-full max-w-[150px]">
                                        <p>{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del cursor-pointer text-[#666666]" onClick={() => fileRemove(item)}>remove</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}



export default DropFileInput;
