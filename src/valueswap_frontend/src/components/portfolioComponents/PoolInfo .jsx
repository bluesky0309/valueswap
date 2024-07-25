import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { portfolioSampleData } from '../../TextData';
import PoolInfoBox from '../../displayBoxes/PoolInfoBox';
import GradientButton from '../../buttons/GradientButton'
import { PoolCompositions, Swapping, LiquidityOverview } from '../../tables'
import ApexChart from "./ApexChart"

const PoolInfo = () => {

  const { id } = useParams()
  const [currIndex, setCurrIndex] = useState(0)
  const [currentRang, setCurrentRange] = useState(0)
  const Heading = ['Pool Compositions', 'Swapping', 'Liquidiity Overview']

  useEffect(() => {
    console.log("pool id", id)
  }, [id])

  let TokenData = portfolioSampleData.TableData[id]

  const selectRang = [
    "1D",
    "1W",
    "1M",
    "1Y",
    "All Time"
  ]

  return (
    <div className=' max-w-[1200px] mx-auto h-screen relative '>

      <div className='w-full h-screen  text-white mt-12 z-20 sm:px-8 absolute'>

        <div className='flex flex-col justify-between bg-[#010427] p-2  py-6  rounded-t-lg mx-auto'>
          <div className='flex justify-between items-center  mx-2  md:ml-8'>
            <div className='font-cabin text-base md:text-3xl font-medium flex items-center gap-4'>
              <div className='flex gap-2'>
                {
                  TokenData?.PoolData.map((token, index) => (
                    <div key={index}>
                      <div className='bg-[#3D3F47] p-1 rounded-lg'>
                        <img src={token.ImagePath} alt="" className='w-6 h-6 md:w-10 md:h-10' />
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='flex items-center'>
                <span  >{TokenData?.PoolData[0].ShortForm}</span>
                {
                  TokenData?.PoolData.slice(1).map((token, index) => (
                    <div key={index} className=''>
                      <span className='mx-0.5'>/</span>
                      {token.ShortForm}
                    </div>
                  ))
                }
                <span className='mx-1'>:  :</span>

                <span>{TokenData?.PoolData[0].WeightedPercentage}</span>
                {
                  TokenData?.PoolData.slice(1).map((token, index) => (
                    <div key={index} className=''>
                      <span className='mx-0.5'>/</span>
                      {token.WeightedPercentage}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row w-full gap-11 mx-auto  mt-7'>
            <div className=' lg:w-[59%] p-4 text-[#4b4b4b] bg-[#000711] '>
              {/* pool info chart here in this div */}
              <div>
                <div className='flex justify-between'>
                  <p className='text-3xl text-white font-semibold'>$125,625,175</p>
                  <div className='flex flex-col gap-y-2'>
                    <div className='flex justify-around gap-x-4 text-sm '>
                      <div>
                        <p>Volumes in Past-</p>
                        <hr className='border-[#4b4b4b]' />
                      </div>
                      <select name="" id="" className='bg-[#000711] text-white p-1 border-[1px] border-white focus:outline-none rounded-md'>
                        <option value="volume">Volume</option>
                        <option value="24hr">24hr Vol</option>
                      </select>
                    </div>
                    <div className='flex gap-x-2 text-sm'>
                      {
                        selectRang.map((rang, index) => 
                          <div className='flex flex-col items-center' key={index} onClick={() => {
                            setCurrentRange(index)
                          }}>
                            <p className='cursor-pointer'>{rang}</p>
                            <span className={`p-[2px] w-1 bg-[#F7931A]  ${currentRang === index ? 'visible' : 'invisible'}`}></span>
                          </div>
                        )
                      }

                    </div>
                  </div>
                </div>
                <ApexChart />
              </div>
              <div>

              </div>
            </div>

            <div className=' flex flex-col items-center gap-4 my-4 '>
              <div className='w-full sm:w-auto flex gap-4 h-20 lg:h-48 justify-center'>
                <PoolInfoBox Heading={'Pool Value'} Data={`$ ${TokenData?.PoolMetaData.PoolValue.toLocaleString('en-US')}`} />
                <PoolInfoBox Heading={'24H_Fees'} Data={`$ ${TokenData?.PoolMetaData.TwentyFourHourFees.toLocaleString('en-US')}`} />
              </div>
              <div className='w-full sm:w-auto flex gap-4 h-20 lg:h-48'>
                <PoolInfoBox Heading={'24H_Pool Volume'} Data={`$ ${TokenData?.PoolMetaData.TwentyFourHourVolume.toLocaleString('en-US')}`} />
                <PoolInfoBox Heading={'APR'} Data={`${TokenData?.PoolMetaData.APRstart}% - ${TokenData?.PoolMetaData.APRend}%`} />
              </div>
            </div>
          </div>

          <div className='gap-2 pt-9 mx-10 font-cabin flex items-center'>
            <span className='text-base leading-5 font-bold opacity-75 tracking-wide'>My Pool Balance:</span>
            <span className='mx-3 text-2xl font-normal leading-6'>${TokenData?.PoolMetaData.PersonalPoolBalance.toLocaleString('en-US')}</span>
          </div>


          <div className='flex gap-3 md:gap-6 my-4 mx-3 md:mx-10'>
            <div>
              <GradientButton CustomCss={`text-xs md:text-base lg:text-base  lg:w-[150px] py-2`}>
                Swap Tokens
              </GradientButton>
            </div>
            <div>
              <GradientButton CustomCss={`text-xs md:text-base lg:text-base  lg:w-[150px] py-2`}>
                Add Liquidity
              </GradientButton>
            </div>
            <div>
              <GradientButton CustomCss={`text-xs md:text-base lg:text-base  lg:w-[150px] py-2`}>
                Withdraw
              </GradientButton>
            </div>
          </div>

          <div className='font-cabin font-medium text-base md:text-xl lg:text-2xl flex gap-3 md:gap-16 lg:gap-32 mx-8 lg:mx-10 mt-6'>
            {Heading.map((heading, index) => (
              <div className='flex flex-col justify-center text-center items-center gap-2 cursor-pointer' key={index}
                onClick={() => {
                  setCurrIndex(index)
                }}>
                <h1>{heading}</h1>
                <span className={`p-[1px]  bg-[#F7931A] w-full ${currIndex === index ? 'visible' : 'invisible'}`}></span>
              </div>
            ))}
          </div>


          <div >
            {currIndex === 0 && <PoolCompositions TableData={TokenData?.PoolData} />}
            {currIndex === 1 && <Swapping id={Number(id)} />}
            {currIndex === 2 && <LiquidityOverview id={id} />}
          </div>



        </div>

      </div>
    </div>
  )
}

export default PoolInfo 
