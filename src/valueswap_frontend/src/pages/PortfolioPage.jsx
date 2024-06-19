import React, { useEffect, useState } from 'react'
import PoolPageBackGround from '../assets/images/PoolPageBackGround.png'
import { Routes, Route } from 'react-router-dom'
import PortfolioDataComponent from '../components/portfolioComponents/PortfolioDataComponent'
import PoolInfo from '../components/portfolioComponents/PoolInfo '
const PortfolioPage = () => {



    return (
        <div className='h-screen bg-[#000711]'>
            <div className='items-center'>
                <img src={PoolPageBackGround} alt="" className='z-0 h-96 w-full absolute top-0' />
                <div className='flex justify-center pt-12'>
                    <div className=' text-center flex flex-col gap-4 p-4 font-fahkwang  text-white  font-medium text-3xl max-w-64  h-full w-full bg-white-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-100 border border-gray-100'>
                        <span className='text-xl leading-5'>Available Balance</span>
                        <span className='text-4xl flex justify-center font-bold'>125.25 $</span>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='/' element={<PortfolioDataComponent />} />
                <Route path='/pool-info/:id' element={<PoolInfo />} />
            </Routes>
        </div>
    )
}

export default PortfolioPage
