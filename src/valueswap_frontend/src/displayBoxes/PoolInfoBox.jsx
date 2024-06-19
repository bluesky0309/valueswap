import React from 'react'

const PoolInfoBox = ({ Heading, Data }) => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center w-48 custom-angle-gradient border-white border-2 border-opacity-60 rounded-lg font-cabin leading-5 '>
            <span className='font-medium text-base opacity-75'>
                {Heading}
            </span>

            <span className='font-medium text-xl'>
                {Data}
            </span>
        </div>
    )
}

export default PoolInfoBox
