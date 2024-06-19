import React from 'react'

const BlueGradientButton = ({ customCss, children }) => {
    return (
        <button className={`${customCss} bg-[#05071D] border border-white rounded-lg`}>
            {children}
        </button>
    )
}

export default BlueGradientButton
