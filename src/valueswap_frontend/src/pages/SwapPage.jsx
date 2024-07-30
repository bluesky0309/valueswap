import React from 'react'
import Swap from '../Modals/Swap'
import ConnectWallet from '../Modals/ConnectWallet'
import { useSelector } from 'react-redux'
const SwapPage = () => {
     const {isConnected} = useSelector((state)=> state.wallet)


    return (
        <div>
            
            <div>
                {isConnected ? (<div>
                    <Swap />
                </div>) : (<div>
                    <h1 className='text-white font-cabin text-4xl font-bold underline pt-44  text-center'>Please Connect Wallet to Continue with swapping</h1>
                </div>)}
            </div>
        </div>
    )
}

export default SwapPage
