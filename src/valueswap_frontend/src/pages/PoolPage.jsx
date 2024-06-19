import React, { useEffect, useState } from 'react'
import PoolPageBackGround from '../assets/images/PoolPageBackGround.png'
import { Routes, Route } from 'react-router-dom'
import ShowAllPools from '../components/poolPageComponent/ShowAllPools'
import CreatePools from '../components/poolPageComponent/CreatePools'
import CreatePoolStepsPage from './CreatePoolStepsPage'
import { useLocation } from 'react-router-dom'
import Carousel from './Carousel'

const PoolPage = () => {
    const location = useLocation();
    const [boxText, setBoxText] = useState('Pool Overview');


    useEffect(() => {
        if (location.pathname.includes("/dex-swap/pool/create-pool")) {
            setBoxText('Create Pool');
        } else {
            setBoxText('Pool Overview');
        }
    }, [location])
    return (
        <div className='h-screen bg-[#000711] '>
            <div className='items-center'>
                {
                    location.pathname != '/dex-swap/pool/create-pool/steps' ? (
                        <img src={PoolPageBackGround} alt="" className='-z-0 h-96 w-full absolute top-0' />
                    ) : (
                        <div>

                        </div>
                    )
                }
                {
                    location.pathname != '/dex-swap/pool/create-pool/steps' ? (
                        <div className='flex justify-center'>
                            {
                                boxText == 'Create Pool' ? (
                                    <div className='my-14 md:m-14 w-11/12 border  text-white p-8 rounded-2xl backdrop-blur-3xl md:w-[60%] lg:w-[47%]'>
                                        <div className='text-start font-fawhkwang font-normal leading-7 text-2xl'>
                                            Rewards For Liquidity Providers
                                        </div>
                                        <div className='border-t-2 my-6 border-[#00308E]'></div>
                                        <span className='font-normal text-base font-cabin leading-5 italic'>
                                            When you add money to a liquidity pool, you can earn 0.3% of all trades made in that pool. Your earnings are based on how much of the pool you own. Every time someone makes a trade, a small fee is added to the pool, and you can collect your share of those fees whenever you decide to withdraw your money from the pool.
                                            <a href="" className='text-blue-500 underline ml-2'>Learn More</a>
                                        </span>
                                    </div>
                                ) : (
                                    <div className='m-14 text-center  font-fahkwang  text-white p-8 font-semibold text-3xl  max-w-72   h-full w-full bg-white-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 border border-gray-100'>
                                        {boxText}
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div>

                        </div>
                    )
                }
            </div>

            <Routes>
                <Route path='/' element={<ShowAllPools />} />
                <Route path='/create-pool' element={<CreatePools />} />
                <Route path='/create-pool/steps' element={<Carousel />} />
            </Routes>

        </div>
    )
}

export default PoolPage
