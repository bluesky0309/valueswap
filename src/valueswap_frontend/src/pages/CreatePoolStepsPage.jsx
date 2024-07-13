import React, { useState } from 'react';
import SelectTokensForPools from '../Modals/poolCreation/SelectTokensForPools';
import SetPoolFees from '../Modals/poolCreation/SetPoolFees';
import InitialLiquidity from '../Modals/poolCreation/InitialLiquidity';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const steps = ['Select Tokens for Pools', 'Set Pool Fees', 'Add Initial Liquidity'];

const CreatePoolStepsPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const isLastStep = activeStep === steps.length - 1;

    const handleNext = () => {
        if (!isLastStep) {
            setActiveStep(current => current + 1);
        }
    };

    const handleStepBack = () => {
        if (activeStep > 0) {
            setActiveStep(current => current - 1);
        }
    };



    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <SelectTokensForPools handleNext={handleNext} />;
            case 1:
                return <SetPoolFees handleNext={handleNext} />;
            case 2:
                return <InitialLiquidity />;
            default:
                return 'Unknown step';
        }
    };

    return (
        <div className=" md:mx-6 my-10 relative">
             <button onClick={handleStepBack} className="mb-4 p-2 border-[1px] rounded-full inline-block lg:hidden ml-4 sm:ml-10 md:ml-12">
                <ArrowBackIcon/>
            </button>
            <div className=" lg:flex-row flex-col py-2 justify-around hidden lg:flex max-w-[1200px] mx-auto">
                {steps.map((label, index) => (
                       <div key={index} className= {`flex gap-6 pb-6 w-full justify-center items-center m-auto`}>
                       <div className={`py-2 px-4 rounded-full  ${activeStep == index  ? "bg-[#F7931A]":"bg-[#00308E]"}`}>{index+ 1}</div>
                       <p className="text-lg">{label}</p>
                       <hr className="border-2 w-1/4 pr-6" />
                     </div>
                ))}
            </div>
            <div className=''>
                {/* <div className="text-lg font-semibold mb-2">Step {activeStep + 1}</div> */}
                <div>
                    {getStepContent(activeStep)}
                </div>
                {/* <div className="flex mt-4">
                    <button className={`mr-2 p-5 rounded-full bg-[#8D4C00] ${activeStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-50'}`} disabled={activeStep === 0} onClick={handleBack}>
                        <MoveLeft size={30} />
                    </button>
                    <div className="flex-grow"></div>
                    {isLastStep ? (
                        <button className="p-5 rounded-full bg-[#8D4C00] opacity-50 cursor-not-allowed">
                            <MoveRight size={30} />
                        </button>
                    ) : (
                        <button className="p-5 rounded-full bg-[#8D4C00] hover:opacity-50" onClick={handleNext}>
                            <MoveRight size={30} />
                        </button>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default CreatePoolStepsPage;
