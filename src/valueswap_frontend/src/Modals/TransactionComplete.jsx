import React from 'react'
import TransactionCompleteGIF from '../assets/images/TransactionComplete.gif'
import BorderGradientButton from '../buttons/BorderGradientButton'
import { TransactionSuccessfullData } from '../TextData'
const TransactionComplete = () => {
    return (
        <div className='w-10/12 lg:w-4/12 md:w-6/12   h-3/6 mt-16  flex flex-col align-middle gap-4 p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border justify-center text-center items-center m-auto rounded-lg'>

            <div className="w-48 h-48">
                <img src={TransactionCompleteGIF} alt="Transaction Complete" />
            </div>

            <span className='font-cabin font-normal text-2xl '>
                {TransactionSuccessfullData.TransactionCompleteMessage}
            </span>

            <span className='font-cabin font-normal text-base'>
                {TransactionSuccessfullData.TransactionSwapMessageFirstHalf} 0.05 ETH {TransactionSuccessfullData.TransactionSwapMessageSecondHalf} 2.5580 CT
            </span>

            <div>
                <BorderGradientButton customCss={`font-cabin w-full bg-[#000711] font-bold text-base `}>{TransactionSuccessfullData.BackButtonText}</BorderGradientButton>
            </div>
        </div>
    )
}

export default TransactionComplete
