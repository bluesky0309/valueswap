import React, { useState } from 'react';
import SelectTokensForPools from '../Modals/poolCreation/SelectTokensForPools';
import SetPoolFees from '../Modals/poolCreation/SetPoolFees';
import InitialLiquidity from '../Modals/poolCreation/InitialLiquidity';
import { MoveRight, MoveLeft } from 'lucide-react';
const steps = ['Select Tokens for Pools', 'Set Pool Fees', 'Add Initial Liquidity'];

const CreatePoolStepsPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    const handleNext = () => {
        if (!isLastStep) {
            setActiveStep(current => current + 1);
        }
    };

    const handleBack = () => {
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
        <div className=" md:mx-6 my-10">
            <div className="border-b-2 border-gray-200 mb-4">
                {steps.map((label, index) => (
                    <div key={label} className={`inline-block font-cabin font-normal text-sm sm:text-base md:text-xl text-center px-4 py-2 ${index <= activeStep ? 'text-blue-500 border-b-4 border-blue-500' : 'text-gray-500'}`}>
                        {label}
                    </div>
                ))}
            </div>
            <div className='my-16'>
                {/* <div className="text-lg font-semibold mb-2">Step {activeStep + 1}</div> */}
                <div>
                    {getStepContent(activeStep)}
                </div>
                <div className="flex mt-4">
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
                </div>
            </div>
        </div>
    );
}

export default CreatePoolStepsPage;
