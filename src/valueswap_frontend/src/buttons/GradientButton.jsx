import React from 'react';

const GradientButton = ({ CustomCss, children }) => {

    return (
 
            <button className={` ${CustomCss} h-[45px]  md:w-[120px] button-gradient-wrapper text-white text-base font-cabin rounded-lg py-4 px-12 sm:px-[70px] hover:opacity-50`}>
                <span className="flex items-center justify-center p-1 button-gradient-content ">
                    {children}
                </span>
            </button>


    );
};

export default GradientButton;  