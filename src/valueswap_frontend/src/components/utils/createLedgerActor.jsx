import { Principal } from "@dfinity/principal";
import { artemis } from "./artemisAutoconnect";
import { idlFactory } from '../../../../declarations/ckbtc_ledger/index';

const fetchICPBalance = async (principalId) => {
    try {
        const canisterId = process.env.CANISTER_ID_CKBTC_LEDGER;
        console.log("Canister ID:", canisterId);
        console.log("Principal ID:", principalId);

        if (!canisterId) {
            throw new Error("Canister ID is not set");
        }

        const ledgerActor = await artemis.getCanisterActor(canisterId, idlFactory, true);
        console.log("ledgerActor", ledgerActor);

        if (principalId) {
            const argument = { owner: Principal.fromText(principalId), subaccount: [] };
            console.log("Calling icrc1_balance_of with argument:", argument);

            
            const tokenName = await ledgerActor.icrc1_name();
            console.log("Token Name:", tokenName);
            const balance = await ledgerActor.icrc1_balance_of(argument);
            console.log("balance", balance);
            return balance;
        } else {
            console.error("Principal ID is undefined");
            return null;
        }
    } catch (error) {
        console.error("Error fetching balance:", error);
        return null;
    }
};

export default fetchICPBalance;
