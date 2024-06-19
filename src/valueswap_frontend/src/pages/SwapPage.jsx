import React from 'react'
import Swap from '../Modals/Swap'
import ConnectWallet from '../Modals/ConnectWallet'
import { useAuth } from '../components/utils/useAuthClient'
const SwapPage = () => {

    const { isAuthenticated, createTokenActor } = useAuth();

    return (
        <div>
            
            <div>
                {isAuthenticated ? (<div>
                    <Swap />
                </div>) : (<div>
                    <h1 className='text-white font-cabin text-4xl font-bold underline text-center'>Please Connect Wallet to Continue with swapping</h1>
                </div>)}
            </div>
        </div>
    )
}

export default SwapPage
