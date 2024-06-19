import React, { useState, useRef, useEffect } from 'react';
import SelectTokensForPools from '../Modals/poolCreation/SelectTokensForPools';
import SetPoolFees from '../Modals/poolCreation/SetPoolFees';
import InitialLiquidity from '../Modals/poolCreation/InitialLiquidity';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wiperTrackRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (wiperTrackRef.current) {
        updateCarousel(currentIndex);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex]);

  const handlePrevClick = () => {
    const newIndex = currentIndex === 0 ? 2 : currentIndex - 1; // assuming there are 3 items
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex === 2 ? 0 : currentIndex + 1; // assuming there are 3 items
    setCurrentIndex(newIndex);
    updateCarousel(newIndex);
  };

  const updateCarousel = (index) => {
    const wiperTrack = wiperTrackRef.current;
    const wipeWidth = wiperTrack.getBoundingClientRect().width / 3; // assuming there are 3 items
    const offset = 600 * index;
    const initVal = 600 - offset;
    wiperTrack.style.transform = `translateX(${initVal}px)`;

    const wipes = Array.from(wiperTrack.children);
    wipes.forEach((slide) => slide.classList.remove('active-swipe'));
    wipes[index].classList.add('active-swipe');
  };

  return (
    <div>
      <div className="wiper">
        <div className="wiper-wrapper">
          <div className="wiper-track gap-x-6" ref={wiperTrackRef}>
            <div className={`wiper-item ${0 === currentIndex ? 'active-swipe' : ''}`}>
              <div className="flex gap-6 pb-6 justify-center items-center m-auto">
                <div className="py-2 px-4 rounded-full bg-[#00308E]">1</div>
                <p className="text-lg">Select Tokens for Pool Creation</p>
                <hr className="border-2 w-1/4 pr-6" />
              </div>
              <SelectTokensForPools />
            </div>

            <div className={`wiper-item ${1 === currentIndex ? 'active-swipe' : ''}`}>
              <div className="flex gap-6 pb-6 justify-center items-center m-auto md:mr-20">
                <div className="py-2 px-4 rounded-full bg-[#00308E]">2</div>
                <p className="text-lg">Set the Pool fees</p>
                <hr className="border-2 w-1/2" />
              </div>
              <SetPoolFees />
            </div>

            <div className={`wiper-item ${2 === currentIndex ? 'active-swipe' : ''}`}>
              <div className="flex gap-6 pb-6 justify-center items-center m-auto">
                <div className="py-2 px-4 rounded-full bg-[#00308E]">3</div>
                <p className="text-lg">Set Initial Liquidity & Confirm Creation</p>
                <hr className="border-2 w-1/4" />
              </div>
              <InitialLiquidity />
            </div>
          </div>
        </div>
        <div className="wiper-button wiper-button__left mr-2 p-5 rounded-full bg-[#8D4C00]" onClick={handlePrevClick}>
          <ArrowBackIcon />
        </div>
        <div className="wiper-button right-0  mr-2 p-5 rounded-full bg-[#8D4C00]" onClick={handleNextClick}>
          <ArrowForwardIcon />
        </div>
      </div>
      <div style={{ height: '300px' }}></div>
    </div>
  );
};

export default Carousel;


// const offset = 600 * index;
// const initVal = 600 - offset;
//  wiperTrack.style.transform = `translateX(${initVal}px)`;