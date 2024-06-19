import React, { useState } from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function SwapSetting() {
    const [percentage, setPercentage] = useState({
        value: 0,
    });

    const [showTooltip, setShowTooltip] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showTooltip2, setShowTooltip2] = useState(false)

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    const handleMouseEnterInfo2 = () => {
        setShowTooltip2(true);
    }

    const handleMouseLeaveInfo2 = () => {
        setShowTooltip2(false);
    }

    const handleShowInput = () => {
        setShowInput((prev) => !prev);
    }

    const handlePercentageChange = (e) => {
        const inputValue = e.target.value;
        setPercentage({ ...percentage, value: inputValue })
        console.log(percentage);
    };


    return (
        <div className='w-full bg-[#05071D] h-fit z-50 rounded-lg border border-[#FFFFFF80] relative'>
            <h1 className='font-fahkwang text-3xl font-light text-center py-4'>Settings</h1>
            {showTooltip && (
                <div className='absolute right-1 top-6 p-4 bg-[#010427] w-[312px] z-50'>
                    <p className=''>Your Transaction will be roll backed if the price changes by more then choosen tolerance percentage</p>
                </div>
            )}
            <div className='h-[1px] w-full bg-custom-radial ' />
            <div className='flex flex-col items-start justify-start p-4 '>
                <h1 className='text-2xl font-cabin font-medium pb-3'>Transaction Settings</h1>


                <div className='flex gap-1 md:flex-row flex-col  md:justify-between w-full items-center gap-y-5 pb-4'>
                    <div className='flex gap-x-1 justify-between md:justify-normal w-full'>
                        <div className='flex gap-x-1'>
                            <h3 >Slippage Tolerance</h3>
                            <p className='text-[#F7931A] inline-block md:hidden'>0.5%</p>
                        </div>

                        <div id='info' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => setShowTooltip(!showTooltip)}>
                            <InfoOutlinedIcon sx={{ color: '#FFFFFFBF' }} />
                        </div>
                        <p className='text-[#F7931A] hidden md:inline-block'>0.5%</p>
                    </div>
                    <div className='flex items-start w-full md:justify-end gap-x-4'>
                        {/* buttons */}
                        <button className='h-[39px] w-[72px] button-gradient-wrapper text-white font-[400] text-base font-cabin rounded-lg py-4 px-[1.875rem] hover:opacity-50'><span className="button-gradient-content flex justify-center items-center p-1 ">
                            Auto
                        </span></button>
                        <button className={` h-[39px] w-[92px] button-gradient-wrapper text-white font-[400] text-base font-cabin rounded-lg py-4 px-[1.875rem] hover:opacity-50`} onClick={handleShowInput}>
                            <span className="button-border-gradient-content flex justify-center items-center">
                                Custom
                            </span>
                        </button>
                    </div>
                </div>
                {
                    showInput && (
                        <div className='w-full pb-4 relative'>
                            <input className='bg-[#30303080] w-full py-2 px-2 rounded-lg outline-none' type="number" step="0.01" value={percentage?.value} onChange={handlePercentageChange} />
                            <span className="absolute right-4  transform  top-[15%] text-white">%</span>
                        </div>
                    )
                }
                <div className='flex flex-col md:flex-row gap-1 justify-between w-full items-center  pb-4'>
                    <div className='flex gap-x-1 pb-4 w-full justify-between md:justify-normal'>
                        <h3 >Transaction Validity</h3>
                        <div onMouseEnter={handleMouseEnterInfo2} onMouseLeave={handleMouseLeaveInfo2} onClick={() => setShowTooltip2(!showTooltip2)}>

                            <InfoOutlinedIcon sx={{ color: '#FFFFFFBF' }} />
                        </div>

                    </div>
                    <div className='flex gap-x-1 items-center justify-start md:justify-end w-full md:w-fit'>
                        {/* buttons */}

                        <div className={` h-[39px] w-[59px] button-gradient-wrapper text-white font-[400] text-base font-cabin rounded-lg py-4 px-[1.875rem] hover:opacity-50`}>
                            <input type='number' maxLength="3" className="button-border-gradient-content flex justify-center items-center appearance-none	outline-none text-center" />


                        </div>
                        <div >minutes</div>
                    </div>
                </div>

            </div>
            {showTooltip2 && (
                <div className='absolute right-1 bottom-2 sm:bottom-6 p-4 bg-[#010427] w-[312px] z-50'>
                    <p className=''>Your Transaction will be roll backed if it is pending for more then this time.</p>
                </div>
            )}
        </div>
    )
}

export default SwapSetting