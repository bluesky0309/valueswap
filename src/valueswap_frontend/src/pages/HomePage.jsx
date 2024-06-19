import React, { useState, useEffect } from 'react'
import SwapPage from './SwapPage'
import TransactionPage from './TransactionPage'
import PoolPage from './PoolPage'
import PortfolioPage from './PortfolioPage'
import { Routes, Route } from 'react-router-dom'

const HomePage = () => {


    return (
        <div className='w-full h-screen'>
            <Routes>
                <Route path="/" element={<SwapPage/>} />
                <Route path="/transaction-successfull" element={<TransactionPage />} />
                <Route path="/portfolio/*" element={<PortfolioPage />} />
                <Route path="/pool/*" element={<PoolPage />} />

            </Routes>
        </div>
    )
}

export default HomePage
