import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import GradientButton from '../buttons/GradientButton';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../components/utils/useAuthClient';
import { Copy, Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { showAlert, hideAlert } from '../reducer/Alert';

const options = [
    // { value: 'ethereum', label: 'Ethereum', img: '/src/assets/images/Network/Ethereum.png' },
    // { value: 'bitcoin', label: 'Bitcoin', img: 'images/Bitcoin.png' },
    // Add more options here
];

const MobileNavbar = ({ NavbarData, setClickConnectWallet }) => {

    const dispatch = useDispatch()
    const [activeLink, setActiveLink] = useState(0);
    const [open, setOpen] = useState(false);
    const { isAuthenticated, login, logout, principal, reloadLogin } = useAuth();
    const [Principal, setPrincipal] = useState('');
    const [copied, setCopied] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    let location = useLocation()

    useEffect(() => {
        const getDisplayFunction = () => {
            const SlicedPrincipal = principal.toText().slice(0, 5);
            // console.log(typeof SlicedPrincipal)
            const FinalId = SlicedPrincipal.padEnd(10, '.');
            setPrincipal(FinalId)
            console.log("Principal of user is:", FinalId)
        }

        if (principal) {
            getDisplayFunction()
        }
        reloadLogin()

    }, [principal]);
    const navigate = useNavigate();

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
        <div className={` sticky top-0 z-50 `}>
            <div className="w-full rounded-2xl  bg-[#05071D] font-cabin tracking-wide backdrop-blur-md ">
                <div className="w-full flex justify-between  items-center py-2">

                    <div className='flex items-center justify-between md:justify-start px-2'>
                        <div className='flex items-center gap-2 md:gap-3'>
                            <span className='font-extrabold'>LOGO</span>
                            <div className="border-l border-white h-12 items-center ml-4 lg:ml-0"></div>
                        </div>


                    </div>
                    <div className='w-[70%] flex justify-center gap-x-4'>
                        <div className='text-base flex  gap-4   items-center rounded-b-lg  md:w-[100%] px-2'>
                            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#05071D] rounded-lg left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in gap-2 xl:gap-6 ${open ? 'top-12' : 'top-[-490px]'}`}>
                                {
                                    NavbarData.Links.map((Link, index) => (
                                        <li key={index} className='md:ml-8 md:my-0 my-7 font-normal'>
                                            <RouterLink
                                                to={Link.LinkPath}
                                                className='text-white hover:text-orange-500 duration-500'
                                                onClick={() => {
                                                    setActiveLink(index)
                                                    setOpen(!open)
                                                }}
                                            >
                                                <div className='flex flex-col justify-center text-custom-size-14 lg:text-xl items-center'>
                                                    {Link?.LinkName}
                                                    <div className={`${activeLink === index ? 'rounded-full bg-orange-500 w-1 h-1' : 'rounded-full bg-transparent'}`}></div>
                                                </div>
                                            </RouterLink>
                                        </li>
                                    ))
                                }

                                <div className='my-7 font-semibold text-center block md:hidden '>

                                    <div
                                        onClick={() => {
                                            if (NavbarData.ButtonText === 'Connect Wallet') {
                                                setClickConnectWallet(true);
                                            }

                                            if (NavbarData.ButtonText === 'Explore Pools') {
                                                navigate('/dex-swap/pool')
                                            }
                                        }}>
                                        <GradientButton
                                            CustomCss={`hover:opacity-75 text-xs md:text-base lg:text-base h-[50px] w-[95px] lg:h-[60px] lg:w-[150px] py-2 lg:py-4`}
                                        >{NavbarData.ButtonText}</GradientButton>
                                    </div>
                                </div>

                            </ul>

                        </div>

                        {/* drop down Network*/}
                       { location.pathname === "/dex-swap" && <div className="relative inline-block ">
                            <div
                                className=" rounded-md md shadow-md flex items-center justify-between gap-x-2 p-2 cursor-pointer"
                                onClick={() => document.getElementById('options-container').classList.toggle('hidden')}
                            >
                                <div className="flex items-center">
                                   {selectedOption && <img src={selectedOption?.img} alt={selectedOption?.label} className="w-6 h-6 mr-2" />}
                                    <span className='md:inline-block hidden'>{selectedOption?.label}</span>
                                </div>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                            <div id="options-container" className="absolute z-10 mt-1 p-2 top-16 right-[-2rem] bg-[#05071D] border border-gray-300 rounded-md shadow-lg hidden md:w-[200%] w-[112%]">
                                <h1 className='text-center '>Select Network</h1>
                                {options && options.map((option) => (
                                    <div
                                        key={option.value}
                                        className="flex items-center p-2 cursor-pointer hover:border rounded-lg hover:border-gray-500 "
                                        onClick={() => {
                                            setSelectedOption(option);
                                            document.getElementById('options-container').classList.add('hidden');
                                        }}
                                    >
                                        <img src={option.img} alt={option.label} className="w-6 h-6 mr-2" />
                                        <span>{option.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
{/* //// */}
                    <div className='md:my-0 my-7 font-semibold md:flex md:items-center md:gap-5 hidden  pr-1'>
                        <div className="border-l border-white h-12"></div>
                        <div className=' flex items-center '>

                            {
                                isAuthenticated && <div className='flex items-center w-28 text-center text-white font-cabin text-xl font-normal'>
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
                            <GradientButton
                            >
                                {
                                    NavbarData.ButtonText === "Connect Wallet" ? (
                                        <div

                                        >
                                            {!isAuthenticated ? (<div
                                                onClick={() => {
                                                    setClickConnectWallet(true);
                                                }}>
                                                {NavbarData.ButtonText}
                                            </div>) : (
                                                <div onClick={() => {
                                                    logout()
                                                }}>
                                                    {NavbarData.ButtonTextDisconnet}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className=''

                                            onClick={() => {
                                                navigate('/dex-swap/pool')
                                            }}>
                                            {NavbarData.ButtonText}
                                        </div>
                                    )
                                }
                            </GradientButton>
                        </div>
                    </div>

                    <div onClick={() => setOpen(!open)} className='md:hidden cursor-pointer w-7 h-7'>
                        {open ? <XMarkIcon className='text-white ' /> : <Bars3BottomRightIcon className='text-white' />}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MobileNavbar;