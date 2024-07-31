import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { ConnectWalletData } from '../TextData';
import { idlFactory as TokenIdl } from "../../../declarations/ckbtc_ledger/index";
import { idlFactory as backendIDL } from "../../../declarations/valueswap_backend/index"
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, hideAlert } from '../reducer/Alert';

// import { idlFactory } from '../../../declarations/ckbtc_ledger';
import { walletActions } from "../reducer/WalletSlice";
import { artemis } from '../components/utils/artemisAutoconnect';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

const connectObj = { whitelist: [process.env.CANISTER_ID_VALUESWAP_FRONTEND], host: 'https://icp0.io/'};


const ConnectWallet = ({ setClickConnectWallet, setWalletClicked }) => {
    const [TermsAndConditionsChecked, SetTermsAndConditionsChecked] = useState(false);
    const { isConnected, principalId } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    const walletImage = [{ id: 1, url: "/image/dfinity.svg" }, { id: 2, url: "/image/Plug.png" }, { id: 3, url: "/image/astroxme.webp" }, { id: 4, url: "/image/bifinity.png" }, { id: 5, url: "/image/stoic.png" }, { id: 6, url: "/image/nfid.png" }, { id: 7, url: "/image/metamask.svg" }]


    async function handleWalletConnect(id, name) {
        console.log("id", id)
        if (TermsAndConditionsChecked) {
            let connectInfo = await artemis.connect(id, connectObj);
            console.log("connectInfo", connectInfo)

            if (connectInfo) {
                if (artemis?.principalId && artemis?.provider) {

                    // const ledgerActor = await artemis.getCanisterActor(process.env.CANISTER_ID_CKBTC_LEDGER, TokenIdl, true);
                    // const actor = await artemis.getCanisterActor(process.env.CANISTER_ID_VALUESWAP_BACKEND, backendIDL, true);
                    const walletBalance = await artemis.getWalletBalance()
                
                    const walletdetails = {
                        principleId: artemis.principalId, accountId: artemis.accountId, walletActive: artemis.walletActive, walletBalance: walletBalance
                    }
                    dispatch(walletActions.setWalletLoaded({ ...walletdetails }));
                }
            } else {
                console.log("retry to connect");
            }
            setClickConnectWallet(false);
        } else {
            dispatch(showAlert({
                type: 'danger',
                text: 'Please Agree to Terms and Condition'
            }));
            setTimeout(() => {
                dispatch(hideAlert());
            }, 3000);
        }
    };







    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center custom-z-index'>
            <div className='bg-[#05071D] mt-28 lg:4/12 md:w-5/12 sm:w-6/12 w-10/12 max-w-[400px] border rounded-xl flex flex-col gap-2 my-auto mx-auto'>
                <div className='md:w-[64%] w-[62%] flex place-self-end items-center justify-between mx-4'>
                    <span className='font-fahkwang font-medium md:text-2xl text-xl py-4'>{ConnectWalletData.Heading}</span>
                    <span className='cursor-pointer' onClick={() => setClickConnectWallet(false)}><X /></span>
                </div>
                <div className='border border-transparent font-bold custom-height-3 bg-gradient-to-r from-transparent via-[#00308E] to-transparent w-full mx-auto'></div>
                <div className='flex flex-col items-center gap-4 overflow-y-scroll h-72 '>
                    {artemis?.wallets.map((item, indx) => (
                        <div key={indx} className={`flex gap-6 items-center w-10/12 p-2 bg-[#303030] hover:opacity-80 cursor-pointer rounded-xl`}
                            onClick={() => handleWalletConnect(item?.id, item?.name)}>
                            <div className='rounded-lg bg-[#3D3F47]'>
                                <img src={walletImage[indx]?.url} alt="" className='w-8 h-8' />
                            </div>
                            <div className='font-extralight text-lg font-cabin text-start'>{item?.name}</div>
                        </div>))}
                    {/* <div className={`flex gap-6 items-center w-10/12 px-2 py-2 bg-[#303030] hover:opacity-80 cursor-pointer rounded-xl`}
                        onClick={() => handleWalletConnect('nfid')}>
                        <div className='rounded-lg bg-[#3D3F47]'>
                            <img src='/image/nfid.png' alt="" className='w-8 h-8' />
                        </div>
                        <div className='font-normal text-lg font-cabin text-start'>NFID</div>
                    </div>
                    <div className={`flex gap-6 items-center w-10/12 px-2 py-2 bg-[#303030] hover:opacity-80 cursor-pointer rounded-xl`}
                        onClick={() => handleWalletConnect("bitfinity")}>
                        <div className='rounded-lg bg-[#3D3F47]'>
                            <img src="/image/bifinity.png" alt="" className='w-8 h-8' />
                        </div>
                        <div className='font-normal text-lg font-cabin text-start'>Bifinity</div>
                    </div>
                    <div className={`flex gap-6 items-center w-10/12 px-2 py-2 bg-[#303030] hover:opacity-80 cursor-pointer rounded-xl`}
                        onClick={() => handleWalletConnect("plug")}>
                        <div className='rounded-lg bg-[#3D3F47]'>
                            <img src='/image/Plug.png' alt="" className='w-8 h-8' />
                        </div>
                        <div className='font-normal text-lg font-cabin text-start'>Plug</div>
                    </div> */}
                </div>
                <div className='border border-transparent font-bold custom-height-3 bg-gradient-to-r from-transparent via-[#00308E] to-transparent w-full mx-auto'></div>
                <div className='p-4 w-10/12 mx-auto space-x-4 flex'>
                    <input
                        type="checkbox"
                        id="consent-checkbox"
                        className="w-6 h-5 text-blue-600 bg-gray-800 border-gray-600 rounded-xl   dark:ring-offset-gray-800  mt-2"
                        onChange={() => SetTermsAndConditionsChecked(!TermsAndConditionsChecked)}
                    />
                    <label htmlFor="consent-checkbox" className="text-base font-cabin">
                        {ConnectWalletData.TermsAndConditions} <a href="" className='text-blue-500 underline'>{ConnectWalletData.LearnMore}</a>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ConnectWallet;
