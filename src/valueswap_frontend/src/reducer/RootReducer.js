import alertReducer from "./Alert";
import PoolCreation from "./PoolCreation";
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    alert: alertReducer,
    pool: PoolCreation,
});

export default rootReducer;