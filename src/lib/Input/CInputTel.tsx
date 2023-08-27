import React, { CSSProperties, InputHTMLAttributes, ReactNode } from "react";
import { useState, useEffect } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useSelector } from "react-redux";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    sizeClass?: string;
    fontClass?: string;
    rounded?: string;
    label?: string;
    placeholder?: string;
    icon?: ReactNode;
    handleChange?: any;
    name?: string;
};

const CInputTel = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className = " ",
            sizeClass = "h-13 px-24 py-3 ",
            fontClass = "text-sm font-normal",
            rounded = "rounded-xl",
            label = "",
            placeholder = "",
            icon,
            children,
            type = "text",
            handleChange,
            name = "phone",
            ...args
        },
        ref
    ) => {

        const theme = useSelector((state: any) => state.LightMode.mode)
        const [phone, setPhone] = useState('');
        const [isDark, setIsDark] = useState(true);

        const input = document.querySelector('.react-international-phone-input-container .react-international-phone-input') as HTMLElement
        const button = document.querySelector('.react-international-phone-input-container .react-international-phone-country-selector-button') as HTMLElement;
        const dropdown = document.querySelector('.react-international-phone-country-selector-dropdown') as HTMLElement;
        const dropdown_hover = document.querySelectorAll('.react-international-phone-country-selector-dropdown__list-item') as any as Array<HTMLElement>;

        // input.style.cssText += 'width:100%; height:';
        if (theme === 'dark' && input && button && dropdown) {
            input.style.cssText += 'background:transparent!important;color:white!important';
            button.style.cssText += 'background:transparent!important;';
            // dropdown.style.cssText += 'border: none !important;background-color: #000 !important;color: #fff !important;'
            // dropdown_hover.forEach(e => e.style.cssText += 'color: #000 !important;')
            // dropdown_hover?.forEach(e => e.addEventListener('mouseover', () => e.style.cssText += 'color: #000 !important;'))
            // dropdown_hover?.forEach(e => e.addEventListener('mouseleave', () => e.style.cssText += 'color: #fff !important;'))
        }

        useEffect(() => {
            // console.log('theme:', isDark)
        }, [isDark])

        return (
            <div>
                <label className="mb-2 text-sm font-medium  text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative z-[1000] phoneInput">
                    {/* <div
                        onChange={event => onChange(event)}
                        className={`block w-full  dark:bg-[transparent]  !ring-0  ${rounded} ${fontClass} ${sizeClass} ${className}`}
                    > */}
                    <PhoneInput
                        defaultCountry="tr"
                        value={phone}
                        onChange={(e: any) => handleChange(e, false)}
                        placeholder="Telephone"

                        style={{
                            height: "3rem",
                            border: "1px solid gray",
                            background: "transparent",
                            color: `{theme == 'dark' ? "white" : "black"}`
                        }}

                        inputStyle = {{
                            border: "none",
                            background: "transparent",
                            position: "absolute",
                            top: "6px",
                            left: "50px"
                        }}

                        countrySelectorStyleProps= {{
                            style: {
                                background: "transparent",
                                border: "none",
                                position: "absolute",
                                top: "6px",
                                left: "8px"
                            }
                        }}

                        inputClassName={`border-2 border-red`}
                        className={`w-full dark:bg-[transparent] !ring-0  ${rounded} ${fontClass} ${sizeClass} ${className}`}
                    />
                    {/* </div> */}
                    {/* <span>password error</span> */}
                </div>
            </div>
        );
    }
);

export default CInputTel;
