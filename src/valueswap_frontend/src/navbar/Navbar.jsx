import React, { useState, useEffect } from 'react';
import GradientButton from '../buttons/GradientButton';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../components/utils/useAuthClient';
const Navbar = ({ NavbarData, setClickConnectWallet }) => {
    const [activeLink, setActiveLink] = useState(null);
    const {createLedgerActor} = useAuth();

    const ledgerActor = createLedgerActor("a4tbr-q4aaa-aaaaa-qaafq-cai");
    
    const handleFunc = () => {
        console.log("🚀 ~ Navbar ~ ledgerActor:", ledgerActor);
    } 

    return (
        <div className='mx-12'>
            <div className='w-full sticky top-8 rounded-2xl bg-[#05071D] font-cabin backdrop-blur-lg  z-50 '>
                <div className='flex items-center justify-between w-full gap-8 p-4'>
                    <div className='flex items-center gap-16 text-base'>
                        <button className='font-extrabold' onClick={handleFunc}>sfd</button>
                        <div className="items-center h-12 border-l border-white"></div>
                        {
                            NavbarData.Links.map((Link, index) => (
                                <div key={index}>
                                    <RouterLink
                                        to={Link.LinkPath}
                                        className='cursor-pointer'
                                        onClick={() => setActiveLink(index)}
                                    >
                                        <div className='flex flex-col items-center justify-center'>
                                            <span className='text-xl'>
                                                {Link?.LinkName}
                                            </span>
                                            <span>
                                                <div className={`${activeLink === index ? 'rounded-full bg-orange-500  w-1 h-1 ' : 'rounded-full bg-transparent'}`}>

                                                </div>
                                            </span>
                                        </div>
                                    </RouterLink>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex items-center gap-8'>
                        <div className="h-12 border-l border-white"></div>
                        <div className='mr-9'
                            onClick={() => {
                                if (NavbarData.ButtonText === 'Connect Wallet') {
                                    setClickConnectWallet(true);
                                }
                            }}>
                            <GradientButton
                                CustomCss={`hover:opacity-75`}
                            >{NavbarData.ButtonText}</GradientButton>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default Navbar;
