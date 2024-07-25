import alertReducer from "./Alert";
import PoolCreation from "./PoolCreation";
import walletReducer from "./WalletSlice";
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    alert: alertReducer,
    pool: PoolCreation,
    wallet: walletReducer,

});

export default rootReducer;