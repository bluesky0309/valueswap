import React, { useEffect, useState } from 'react'
import { Bolt } from 'lucide-react';
import SearchTokenShowData from '../../components/searchTokenForPoolComponents/SearchTokenShowData';
import GradientButton from '../../buttons/GradientButton';
import { showAlert, hideAlert } from '../../reducer/Alert';
import { useDispatch } from 'react-redux';
import { SetFeeShare } from '../../reducer/PoolCreation';
import BorderGradientButton from '../../buttons/BorderGradientButton';

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
              <div className= {`flex gap-6 pb-6 w-full justify-center items-center m-auto lg:hidden`} >
                       <div className={`py-2 px-4 rounded-full bg-[#F7931A]`}>2</div>
                       <p className="text-lg">Set Pool Fees</p>
                       <hr className="border-2 w-1/4 pr-6" />
                     </div>
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
                                <BorderGradientButton  customCss={`w-8 ${selectedIndex === index ? 'px-[4.3rem] w-0 bg-[#C16800] ' : 'px-[4.3rem] w-0 bg-[#3E434B]'}`}>
                                    <div className='flex justify-center'>
                                     {share}
                                     <span>%</span>
                                    </div>
                                </BorderGradientButton>
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
