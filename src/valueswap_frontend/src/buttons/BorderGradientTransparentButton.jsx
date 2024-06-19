import React, { useEffect, useState } from 'react'


const BorderGradientTransparentButton = ({ Css, customCss, children }) => {
    const [customGradient, setcustomGradient] = useState(null);

    useEffect(() => {
        setcustomGradient(customCss);
    }, [customCss])

    return (
        <button className={` ${Css}  h-14 w-32 button-gradient-wrapper text-white font-bold text-base font-cabin rounded-lg  hover:opacity-50`}>
            <span className={`${customGradient} font-normal flex justify-center items-center`}>
                {children}
            </span>
        </button>
    )
}

export default BorderGradientTransparentButton
