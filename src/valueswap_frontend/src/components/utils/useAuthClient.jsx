// import React, { createContext, useContext, useState } from "react";
// import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin, Types, CreateActor } from 'ic-auth';
// // import { idlFactory,createActor} from "../../declarations/loginme_backend/index";
// import { createActor } from "../../../../declarations/ckbtc_ledger/index"
// const AuthContext = createContext();
// const useAuthClient = () => {
//     const canisterID = process.env.CANISTER_ID_CKBTC_LEDGER;
//     const whitelist = [process.env.CANISTER_ID_CKBTC_LEDGER];


//     const login = async (provider) => {
//         let userObject = {
//             principal: "Not Connected.",
//             agent: undefined,
//             provider: "N/A",
//         };

//         try {
//             if (provider === "Plug") {
//                 userObject = await PlugLogin(whitelist);
//             } else if (provider === "Stoic") {
//                 userObject = await StoicLogin();
//             } else if (provider === "NFID") {
//                 userObject = await NFIDLogin();
//             } else if (provider === "Identity") {
//                 userObject = await IdentityLogin();
//             }
//             console.log(userObject);
//             const identity = userObject.agent._identity;
//             // const actor = await CreateActor(userObject.agent, idlFactory, canisterID);
//             const actor = await createActor(canisterID, { agentOptions: { identity } })
//             const name = "dragon";
//             const result = await actor.icrc1_name();
//             console.log(result);
//             // Handle code will go here...
//         } catch (error) {
//             console.error("Login error:", error);
//         }
//     };

//     return {
//         login,
//         logout,
//         setPrincipal,
//         backendActor,
//         identity,
//     }

// };

// export const AuthProvider = ({ children }) => {
//     const auth = useAuthClient();
//     return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// };
// // 
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin, Types, CreateActor } from 'ic-auth';
// import { idlFactory,createActor} from "../../declarations/loginme_backend/index";
import { createActor, idlFactory } from "../../../../declarations/ckbtc_ledger/index"
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";

const AuthContext = createContext();
const canisterID = process.env.CANISTER_ID_CKBTC_LEDGER;
const whitelist = [process.env.CANISTER_ID_CKBTC_LEDGER];

export const useAuthClient = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [principal, setPrincipal] = useState(null);
    const [backendActor, setBackendActor] = useState(createActor(canisterID));
    const [identity, setIdentity] = useState(null);
    const [authClient, setAuthClient] = useState(null);
    const [balance, setBalance] = useState(null)
    const [userObjects,  setUserObjects] = useState()
    useEffect(() => {
        const initializeAuthClient = async () => {
            const client = await AuthClient.create();
            setAuthClient(client);
            // 
            if (await client.isAuthenticated()) {
                const identity = client.getIdentity();
                const principal = identity.getPrincipal();
                const actor =  createActor(canisterID, { agentOptions: { identity } });
                getBalance(principal, actor)
                setIsAuthenticated(true);
                setPrincipal(principal);
                setIdentity(identity);
                setBackendActor(actor);
            }
        };
        // 
        initializeAuthClient();
    }, []);
    // 
    const login = async (provider) => {
        if (authClient) {
            let userObject = {
                principal: "Not Connected.",
                agent: undefined,
                provider: "N/A",
            };
            if (provider === "Plug") {
                userObject = await PlugLogin(whitelist);
                console.log("userobj", userObject)
            } else if (provider === "Bitfinity") {
                userObject = await infinityLogin();
            } else if (provider === "NFID") {
                userObject = await NFIDLogin();
            } else if (provider === "Identity") {
                userObject = await IdentityLogin();
            }
            console.log("userObject", userObject);
            const identity = await userObject?.agent._identity;
            const principal = Principal.fromText(userObject.principal);
           
            // const ledgerActor = Actor.createActor(ledgerIdl, { userObject.agent, canisterId: process.env.CANISTER_ID_CKBTC_LEDGER });
            setUserObjects(userObject)
            setIsAuthenticated(true);
            setPrincipal(principal);
            setIdentity(identity);
            // 
            // await authClient.login({
            //     identity,
            //     onSuccess: () => {
            //         setIsAuthenticated(true);
            //         setPrincipal(principal);
            //         setIdentity(identity);
            //     },
            // });
        }
    };
    // 
    const createTokenActor = async (canisterID) => {
        const actor = await createActor(canisterID, { agentOptions: { identity } })
        return actor;

    }
    const logout = async () => {
        if (authClient) {
            await authClient.logout();
            setIsAuthenticated(false);
            setPrincipal(null);
            setIdentity(null);
        }
    };
    // 
    const reloadLogin = () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (isAuthenticated() && ((await getIdentity().principal().isAnonymous()) === false)) {
                    updateClient(authClient);
                    resolve(AuthClient);
                }
            } catch (error) {
                reject(error);
            }
        })
    };

   const getBalance = async (principal, canisterId) =>{
    const actor = await createTokenActor(canisterId)
    const balance = await actor.icrc1_balance_of({ owner: principal, subaccount: [] })
    setBalance(balance)
    console.log("initialActor", actor)
    return balance;
   }


    // 
    return {
        // 
        login,
        logout,
        principal,
        isAuthenticated,
        setPrincipal,
        createTokenActor,
        backendActor,
        identity,
        getBalance,
        balance
    };
};
// 
export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
// 
export const useAuth = () => useContext(AuthContext);