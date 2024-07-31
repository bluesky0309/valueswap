import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Artemis } from 'artemis-web3-adapter';
import { walletActions } from "../../reducer/WalletSlice";
import { idlFactory as backendIDL } from "../../../../declarations/valueswap_backend/index"


const connectObj = { whitelist: [process.env.CANISTER_ID_VALUESWAP_FRONTEND], host: 'https://icp0.io/'};
export const artemis = new Artemis();

function artemisAutoconnect() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initLog = async () => {
            const walletId = localStorage.getItem('dfinityWallet') || '';

            if (walletId) {
                try {
                    const walletStatus = await artemis.autoConnect(connectObj);

                    if (walletStatus) {
                        if (artemis?.principalId && artemis?.provider) {
                           
                            
                            const walletdetails = {
                                principleId: artemis.principalId, accountId: artemis.accountId, walletActive: artemis.walletActive
                            }
                            dispatch(walletActions.setWalletLoaded({ ...walletdetails }));
                        }
                    } else {
                        console.log("Issue while logging in");
                    }
                } catch (error) {
                    console.error("Error during wallet connection: ", error);
                }
            }
        };

        initLog();
    }, [dispatch]);

    return (
        <div>artemisAutoconnect</div>
    );
}

export default artemisAutoconnect;