import React, { useEffect, useState } from 'react'
import { Bolt } from 'lucide-react';
import BlueGradientButton from '../../buttons/BlueGradientButton';
import FinalizePool from './FinalizePool';
import GradientButton from '../../buttons/GradientButton';
import { showAlert, hideAlert } from '../../reducer/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAmount, toggleConfirm } from '../../reducer/PoolCreation'
import { useAuth } from '../../components/utils/useAuthClient';

const InitialLiquidity = () => {


    const dispatch = useDispatch();
    const [restTokensBalances, setRestTokensBalances] = useState([]);
    const { createTokenActor, principal } = useAuth()
    const [tokenActor, setTokenActor] = useState();
    const [initialTokenBalance, setInitialTokenBalance] = useState();
    const { Tokens, Confirmation } = useSelector((state) => state.pool);
    const [ButtonActive, SetButtonActive] = useState(false);
    const [initialTokenAmount, setInitialTokenAmount] = useState(Tokens[0].Amount);
    const [restTokensAmount, setRestTokensAmount] = useState(Tokens.slice(1).map(token => token.Amount));
    const [AmountSelectCheck, setAmountSelectCheck] = useState(false);

    let InitialToken = Tokens[0];
    let RestTokens = Tokens.slice(1);
    const HandleSelectCheck = () => {
        const allTokensSelected = Tokens.every((token) => token.Selected);
        SetButtonActive(allTokensSelected);
        const amountsValid = initialTokenAmount <= initialTokenBalance && restTokensAmount.every((amount, index) => amount <= restTokensBalances[index]);
        setAmountSelectCheck(amountsValid);
    };


    useEffect(() => {
        if (InitialToken) {
            console.log("Principal of this mf :->", principal)
            const actor = createTokenActor(InitialToken.CanisterId);
            setTokenActor(actor);
        }
    }, [InitialToken, createTokenActor, principal]);

    useEffect(() => {
        const fetchTokenBalance = async () => {
            if (tokenActor) {
                console.log("Token Actor Set hote hue :->", tokenActor);
                let balance = await tokenActor.icrc1_balance_of({ owner: principal, subaccount: [] });
                console.log("Balance of the first Token:", balance);
                setInitialTokenBalance(parseFloat(balance));
            }
        };

        fetchTokenBalance();
    }, [tokenActor, principal]);

    useEffect(() => {
        HandleSelectCheck()
    }, [Tokens])

    useEffect(() => {
        const fetchRestTokensBalances = async () => {
            const balances = await Promise.all(RestTokens.map(async (token) => {
                const actor = createTokenActor(token.CanisterId);
                const balance = await actor.icrc1_balance_of({ owner: principal, subaccount: [] });
                return parseFloat(balance);
            }));
            setRestTokensBalances(balances);
        };

        if (RestTokens.length > 0) {
            fetchRestTokensBalances();
        }
    }, [RestTokens, createTokenActor, principal]);

    const handleInput = (event, index) => {
        const newValue = parseFloat(event.target.textContent)
        if (index === 0) {
            setInitialTokenAmount(newValue);
        } else {
            const newAmounts = [...restTokensAmount];
            newAmounts[index - 1] = newValue;
            setRestTokensAmount(newAmounts);
        }

        dispatch(UpdateAmount({
            index: index,
            Amount: newValue
        }));
    };

    return (
        <div className=''>
             
        <div className='z-50 w-max m-auto flex flex-col gap-4 p-3 sm:p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border mx-auto rounded-lg'>
            <div className='w-[78%] sm:w-[74%] place-self-end  flex justify-between'>
                <span className='font-fahkwang font-light text-base sm:text-3xl '>Set Initial Liquidity</span>
                <div className='sm:hidden block'>
                    <Bolt size={22} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
                </div>
                <div className='sm:block hidden'>
                    <Bolt size={30} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
                </div>
            </div>


            <div className='flex justify-between gap-12 sm:gap-52 items-center font-cabin'>

                <div className='flex flex-col'>

                    <div>
                        {/* contentEditable="true" onInput={(e) => { handleInput(e, 0) }} */}
                        <span className="font-normal leading-5 text-xl sm:text-3xl  py-1 inline-block" contentEditable="true" onInput={(e) => { handleInput(e, 0) }}>
                            {initialTokenAmount}
                        </span>
                    </div>

                    <span className='text-sm sm:text-base font-normal'>
                        Balance: {initialTokenBalance}
                    </span>
                </div>

                <div className='flex flex-col justify-center'>
                    <div className='flex gap-3 items-center'>
                        <BlueGradientButton customCss={'disabled px-2 py-2 sm:px-4 sm:py-3 normal-cursor'}>
                            <img src={InitialToken.ImagePath} alt="" className=' h-3 w-3 sm:h-8 sm:w-8 transform scale-150' />
                        </BlueGradientButton>

                        <span className='text-base sm:text-2xl font-normal'>
                            {InitialToken.ShortForm}
                        </span>

                        <span className='bg-[#3E434B] py-1 rounded-lg px-2 sm:px-3'>
                            {InitialToken.WeightedPercentage}   %
                        </span>

                    </div>

                    <span className='text-center font-normal leading-5 text-sm sm:text-base'>
                        $66.12
                    </span>
                </div>
            </div>
            <div>
                {RestTokens.map((token, index) => {
                    const balance = restTokensBalances[index]
                    
                    return (
                        <div key={index}>
                            <div className='border-t-[1px] opacity-50 item-center my-6'></div>
                            <div className='flex justify-between items-center font-cabin' >

                                <div className='flex flex-col'>
                                    <div>
                                        {/* contentEditable="true" onInput={(e) => { handleInput(e, index + 1) }} */}
                                        <span className="font-normal leading-5 text-xl sm:text-3xl  py-1 inline-block" contentEditable="true" onInput={(e) => { handleInput(e, index + 1) }}>
                                            {restTokensAmount[index]}

                                        </span>

                                    </div>
                                    <span className='text-sm sm:text-base font-normal'>
                                        Balance: {balance}

                                    </span>
                                </div>

                                <div className='flex flex-col justify-center'>
                                    <div className='flex gap-3 items-center'>
                                        <BlueGradientButton customCss={'disabled px-2 py-2 sm:px-4 sm:py-3 normal-cursor'}>
                                            <img src={token.ImagePath} alt="" className='h-3 w-3 sm:h-8 sm:w-8 transform scale-150' />
                                        </BlueGradientButton>

                                        <span className='text-sm sm:text-2xl font-normal'>
                                            {token.ShortForm}
                                        </span>

                                        <span className='bg-[#3E434B] py-1 rounded-lg px-2 sm:px-3'>
                                            {token.WeightedPercentage}   %
                                        </span>

                                    </div>

                                    <span className='text-center font-normal leading-5 text-sm sm:text-base'>
                                        $66.12
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            {Confirmation && <FinalizePool />}
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
                    } else if (!AmountSelectCheck) {
                        dispatch(showAlert({
                            type: 'danger',
                            text: 'You do not have enough tokens.'
                        }))
                        setTimeout(() => {
                            dispatch(hideAlert());
                        }, [3000])
                    } else {
                        console.log("dispatched called")
                        dispatch(toggleConfirm({
                            value: true,
                            page: "Initial Page"
                        }))
                        console.log("dispatched finished")
                    }
                }}
                >
                <GradientButton CustomCss={` my-2 sm:my-4 w-full ${ButtonActive ? ' opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}>
                    Analyse Pair
                </GradientButton>
            </div>
        </div>
                </div>
    )
}

export default InitialLiquidity

