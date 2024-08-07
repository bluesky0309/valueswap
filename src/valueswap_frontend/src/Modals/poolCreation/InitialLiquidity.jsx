import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Bolt } from 'lucide-react';
import BlueGradientButton from '../../buttons/BlueGradientButton';
import FinalizePool from './FinalizePool';
import GradientButton from '../../buttons/GradientButton';
import { showAlert, hideAlert } from '../../reducer/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateAmount, toggleConfirm } from '../../reducer/PoolCreation';
import { useAuth } from '../../components/utils/useAuthClient';

const InitialLiquidity = () => {
  const dispatch = useDispatch();
  const { createTokenActor, principal, getBalance } = useAuth();
  const [tokenActor, setTokenActor] = useState(null);
  const [initialTokenBalance, setInitialTokenBalance] = useState(0);
  const [restTokensBalances, setRestTokensBalances] = useState([]);
  const [initialTokenAmount, setInitialTokenAmount] = useState(0);
  const [restTokensAmount, setRestTokensAmount] = useState([]);
  const [ButtonActive, SetButtonActive] = useState(false);
  const [AmountSelectCheck, setAmountSelectCheck] = useState(false);
  const { Tokens, Confirmation } = useSelector((state) => state.pool);

  const initialTokenRef = useRef(null);
  const restTokensRefs = useRef([]);

  useEffect(() => {
    if (Tokens.length > 0) {
      setInitialTokenAmount(Tokens[0].Amount);
      setRestTokensAmount(Tokens.slice(1).map((token) => token.Amount));
    }
  }, [Tokens]);

  const fetchTokenActor = useCallback(async () => {
    if (Tokens.length > 0) {
      const actor = await createTokenActor(Tokens[0].CanisterId);
      setTokenActor(actor);
    }
  }, [Tokens, createTokenActor]);

  useEffect(() => {
    fetchTokenActor();
  }, [fetchTokenActor]);

  useEffect(() => {
    const fetchInitialTokenBalance = async () => {
      if (tokenActor && principal) {
        const balance = await tokenActor.icrc1_balance_of({ owner: principal, subaccount: [] });
        setInitialTokenBalance(parseFloat(balance));
      }
    };
    fetchInitialTokenBalance();
  }, [tokenActor, principal]);

  const fetchRestTokensBalances = useCallback(async () => {
    if (Tokens.length > 1) {
      const balances = await Promise.all(
        Tokens.slice(1).map(async (token) => {
           const balance = await getBalance(principal, token.CanisterId)
       
          return parseFloat(balance);
        })
      );
      setRestTokensBalances(balances);
    }
  }, [Tokens, createTokenActor, principal]);

  useEffect(() => {
    fetchRestTokensBalances();
  }, [fetchRestTokensBalances]);

  const handleInput = (event, index) => {
    const newValue = parseFloat(event.target.value);
    if (index === 0 && newValue !== 0) {
      setInitialTokenAmount(newValue);
    } else {
      const newAmounts = [...restTokensAmount];
      newAmounts[index - 1] = newValue;
      setRestTokensAmount(newAmounts);
    }
    dispatch(UpdateAmount({ index, Amount: newValue }));
  };

  const HandleSelectCheck = useCallback(() => {
    const allTokensSelected = Tokens.every((token) => token.Selected);
    SetButtonActive(allTokensSelected);
    const amountsValid =
      initialTokenAmount <= initialTokenBalance &&
      restTokensAmount.every((amount, index) => amount <= restTokensBalances[index]);
    setAmountSelectCheck(amountsValid);
  }, [Tokens, initialTokenAmount, initialTokenBalance, restTokensAmount, restTokensBalances]);

  useEffect(() => {
    HandleSelectCheck();
  }, [Tokens, HandleSelectCheck]);

  if (Tokens.length === 0) {
    return null;
  }

  const InitialToken = Tokens[0];
  const RestTokens = Tokens.slice(1);



  const transferApprove = async (sendAmount, canisterId, backendCanisterID, tokenActor) => {
    try {
      const metaData = await tokenActor.icrc1_metadata();
      const decimals = parseInt(metaData?.["icrc1:decimals"]);
      const fee = parseInt(metaData?.["icrc1:fee"]);

      const amount = parseInt(Number(sendAmount) * Math.pow(10, decimals));
      const balance = await getBalance(principal, canisterId);

      if (balance >= amount + fee) {
        const transaction = {
          amount: Number(amount) + Number([fee]),
          from_subaccount: [],
          spender: {
            owner: backendCanisterID,
            subaccount: [],
          },
          fee: [fee],
          memo: [],
          created_at_time: [],
          expected_allowance: [],
          expires_at: [],
        };

        const response = await tokenActor.icrc2_approve(transaction);

        if (response?.Err) {
          console.error("Approval error:", response.Err);
          return;
        } else {
          console.log("Approval successful:", response.Ok);
          // afterPaymentFlow(parseInt(response.Ok).toString(), amount);
        }
      } else {
        console.error("Insufficient balance:", balance, "required:", amount + fee);
      }
    } catch (error) {
      console.error("Error in transferApprove:", error);
    }
  };



  const handleCreatePoolClick = async (backendCanisterID) => {
    try {
      for (let i = 0; i < Tokens.length; i++) {
        const tokenActors = await createTokenActor(Tokens[i].CanisterId)
        await transferApprove(Tokens[i].Amount, Tokens[i].CanisterId, backendCanisterID, tokenActors);
      }
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  };

  return (
    <div className=''>
      <div className='w-full'>
        <div className={`flex gap-6 pb-6 w-[70%] md:w-[60%] justify-between items-center m-auto  lg:hidden`}>
          <div className={`py-2 px-4 rounded-full bg-[#F7931A]`}>3</div>
          <p className="text-lg"></p>
          <hr className="border-2 w-3/4 pr-6" />
        </div>
      </div>
      <div className='z-50 w-max m-auto flex flex-col gap-4 p-3 sm:p-6 bg-gradient-to-b from-[#3E434B] to-[#02060D] border mx-auto rounded-lg'>
        <div className='w-[78%] sm:w-[74%] place-self-end  flex justify-between'>
          <span className='font-fahkwang font-light text-base sm:text-3xl '>Set Initial Liquidity</span>
          <div className='sm:hidden block'>
            <Bolt size={22} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
          </div>
          <div className='sm:block hidden'>
            <Bolt size={30} className='cursor-pointer' onClick={() => { console.log("settings open") }} />
          </div>
        </div>

        <div className='flex justify-between gap-12 items-center font-cabin'>
          <div className='flex flex-col'>
            <div>
              <input
                className="font-normal leading-5 text-xl sm:text-3xl py-1 inline-block bg-transparent border-none outline-none"
                type="number"
                value={initialTokenAmount}
                ref={initialTokenRef}
                onChange={(e) => handleInput(e, 0)}
              />
            </div>
            <span className='text-sm sm:text-base font-normal'>
              Balance: {initialTokenBalance}
            </span>
          </div>
          <div className='flex flex-col justify-center'>
            <div className='flex gap-3 items-center'>
              <BlueGradientButton customCss={'disabled px-2 py-2 sm:px-4 sm:py-3 normal-cursor'}>
                <img src={InitialToken.ImagePath} alt="" className=' h-3 w-3 sm:h-8 sm:w-8 transform scale-150' />
              </BlueGradientButton>
              <span className='text-base sm:text-2xl font-normal'>
                {InitialToken.ShortForm}
              </span>
              <span className='bg-[#3E434B] py-1 rounded-lg px-2 sm:px-3'>
                {InitialToken.WeightedPercentage} %
              </span>
            </div>
            <span className='text-center font-normal leading-5 text-sm sm:text-base'>
              $66.12
            </span>
          </div>
        </div>

        <div>
          {RestTokens.map((token, index) => {
            const balance = restTokensBalances[index];

            return (
              <div key={index}>
                <div className='border-t-[1px] opacity-50 item-center my-6'></div>
                <div className='flex justify-between items-center font-cabin'>
                  <div className='flex flex-col'>
                    <div>
                      <input
                        className="font-normal leading-5 text-xl sm:text-3xl py-1 inline-block outline-none bg-transparent"
                        type="number"
                        value={restTokensAmount[index]}
                        ref={(el) => (restTokensRefs.current[index] = el)}
                        onChange={(e) => handleInput(e, index + 1)}
                      />
                    </div>
                    <span className='text-sm sm:text-base font-normal'>
                      Balance: {balance }
                    </span>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <div className='flex gap-3 items-center'>
                      <BlueGradientButton customCss={'disabled px-2 py-2 sm:px-4 sm:py-3 normal-cursor'}>
                        <img src={token.ImagePath} alt="" className='h-3 w-3 sm:h-8 sm:w-8 transform scale-150' />
                      </BlueGradientButton>
                      <span className='text-sm sm:text-2xl font-normal'>
                        {token.ShortForm}
                      </span>
                      <span className='bg-[#3E434B] py-1 rounded-lg px-2 sm:px-3'>
                        {token.WeightedPercentage} %
                      </span>
                    </div>
                    <span className='text-center font-normal leading-5 text-sm sm:text-base'>
                      $66.12
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {Confirmation && <FinalizePool handleCreatePoolClick={handleCreatePoolClick} />}
        <div
          className={`font-cabin text-base font-medium`}
          onClick={() => {
            if (!ButtonActive) {
              dispatch(showAlert({
                type: 'danger',
                text: 'Please select all the coins'
              }));
              setTimeout(() => {
                dispatch(hideAlert());
              }, [3000]);
            } else if (!AmountSelectCheck) {
              dispatch(showAlert({
                type: 'danger',
                text: 'You do not have enough tokens.'
              }));
              setTimeout(() => {
                dispatch(hideAlert());
              }, [3000]);
            } else {
              console.log("dispatched called");
              dispatch(toggleConfirm({
                value: true,
                page: "Initial Page"
              }));
              console.log("dispatched finished");
            }
          }}
        >
          <GradientButton CustomCss={`my-2 sm:my-4 w-full md:w-full ${ButtonActive ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}>
            Analyse Pair
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default InitialLiquidity;
