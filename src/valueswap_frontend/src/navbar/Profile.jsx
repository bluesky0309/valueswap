import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react';
import { showAlert, hideAlert } from '../reducer/Alert';
import { useDispatch } from 'react-redux';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import GradientButton from '../buttons/GradientButton';
import DarkModeToggle from "./DarkModeToggle"

function Profile({ principal, Principal, isAuthenticated, logout }) {
    const [showProfile, setShowProfile] = useState(false)
    const [copied, setCopied] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const dispatch = useDispatch()


    const CopyPrincipalId = () => {
        navigator.clipboard.writeText(principal)
            .then(() => {
                console.log('Text copied to clipboard:', principal);

            })
            .catch(err => {
                console.error('Unable to copy text to clipboard:', err);
            });

        dispatch(showAlert({
            type: 'success',
            text: 'Copied to ClipBoard'
        }))

        setTimeout(() => {
            dispatch(hideAlert());
        }, [3000])

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };
    return (
        <div className='relative '>
           <div className='flex gap-x-4'>
            <div>
           <p className='font-medium'>{Principal}</p>
           <p className='bg-gradient-to-r from-[#F7931A] via-[#767DFF] to-[#00308E] bg-clip-text text-transparent'>2.2501 ETH</p>
            </div>
           <img src="/image/Ellipse.png" alt="" className='' onClick={()=> setShowProfile((prev)=> !prev)}/>
           </div>
           { showProfile ? <div className='absolute bg-[#010427] top-16 w-[27vw] lg:w-[20vw] right-[-2rem] rounded-md py-2 px-2 lg:px-4 flex flex-col gap-y-4'>
                <div className='flex gap-x-4 w-full'>
                    <img src="/image/Ellipse.png" alt="" className='' />
                    <div className='w-full'>
                        {
                            isAuthenticated && <div className='flex w-full flex-row items-center justify-between text-center text-white font-cabin text-xl font-normal'>
                                <span>
                                    {Principal}
                                </span>
                                {
                                    copied ? (
                                        <span className='cursor-pointer'>
                                            <Check size={18} />
                                        </span>
                                    ) : (
                                        <span className='cursor-pointer'
                                            onClick={
                                                () => {
                                                    CopyPrincipalId()
                                                }
                                            }>
                                            <Copy size={18} />
                                        </span>
                                    )


                                }
                            </div>
                        }
                        <div>
                            <img src="" alt="" />
                            <p className='text-xs  font-light'>Meta Mask</p>
                        </div>
                    </div>
                </div>
                    <hr />
                <div className='flex justify-between items-center'>
                    <span className='text-3xl font-normal'>$1025.25</span>
                    <ArrowCircleRightOutlinedIcon sx={{ transform: 'rotate(-45deg)', fontSize: '23px', cursor: 'pointer' }} />
                </div>
                <div className='w-full'>
                    <GradientButton CustomCss={`w-full`}>
                        Buy
                    </GradientButton>
                </div>
                <div className={`flex items-center justify-between`}>
                    <p className='text-[#FFFFFFBF] font-normal'>Theme</p>
                    <DarkModeToggle onToggle={setIsDarkMode} />
                </div>
                <div className='text-[#FFFFFFBF] font-normal flex justify-between'>
                    <p>Language</p>
                    <select name="" id="English" className='focus:outline-none focus:shadow-outline bg-transparent'>
                        <option value="English">English</option>
                    </select>
                </div>
                <div className='text-[#FFFFFFBF] font-normal flex justify-between'>
                    <p>Network</p>
                    <select name=""  className='focus:outline-none focus:shadow-outline bg-transparent'>
                        <option value="Ethereum">Ethereum</option>
                    </select>
                </div>
                <hr />
                <div className='flex justify-center gap-x-4'>
                    <img src="./image/disconnect.png" alt="disconnect logo" />
                    <button className='text-base font-cabin font-medium' onClick={()=> logout()}>
                    Disconnect Wallet
                    </button>
                </div>
            </div>: ""}
        </div>
    )
}

export default Profile

// ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}