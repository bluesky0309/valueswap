import React, { useState, useEffect } from 'react';
import GradientButton from '../buttons/GradientButton';
import { Link as RouterLink } from 'react-router-dom';
const Navbar = ({ NavbarData, setClickConnectWallet }) => {
    const [activeLink, setActiveLink] = useState(null);

    return (
        <div className='mx-12'>
            <div className='w-full sticky top-8 rounded-2xl bg-[#05071D] font-cabin backdrop-blur-lg  z-50 '>
                <div className='w-full  p-4 flex justify-between gap-8 items-center'>
                    <div className='text-base  flex gap-16 items-center'>
                        <span className='font-extrabold'>LOGO</span>
                        <div className="border-l border-white h-12 items-center"></div>
                        {
                            NavbarData.Links.map((Link, index) => (
                                <div key={index}>
                                    <RouterLink
                                        to={Link.LinkPath}
                                        className='cursor-pointer'
                                        onClick={() => setActiveLink(index)}
                                    >
                                        <div className='flex flex-col justify-center items-center'>
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
                        <div className="border-l border-white h-12"></div>
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
