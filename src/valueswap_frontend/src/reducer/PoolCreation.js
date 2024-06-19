import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CoinCount: 2,
    FeeShare: null,
    PercentShare: 50,
    TotalAmount: null,
    Confirmation: false,
    TotalPercentage: 100,
    TotalAmount: 0,
    Tokens: [
        {
            Name: 'Token1',
            ShortForm: 'Token 1',
            Amount: 0,
            Selected: false,
            WeightedPercentage: 50,
            ImagePath: null,
            Amount: 0.02,
            currencyAmount: 66.10,
            WeightedPercentageLocked: false,
            CanisterId: null
        },
        {
            Name: "Token2",
            ShortForm: 'Token 2',
            Amount: 0,
            Selected: false,
            WeightedPercentage: 50,
            ImagePath: null,
            Amount: 12.2161,
            currencyAmount: 64.89,
            WeightedPercentageLocked: false,
            CanisterId: null
        }
    ],

}

const Pool = createSlice({
    name: "pool",
    initialState,
    reducers: {
        AddCoin: (state, action) => {
            state.CoinCount += 1;
            let coinCount = state.CoinCount;
            state.Tokens.forEach((token) => {
                if (token.WeightedPercentageLocked) {
                    coinCount -= 1;
                }
            });
            let PercentShare = parseFloat(state.TotalPercentage / coinCount).toFixed(2)
            state.Tokens.push(
                {
                    Name: 'new Token',
                    ShortForm: `Token ${state.CoinCount}`,
                    Amount: 0,
                    Selected: false,
                    WeightedPercentage: PercentShare,
                    ImagePath: null,
                    currencyAmount: 0,
                    WeightedPercentageLocked: false,
                }
            )
            state.Tokens.forEach((token) => {
                if (!token.WeightedPercentageLocked) {
                    token.WeightedPercentage = PercentShare;
                }
            });

            state.TotalAmount = SumUpValue(state.Tokens)
        },
        RemoveCoin: (state, action) => {
            const removedIndex = action.payload.index;
            state.CoinCount -= 1;
            let coinCount = state.CoinCount;
            state.Tokens.forEach((token) => {
                if (token.WeightedPercentageLocked) {
                    coinCount -= 1;
                }
            });


            let TempToken = state.Tokens
            TempToken.splice(removedIndex, 1);

            state.Tokens = TempToken
            const newPercentShare = parseFloat(state.TotalPercentage / coinCount).toFixed(2);
            state.Tokens.forEach((token) => {
                if (!token.WeightedPercentageLocked) {
                    token.WeightedPercentage = newPercentShare;
                }
            });
            // const lastCoinIndex = state.Tokens.length - 1;
            // state.Tokens[lastCoinIndex].WeightedPercentage = (state.TotalPercentage - newPercentShare * (state.CoinCount - 1)).toFixed(2);
            state.TotalAmount = SumUpValue(state.Tokens)

        },
        setWeightedPercent: (state, action) => {
            const index = action.payload.index;
            state.Tokens[index].WeightedPercentage = action.payload.percent;
        },
        ToggleLocked: (state, action) => {
            const index = action.payload.index;
            state.Tokens[index].WeightedPercentageLocked = action.payload.toggle

            if (action.payload.toggle === true) {
                console.log("percent gya", action.payload.percent)
                state.TotalPercentage -= parseFloat(action.payload.percent)
            } else {
                console.log("percent waapis aaya", typeof action.payload.percent)
                state.TotalPercentage += parseFloat(action.payload.percent)
            }

            console.log("new total percentage", state.TotalPercentage)
        },
        SetToken: (state, action) => {

            const index = action.payload.index
            state.Tokens[index].Name = action.payload.TokenData.Name;
            state.Tokens[index].ShortForm = action.payload.TokenData.ShortForm;
            state.Tokens[index].ImagePath = action.payload.TokenData.ImagePath;
            state.Tokens[index].CanisterId = action.payload.TokenData.CanisterId;
            state.Tokens[index].Selected = true;
            state.TotalAmount = SumUpValue(state.Tokens)
        },
        SetFeeShare: (state, action) => {
            console.log("fee share to set:->", action)
            state.FeeShare = action.payload.FeeShare;
        },
        UpdateAmount: (state, action) => {
            console.log("amount update reducer called", action)
            const index = action.payload.index;
            state.Tokens[index].Amount = action.payload.Amount
            state.TotalAmount = state.Tokens.reduce((total, token) => total + token.Amount, 0);
            state.TotalAmount = SumUpValue(state.Tokens)
        },
        toggleConfirm: (state, action) => {
            // console.log(" Reducer called in page", action.payload.page)
            state.Confirmation = action.payload.value;
        }

    }
});

export const { AddCoin, RemoveCoin, SetToken, SetFeeShare, UpdateAmount, toggleConfirm, ToggleLocked, setWeightedPercent } = Pool.actions;
export default Pool.reducer;
export const SumUpValue = (tokens) => {
    return tokens.reduce((total, token) => total + token.currencyAmount, 0);
};