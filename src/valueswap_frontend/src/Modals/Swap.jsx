import React, { useEffect, useState } from 'react'
import { Bolt, ChevronDown, ChevronUp, Dot, Info } from 'lucide-react';
import BlueGradientButton from '../buttons/BlueGradientButton';
import GradientButton from '../buttons/GradientButton';
import ImpactButton from '../buttons/ImpactButton';
import BorderGradientButton from '../buttons/BorderGradientButton'
import SearchToken from './SearchToken';
import DialogBox from './Dialouge';
import { SwapModalData } from '../TextData';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/utils/useAuthClient';
import SwapSetting from './SwapSetting';
const Swap = () => {

    const { createTokenActor, principal } = useAuth();
    const navigate = useNavigate();
    const [tokenActor, setActorToken] = useState(createTokenActor("bkyz2-fmaaa-aaaaa-qaaaq-cai"))
    const [Message, setMessage] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [PayCoin, setPayCoin] = useState(null);
    const [RecieveCoin, setRecieveCoin] = useState(null);
    const [changePayCoin, setChangePayCoin] = useState("M5 13.5L9 9.5M5 13.5L1 9.5M5 13.5V1");
    const [balance, setBalance] = useState(3);
    const [CoinAmount, setCoinAmount] = useState(0.02);
    const [AmountToPay, setAmountToPay] = useState(66.12);
    const [settings, setSettings] = useState(false);
    const [changeRecieveCoin, setChangeRecieveCoin] = useState("M13 1L9 5M13 1L17 5M13 1L13 13.5");
    const [bothCoins, setBothCoins] = useState(false);
    const [searchToken1, setSearchToken1] = useState(false);
    const [searchToken2, setSearchToken2] = useState(false);
    const [id, setId] = useState(0);
    const [ClickedSwap, setClickSwap] = useState(false);


    useEffect(() => {

        const fetch = async () => {
            console.log("principal of the account", principal.toText())
            let balance = await tokenActor.icrc1_balance_of({ owner: principal, subaccount: [] });
            const tokenMetaData = await tokenActor.icrc1_metadata();
            console.log("Token ka meta data :", tokenMetaData);
            balance = parseInt(balance) / Math.pow(10, 8);
            console.log("Balance of TokenB is:", balance)
            setBalance(balance);
        }

        if (tokenActor) {
            fetch();
        }
    }, [tokenActor])

    useEffect(() => {
        if (PayCoin && RecieveCoin) {
            setBothCoins(true);
        } else {
            setBothCoins(false);
        }
    }, [PayCoin, RecieveCoin])
    function ClickedChange() {
        let Temp = changePayCoin;
        setChangePayCoin(changeRecieveCoin);
        setChangeRecieveCoin(Temp);
        Temp = PayCoin;
        setPayCoin(RecieveCoin);
        setRecieveCoin(Temp);

    }

    const handleChangeAmount = (e) => {
        // Remove any non-numeric characters
        let number = parseInt(e.target.value);
        console.log("number this time", number)

        if (isNaN(number)) {
            setCoinAmount(0);
        }
        else {
            setCoinAmount(number);
        }
    };

    const handleSettings = () => {
        setSettings((prev) => !prev)
    }
    console.log("settings", settings)
    return (
        <div className='px-4 py-10 md:px-0   '>
            <div >
                <div className=' relative align-middle lg:w-5/12 md:w-8/12 h-2/6 flex flex-col  p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border mx-auto rounded-lg z-10'>
                    <div className=' w-[64%] sm:w-[58%] place-self-end  flex justify-between z-50'>
                        <span className='font-fahkwang font-light text-3xl '>{SwapModalData.Heading}</span>
                        <Bolt size={30} className='cursor-pointer' onClick={() => handleSettings()} />
                    </div>
                    {
                        settings && <>
                            <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40' onClick={()=> handleSettings()}></div>
                            <div className='absolute flex align-middle items-center justify-center h-full  w-11/12 '>
                                <SwapSetting />
                            </div>
                        </>
                    }

                    <div className=' mx-auto sm:mx-8 w-full flex justify-between items-center '>

                        {
                            PayCoin ? (
                                <div className='flex flex-col font-cabin font-normal gap-2'>
                                    <span className='text-base font-medium'>{SwapModalData.PaySection.Heading}</span>
                                    <span className='text-3xl md:text-4xl'>
                                        <input
                                            type="number"
                                            className='bg-transparent w-24 hide-arrows'
                                            value={CoinAmount}
                                            onChange={handleChangeAmount}
                                        />

                                    </span>
                                    <div className=''>
                                        <span className='text-base font-normal'
                                        >{SwapModalData.PaySection.Balance}:  {parseFloat(balance)}
                                            <button className='font-cabin ml-1 sm:ml-2 text-orange-400' onClick={() => {
                                                setCoinAmount(parseFloat(balance))
                                            }}>{SwapModalData.PaySection.Max}</button>
                                        </span>

                                    </div>
                                </div>
                            ) : (
                                <div className='flex flex-col font-cabin font-normal gap-2'>
                                    <span className='text-base font-medium'>{SwapModalData.PaySection.Heading}</span>
                                    <span className='text-3xl md:text-4xl'>0</span>
                                    <span className='text-sm sm:text-base font-medium'>{SwapModalData.PaySection.Balance}: {SwapModalData.PaySection.NoTokenSelectBalanceMessage}</span>
                                </div>
                            )
                        }

                        <div>
                            {!PayCoin ? (
                                <div>
                                    <div className='flex  sm:mr-12 items-center  gap-2'
                                    >
                                        <BlueGradientButton customCss={'px-2  md:w-40 sm:px-4 py-1 sm:py-3 font-cabin md:font-light'}
                                        >
                                            <div className='flex text-sm sm:text-base items-center gap-1'>
                                                {SwapModalData.PaySection.TokenSelectButtonText}
                                                <span className='cursor-pointer'
                                                    onClick={() => {
                                                        // console.log(searchToken1)
                                                        setId(1);
                                                        setSearchToken1(!searchToken1);
                                                    }}><ChevronDown /></span>
                                            </div>
                                        </BlueGradientButton>
                                    </div>
                                    {searchToken1 && <SearchToken setSearchToken={setSearchToken1} setPayToken={setPayCoin} setRecToken={setRecieveCoin} id={id} />}
                                </div>
                            ) : (
                                <div className='flex  flex-col gap-1'>
                                    <div className='flex  sm:mr-12 items-center place-self-end gap-2'>
                                        <BlueGradientButton customCss={'disabled  px-2 sm:px-4 py-2 sm:py-3 normal-cursor'}>
                                            <img src={PayCoin.Image} alt="" className='h-6 w-6 sm:h-8 sm:w-8 transform scale-150' />
                                        </BlueGradientButton>

                                        <div className='font-cabin font-normal text-2xl'>
                                            {PayCoin.ShortForm}
                                        </div>
                                        {!searchToken1 ? (
                                            <span className='cursor-pointer' onClick={() => {
                                                setId(1);
                                                setSearchToken1(!searchToken1);
                                            }}><ChevronDown /></span>
                                        ) : (
                                            <span className='cursor-pointer' onClick={() => {
                                                setSearchToken1(!searchToken1);
                                            }}><ChevronUp /></span>
                                        )}
                                        {searchToken1 && <SearchToken setSearchToken={setSearchToken1} setPayToken={setPayCoin} setRecToken={setRecieveCoin} id={id} />}
                                    </div>
                                    <span className='font-cabin font-normal text-center'>
                                        ${AmountToPay}
                                    </span>
                                </div>

                            )}
                        </div>
                    </div>
                    <div className='flex flex-col justify-center items-center mt-8'>
                        <div className='border-b border-white w-11/12'></div>
                        <div className='bg-[#000711] rounded-xl p-4 xl:w-1/12 lg:w-1/6 -mt-6 cursor-pointer flex flex-col items-center' onClick={ClickedChange}>
                            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13.5L9 9.5L5 13.5ZM5 13.5L1 9.5L5 13.5ZM5 13.5V1V13.5Z" fill="#000711" />
                                <path d={`${changeRecieveCoin}`} stroke="#0057FF" />
                                <path d="M13 1L9 5L13 1ZM13 1L17 5L13 1ZM13 1L13 13.5L13 1Z" fill="#000711" />
                                <path d={`${changePayCoin}`} stroke="white" strokeOpacity="0.3" />
                            </svg>
                        </div>
                    </div>

                    <div className='mx-auto sm:mx-8 w-full flex justify-between items-center'>


                        {
                            RecieveCoin ? (
                                <div className='flex flex-col font-cabin font-normal gap-2'>
                                    <span className='text-base font-medium'>{SwapModalData.RecieveSection.Heading}</span>
                                    <span className='text-3xl md:text-4xl'>0</span>
                                    <span className='text-sm sm:text-base font-normal'>{SwapModalData.RecieveSection.Balance}: 0.00</span>
                                </div>
                            ) : (
                                <div className='flex flex-col font-cabin font-normal gap-2'>
                                    <span className='text-base font-medium'>{SwapModalData.RecieveSection.Heading}</span>
                                    <span className='text-3xl md:text-4xl'>0</span>
                                    <span className='text-sm sm:text-base font-normal'> {SwapModalData.RecieveSection.Balance}:  {SwapModalData.RecieveSection.NoTokenSelectBalanceMessage}</span>
                                </div>
                            )
                        }


                        <div>
                            {!RecieveCoin ? (
                                <div className='flex  sm:mr-12 items-center place-self-end gap-2'>
                                    <BlueGradientButton customCss={'px-2  md:w-40 sm:px-4 py-1 sm:py-3 font-cabin md:font-light'}>
                                        <div className='flex text-sm  sm:text-base  items-center gap-1'
                                            onClick={() => {
                                                console.log(searchToken2)
                                                setId(2);
                                                setSearchToken2(!searchToken2);
                                            }}>
                                            {SwapModalData.RecieveSection.TokenSelectButtonText}
                                            <span className='cursor-pointer'
                                            ><ChevronDown /></span>
                                            {searchToken2 && <SearchToken setSearchToken={setSearchToken2} setRecToken={setRecieveCoin} setPayToken={setPayCoin} id={id} />}
                                        </div>
                                    </BlueGradientButton>
                                </div>
                            ) : (
                                <div className='flex sm:mr-12 items-center place-self-end gap-2'>
                                    <BlueGradientButton customCss={'disabled px-2 sm:px-4 py-2 sm:py-3 normal-cursor'}>
                                        <img src={RecieveCoin.Image} alt="" className='h-6 w-6 sm:h-8 sm:w-8 transform scale-150' />
                                    </BlueGradientButton>

                                    <div className='font-cabin font-normal text-2xl'>
                                        {RecieveCoin.ShortForm}
                                    </div>
                                    {!searchToken2 ? (
                                        <span className='cursor-pointer' onClick={() => {
                                            setSearchToken2(!searchToken2);
                                            setId(2);
                                        }}><ChevronDown /></span>
                                    ) : (
                                        <span className='cursor-pointer' onClick={() => {
                                            setSearchToken2(!searchToken2);
                                            setId(2);
                                        }}><ChevronUp /></span>
                                    )}
                                    {searchToken2 && <SearchToken setSearchToken={setSearchToken2} setRecToken={setRecieveCoin} setPayToken={setPayCoin} id={id} />}
                                </div>
                            )}
                        </div>
                    </div>

                    {bothCoins && (
                        <div className='w-full mx-auto'>
                            <div className=' flex justify-between items-center my-3'>
                                <div className='flex items-center'>
                                    <Dot color='#F7931A' />
                                    <span>{SwapModalData.bothCoinsPresent.Price}</span>
                                </div>

                                <div className='font-cabin font-medium text-sm sm:text-base '>
                                    {`1 CT = 0.0025 ETH (12.58$)`}
                                </div>
                            </div>

                            <div className=' flex justify-between items-center my-3'>

                                <div className='flex items-center'>
                                    <Dot color='#F7931A' />
                                    <span>{SwapModalData.bothCoinsPresent.GasFees}</span>
                                </div>

                                <div className='font-cabin font-medium text-sm sm:text-base'>
                                    {`0.000052 ETH  ($0.1656)`}
                                </div>
                            </div>

                            <div>
                                {
                                    ClickedSwap && (
                                        <div className='flex flex-col gap-8    my-4  rounded-lg'>

                                            <div className='flex justify-between'>
                                                <div className='flex items-center'>
                                                    <Dot color='#F7931A' />
                                                    <span>{SwapModalData.ClickedSwapData.MinimumRecieved}</span>
                                                </div>

                                                <div className='font-cabin font-medium text-base'>10.5580 CT</div>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex items-center'>
                                                    <Dot color='#F7931A' />
                                                    <span className='relative'>{SwapModalData.ClickedSwapData.OverallSlippage}</span>
                                                </div>

                                                <div><ImpactButton customCss={`font-bold`} Impact={'Positive'}>10%</ImpactButton></div>
                                            </div>
                                            <div className='flex justify-between items-center '>
                                                <div className='flex  items-center '>
                                                    <Dot color='#F7931A' />
                                                    <span>{SwapModalData.ClickedSwapData.LiquidityProviderIncentive}</span>
                                                </div>
                                                <div className='font-cabin font-medium   text-base'>
                                                    0.000056 ETH
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                            <div>
                                {CoinAmount > balance ? (

                                    <GradientButton CustomCss={'w-full cursor-auto disabled opacity-75 font-extrabold text-3xl '}
                                    >{SwapModalData.MainButtonsText.InsufficientBalance}</GradientButton>
                                ) : (
                                    <div>
                                        {ClickedSwap ? (
                                            <div onClick={() => {

                                                navigate('/dex-swap/transaction-successfull')
                                            }}>
                                                <GradientButton CustomCss={'w-full  font-extrabold text-3xl '}>{SwapModalData.MainButtonsText.ConfirmSwapping}</GradientButton>
                                            </div>
                                        ) : (
                                            <div onClick={() => {
                                                setClickSwap(true);
                                                // console.log("swap click", ClickedSwap);
                                            }}>
                                                <GradientButton CustomCss={'w-full  font-extrabold text-3xl '}>{SwapModalData.MainButtonsText.SwapNow}</GradientButton>
                                            </div>
                                        )}
                                    </div>

                                )}
                            </div>




                        </div>
                    )}


                </div>

                {bothCoins && !ClickedSwap && (
                    <div className='lg:w-4/12 md:w-6/12 flex flex-col gap-4 p-4  mx-auto my-4  rounded-lg'>

                        <div className='flex justify-between'>
                            <div className='flex items-center gap-1 sm:gap-2'>
                                <span className='relative custom-text-size-14 sm:text-base'>{SwapModalData.ClickedSwapData.MinimumRecieved}
                                    {show1 &&
                                        <div className='z-50 absolute -ml-6 sm:ml-40 w-[250%]'>
                                            <DialogBox text={Message} />
                                        </div>
                                    }
                                </span>
                                <span
                                    onMouseEnter={() => {
                                        setShow1(true);
                                        setMessage(SwapModalData.infoMessageMinimumRecieved);
                                    }}

                                    onMouseLeave={() => {
                                        setShow1(false);
                                    }}
                                >
                                    <Info size={20} />

                                </span>
                            </div>

                            <div className='font-cabin font-medium text-base'>10.5580 CT</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-1 sm:gap-2'>
                                <span className='relative custom-text-size-14 sm:text-base'>{SwapModalData.ClickedSwapData.OverallSlippage}
                                    {show2 &&
                                        <div className='z-50 absolute -ml-6 sm:ml-40 w-[250%]'>
                                            <DialogBox text={Message} />
                                        </div>
                                    }
                                </span>

                                <span

                                    onMouseEnter={() => {
                                        setShow2(true);
                                        setMessage(SwapModalData.infoMessageOverallSlippage);
                                    }}
                                    onMouseLeave={() => {
                                        setShow2(false);
                                    }}>
                                    <Info size={20} />
                                </span>
                            </div>

                            <div><ImpactButton customCss={`font-bold`} Impact={'Positive'}>10%</ImpactButton></div>
                        </div>
                        <div className='flex justify-between gap-16 sm:gap-0 items-center'>
                            <div className='flex justify-evenly items-center gap-1 sm:gap-2 my-3'>
                                <span className='relative custom-text-size-14 sm:text-base '>
                                    {SwapModalData.ClickedSwapData.LiquidityProviderIncentive}


                                    {show3 &&
                                        <div className='z-50 mb-32 absolute sm:ml-40 w-[150%]'>
                                            <DialogBox text={Message} />
                                        </div>
                                    }
                                </span>
                                <span
                                    className='cursor-pointer'
                                    onMouseEnter={() => {
                                        setShow3(true);
                                        setMessage(SwapModalData.infoMessageLiquidityProviderIncentive);
                                    }}

                                    onMouseLeave={() => {
                                        setShow3(false);
                                    }}>
                                    <Info size={20} />
                                </span>
                            </div>

                            <div className='font-cabin font-medium text-base'>0.000056 ETH</div>
                        </div>

                        <BorderGradientButton customCss={`w-full `}>{SwapModalData.MainButtonsText.AnalysePair}</BorderGradientButton>


                    </div>
                )}

            </div>
        </div>
    )
}
export default Swap