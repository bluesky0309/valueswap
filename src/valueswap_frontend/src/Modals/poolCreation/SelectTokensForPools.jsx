import React, { useEffect, useState } from 'react'
import { Bolt } from 'lucide-react';
import BorderGradientButton from '../../buttons/BorderGradientButton'
import SearchTokenShowData from '../../components/searchTokenForPoolComponents/SearchTokenShowData';
import GradientButton from '../../buttons/GradientButton';
import { showAlert, hideAlert } from '../../reducer/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { AddCoin } from '../../reducer/PoolCreation';
const SelectTokensForPools = ({ handleNext }) => {
    
    const dispatch = useDispatch();
    const { Tokens, CoinCount } = useSelector((state) => state.pool)
    // console.log(Tokens)
    const [ButtonActive, SetButtonActive] = useState(true);

    useEffect(() => {
        console.log("Current Token Count:->", CoinCount)
    }, [CoinCount])

    const HandleSelectCheck = () => {
        // const allTokensSelected = Tokens.every((token) => token.Selected);
        // // console.log("Selected or not->", allTokensSelected)
        // SetButtonActive(allTokensSelected);
    }


    return (
        <div className=''>
            
            <div className='inset-0 bg-opacity-10 m-auto  justify-center z-50 w-max  flex flex-col gap-4 p-3 sm:p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border mx-auto rounded-lg'>

                <div className='w-[70%] place-self-end  flex justify-between'>
                    <span className='font-fahkwang font-light md:text-3xl '>Select Tokens</span>
                    <Bolt size={30} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
                </div>


                <div>
                    {Tokens.map((token, index) => {
                        return (
                            <div key={index}>
                                <SearchTokenShowData token={token} index={index} HandleSelectCheck={HandleSelectCheck} />
                            </div>
                        );
                    })}
                </div>


                <div className={`place-self-end ${CoinCount < 8 ? 'block' : 'hidden'}`}
                    onClick={() => {
                        if (CoinCount < 8) {
                            dispatch(AddCoin())
                        } else {
                            dispatch(showAlert({
                                type: 'danger',
                                text: 'No More than 8 coins Allowed in the pool'
                            }))

                            setTimeout(() => {
                                dispatch(hideAlert());
                            }, [3000])
                        }
                    }}
                >
                    <BorderGradientButton customCss={`text-xs md:text-light lg:text-base h-[45px] w-[140px] `}>
                        Add Token
                    </BorderGradientButton>
                </div>

                <div
                    className={`font-cabin text-base font-medium `}
                    onClick={() => {

                        if (!ButtonActive) {
                            dispatch(showAlert({
                                type: 'danger',
                                text: 'Please select all the coins'
                            }))

                            setTimeout(() => {
                                dispatch(hideAlert());
                            }, [3000])
                        } else {
                            handleNext()
                        }
                    }}
                >
                    <GradientButton CustomCss={`my-4 w-full ${ButtonActive ? ' opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`} >
                        Next
                    </GradientButton>
                </div>
            </div>
        </div>
    )
}

export default SelectTokensForPools
