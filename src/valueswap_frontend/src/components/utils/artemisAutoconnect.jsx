import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { idlFactory } from '../../../../declarations/ckbtc_ledger/index';
import { Artemis } from 'artemis-web3-adapter';
import { walletActions } from "../../reducer/WalletSlice";
import { idlFactory as backendIDL } from "../../../../declarations/valueswap_backend/index"

const connectObj = { whitelist: ['ryjl3-tyaaa-aaaaa-aaaba-cai'], host: 'https://icp0.io/' };
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
                            const ledgerActor = await artemis.getCanisterActor(process.env.CANISTER_ID_CKBTC_LEDGER, idlFactory);
                            const actor = await artemis.getCanisterActor(process.env.CANISTER_ID_VALUESWAP_BACKEND, backendIDL);
                            console.log("ledger", ledgerActor.icrc1_metadata(), "balace", ledgerActor.icrc1_balance_of(hiser-juaaa-aaaaa-qaawa-cai))
                            console.log("backendActor", actor)
                            const walletdetails = {
                                principleId: artemis.principalId, accountId: artemis.accountId, walletActive: artemis.walletActive,
                                ledgerActor: ledgerActor, bakendActor: actor
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
