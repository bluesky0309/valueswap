import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  principleId: undefined,
  accountId: undefined,
  state: "idle",
  isConnected: false,
  walletConnected: undefined,
  walletSelected: undefined,
  ledgerActor: undefined,
  bakendActor: undefined,
  walletBalance: null

};
// DfinityWalletStoreState

const walletSlice = createSlice({
  name: "dfinityWallet",
  initialState,
  reducers: {
    resetWallet: (state, action) => {
      state.principleId = undefined;
      state.accountId = undefined;
      state.state = "idle";
      state.isConnected = false;
      state.walletConnected = undefined;
      state.walletSelected = undefined;
      state.ledgerActor = undefined;
    },
    setWalletLoaded: (state, action) => {
      state.state = "connecting";
      const { principleId, accountId, walletActive, walletBalance } = action.payload;
      if (!principleId || !accountId) return;
      state.principleId = principleId;
      state.accountId = accountId;
      state.walletConnected = walletActive;
      state.isConnected = true;
      state.state = "connected";
      state.walletBalance = walletBalance
    },
    setState: (state, action) => {
      state.state = action.payload;
      state.principleId = undefined;
      state.isConnected = false;
    }
  },
});

export const walletActions = { ...walletSlice.actions };

export default walletSlice.reducer;
