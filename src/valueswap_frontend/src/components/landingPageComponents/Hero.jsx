import React from 'react'
import { LandingPageData } from '../../TextData'
import GradientButton from '../../buttons/GradientButton'
import BorderGradientButton from '../../buttons/BorderGradientButton'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuthClient'
import ParticlesBackground from '../particles/Particles'
const Hero = ({ setClickConnectWallet }) => {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate();
    return (

            <div id='beng' className=' flex flex-col justify-evenly h-screen relative'>
            <ParticlesBackground />
                <div className=' items-center  text-center'>
                    <div className='font-fahkwang font-light md:text-6xl text-4xl pb-5 m-2 md:m-0'>
                        <span>
                            {LandingPageData.HeroSection.HeadLineWordOne}
                        </span>
                        <div>
                            <span className='bg-gradient-to-r from-[#F2A851] via-[#8F7CFF] to-[#003EC6] text-transparent bg-clip-text'>{LandingPageData.HeroSection.HeadLineWordTwo}</span>
                            <span > {LandingPageData.HeroSection.HeadLineWordThree}</span>
                        </div>
                    </div>
                    <span className='font-cabin text-lg '>
                        {LandingPageData.HeroSection.Tagline}
                    </span>

                    <div className='flex mt-5 gap-4 justify-center'>
                        <div onClick={() => {
                            navigate('/dex-swap/pool')
                        }}>
                            <GradientButton>
                                {LandingPageData.HeroSection.ExploreButton}
                            </GradientButton>
                        </div>
                        <div onClick={() => {
                            setClickConnectWallet(true)
                        }}>
                            <BorderGradientButton>
                                {isAuthenticated ? (
                                    <div>
                                        {LandingPageData.HeroSection.DisconnectButton}
                                    </div>
                                ) : (
                                    <div>
                                        {LandingPageData.HeroSection.ConnectButton}
                                    </div>
                                )}

                            </BorderGradientButton>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-4'>
                    <div className='font-cabin font-normal leading-5 text-xl '>
                        {LandingPageData.HeroSection.BottomLine}
                    </div>
                </div>
            </div>

    )
}

export default Hero
