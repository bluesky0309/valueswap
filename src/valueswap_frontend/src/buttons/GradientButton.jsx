import React from 'react';

const GradientButton = ({ CustomCss, children }) => {

    return (
 
            <button className={` ${CustomCss} h-[45px] w-[120px] button-gradient-wrapper text-white font-[700] text-base font-cabin rounded-lg py-4 px-[1.875rem] hover:opacity-50`}>
                <span className="button-gradient-content flex justify-center items-center p-1 ">
                    {children}
                </span>
            </button>


    );
};

export default GradientButton;  