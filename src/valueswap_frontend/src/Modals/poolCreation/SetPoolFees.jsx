import React, { useEffect, useState } from 'react'
import { Bolt } from 'lucide-react';
import BorderGradientTransparentButton from '../../buttons/BorderGradientTransparentButton'
import SearchTokenShowData from '../../components/searchTokenForPoolComponents/SearchTokenShowData';
import GradientButton from '../../buttons/GradientButton';
import { showAlert, hideAlert } from '../../reducer/Alert';
import { useDispatch } from 'react-redux';
import { SetFeeShare } from '../../reducer/PoolCreation';

const SetPoolFees = ({ handleNext }) => {

    const dispatch = useDispatch();
    const [ButtonActive, SetButtonActive] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const PercentShares = [0.1, 0.30, 0.50, 1.00];

    useEffect(() => {

        if (selectedIndex === null) {
            SetButtonActive(false);
        } else {
            SetButtonActive(true);
        }


        if (selectedIndex === null) {
            dispatch(SetFeeShare(
                {
                    FeeShare: 0
                }
            ))
        } else {
            dispatch(SetFeeShare(
                {
                    FeeShare: PercentShares[selectedIndex]
                }
            ))
        }
    }, [selectedIndex, selectedIndex])

    const HandleClick = (index) => {
        setSelectedIndex(selectedIndex === index ? null : index);
    }


    return (
        <div className=''>
            
            <div className='z-50 w-min md:w-max m-auto flex flex-col gap-4 p-4 sm:p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border  rounded-lg'>
                <div className='w-[75%] sm:w-[65%] place-self-end  flex justify-between'>
                    <span className='font-fahkwang font-light text-2xl sm:text-3xl '>Set Fee Tier</span>
                    <Bolt size={30} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
                </div>



                <div className='text-start font-cabin font-semibold text-base sm:text-xl leading-7 tracking-wider '>
                    Initial Swap Fee
                </div>

                <div className='font-normal leading-5 font-cabin text-sm sm:text-base tracking-wide max-w-[600px]'>
                    The ideal swap fee of 0.30% works well for pools with popular tokens. For pools containing less common tokens, consider raising the fee.
                </div>


                <div className='grid grid-cols-12 text-center gap-6 my-6'>
                    {PercentShares.map((share, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    HandleClick(index);
                                }}
                                className=' col-span-6 sm:col-span-3'
                            >
                                <BorderGradientTransparentButton Css={`text-base lg:py-4`} customCss={`w-8 ${selectedIndex === index ? 'custom-gradient text-base sm:text-2xl p-1 sm:p-3 ' : 'button-border-custom-gradient-content p-2 sm:p-4'}`}>
                                    {share}  %
                                </BorderGradientTransparentButton>
                            </div>
                        );
                    })}
                </div>

                <div
                    className={`font-cabin text-base font-medium `}
                    onClick={() => {

                        if (!ButtonActive) {
                            dispatch(showAlert({
                                type: 'danger',
                                text: 'Please select a fee tier.'
                            }))

                            setTimeout(() => {
                                dispatch(hideAlert());
                            }, [3000])
                        } else {
                            handleNext()
                        }
                    }}
                >
                    <GradientButton CustomCss={`my-4 w-full ${ButtonActive ? ' opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}>
                        Next
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}

export default SetPoolFees
