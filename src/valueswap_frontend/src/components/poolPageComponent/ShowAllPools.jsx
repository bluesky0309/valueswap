import React, { useState, useEffect } from 'react'
import { poolsSvg } from './PoolPageComponentsSvg'
import GradientButton from '../../buttons/GradientButton'
import ArrowPool from '../../assets/images/ArrowPool.png'
import { AllPoolsData } from '../../TextData'
import { useNavigate } from 'react-router-dom'
const ShowAllPools = () => {
  
  const [displayCount, setDisplayCount] = useState(Math.min(5, AllPoolsData.TableData.length));
  const [buttonVisible, setButtonVisibility] = useState(true);
  useEffect(() => {
    if (AllPoolsData.TableData.length < 6) {
      setButtonVisibility(false)
      }
      }, [AllPoolsData.TableData])
      
      const navigate = useNavigate();
      return (
    <div className=' w-full h-screen relative '> 

    <div className='w-full h-screen  text-white md:max-w-[80%] mt-4 z-20 sm:px-8 mx-auto absolute md:translate-x-[15%] '>

      <div className='flex justify-between bg-[#010427] p-2 pb-6 pt-6 rounded-lg mx-auto'>
        <div className='flex justify-between items-center gap-4 md:gap-16 mx-8 md:mx-16'>
          <span className='font-cabin  md:text-3xl font-medium text-white' >Ethereum Pools</span>
          <div className='cursor-pointer'>
            {poolsSvg}
          </div>
        </div>

        <div className='mr-4'
          onClick={() => {
            navigate('/dex-swap/pool/create-pool');
            }}>
          <GradientButton CustomCss={`hover:opacity-75 text-xs md:text-base lg:text-base h-[45px] w-[120px] py-2 lg:py-4`}>
            Create Pool
          </GradientButton>
        </div>
      </div>

      <div className='flex flex-col font-cabin bg-[#05071D] '>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 '>
              <table className='min-w-full   '>
                <thead className=' '>
                  <tr className=''>
                    {AllPoolsData.Headings.map((heading, index) => (
                      <th scope='col'
                        key={index}
                        className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white '
                      >
                        <span className='flex gap-2 items-center justify-center'>
                          {heading}
                          <img src={ArrowPool} alt="" className=' w-4 h-4 md:w-6 md:h-6' />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className=' '>
                  {AllPoolsData.TableData.slice(0, displayCount).map((pool, index) => {
                    
                    const TokenPool = pool.Tokens
                    const FirstTokenName = pool.Tokens[0].TokenName
                    const FirstTokenShare = pool.Tokens[0].Share
                    return (
                      <tr key={index}>

                      <td className='min-w-52 whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-5 justify-center'>
                        <span className='flex gap-2'>
                          {TokenPool.map((token, index) => (
                            <span key={index} className='bg-[#3D3F47] p-2 rounded-xl'>
                              <img src={token.ImagePath} alt="" className='w-6 h-6' />
                            </span>
                          ))}
                        </span>

                        <span className='flex items-center'>
                          <span>
                            {FirstTokenName}
                          </span>
                          <span>
                            {
                              TokenPool.slice(1).map((token, index) => (
                                <span key={index}>/{token.TokenName}</span>
                              ))
                              }
                          </span>
                          <span>: :</span>
                          <span>{FirstTokenShare}</span>
                          <span>
                            {
                              pool.Tokens.slice(1).map((token, index) => (
                                <span key={index}>/{token.Share}</span>
                              ))
                            }
                          </span>
                        </span>


                      </td>

                      <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        $ {pool.PoolValue.toLocaleString('en-US')}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        $ {pool.TotalVolume.toLocaleString('en-US')}
                      </td>
                      <td className='whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                        {pool.APR}
                      </td>
                    </tr>
                  )})}




                </tbody>
              </table>
                <div className='flex justify-center items-center mb-24'>
                  {buttonVisible && (
                    <div>
                      {AllPoolsData.TableData.length > displayCount && (
                        <div className='text-center mt-4'>
                          <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(displayCount + 5)}>
                            {AllPoolsData.SeeMoreButtonText}
                          </button>
                        </div>
                      )}

                      {AllPoolsData.TableData.length <= displayCount && (
                        <div className='text-center mt-4'>
                          <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(Math.min(5, AllPoolsData.TableData.length))}>
                            {AllPoolsData.SeeLessButtonText}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

            </div>
          </div>
        </div>
      </div>

    </div>
                    </div>
  )
}

export default ShowAllPools
