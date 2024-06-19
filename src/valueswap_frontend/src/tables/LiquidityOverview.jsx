

import React, { useEffect, useState } from 'react'
import { LiquidityOverviewText, LiquidityOverviewData } from '../TextData'
import { Dropdown } from "flowbite-react";
import { Plus, Minus } from 'lucide-react';
import WalletID from '../assets/images/WalletID.png'
import { ChevronDown } from 'lucide-react';

const LiquidityOverview = ({ id }) => {
  let LiquidityTableData = LiquidityOverviewData[id].Entries
  useEffect(() => {
    console.log("Liuquidity Data:->", LiquidityTableData)
  }, [])
  const [LiquidityType, setLiquidityType] = useState('All Liquidity')
  const [displayCount, setDisplayCount] = useState(5);
  const [buttonVisible, setButtonVisibility] = useState(true);
  useEffect(() => {

    console.log("Liquidity Overview Data")
    if (LiquidityTableData.length < 6) {
      setButtonVisibility(false)
    }
  }, [LiquidityTableData])


  return (
    <>
      <div className='mt-10  flex flex-col font-cabin'>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8 '>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 border border-white bg-[#05071D]  border-opacity-65 rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300 '>
                <thead className='  '>
                  <tr className='bg-[#010427]'>

                    <th
                      scope='col'
                      className='py-3.5 pl-6 pr-3 flex justify-center text-center text-sm md:text-base lg:text-xl font-medium text-white'>
                      <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span className='cursor-pointer flex items-center gap-2'>
                        <span>
                          {LiquidityOverviewText.Headings[0]} ( {LiquidityType} )
                        </span>
                        <span>
                          <ChevronDown />
                        </span>
                      </span>}
                        className='rounded-lg bg-[#00308E]'>
                        <div onClick={() => setLiquidityType('All Liquidity')}

                          className={`${LiquidityType === "All Liquidity" ? 'bg-[#010427] rounded-lg m-2' : 'm-2'}`}>
                          <Dropdown.Item>All Liquidity</Dropdown.Item>
                        </div>
                        <div onClick={() => setLiquidityType('My Liquidity')}
                          className={`${LiquidityType === "My Liquidity" ? 'bg-[#010427] rounded-lg m-2' : 'm-2'}`}>
                          <Dropdown.Item>My Liquidity</Dropdown.Item>
                        </div>
                      </Dropdown>
                    </th>
                    {LiquidityOverviewText.Headings.slice(1).map((heading, index) => (
                      <th
                        key={index}
                        scope='col'
                        className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white'
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className=' bg-[#05071D] '>
                  {LiquidityTableData.slice(0, displayCount).map((liquidity, index) => (
                    <tr key={index}>

                      <td className='min-w-72 mx-auto whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-3 justify-start ml-10'>
                        {liquidity.Tokens.map((token, index) => (
                          <div key={index}>
                            <span className='bg-[#3D3F47] p-1 rounded-lg flex justify-between gap-1  items-center'>
                              <img src={token.ImagePath} alt="" className='w-6 h-6 transform scale-125' />
                              <span>{token.Value}</span>
                            </span>
                          </div>
                        ))}

                        <span>
                          {
                            liquidity.Impact === "Positive" ? (
                              <span><Plus color={"green"} /></span>
                            ) : (
                              <span>
                                <Minus color={"red"} />
                              </span>
                            )
                          }
                        </span>
                      </td>

                      <td className='min-w-32 whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        $ {liquidity.Value.toLocaleString('en-US')}
                      </td>
                      <td className='min-w-80 flex items-center justify-center gap-3 whitespace-nowrap px-3 py-4 text-sm md:text-base text-white text-center'>
                        <span>
                          <img src={WalletID} alt="" className='w-4 h-4 rounded-full' />
                        </span>
                        <span>
                          {liquidity.WalletId}
                        </span>
                      </td>
                      <td className=' min-w-32 whitespace-nowrap py-4 pl-3 text-center text-sm md:text-base font-medium pr-6'>
                        {liquidity.Time.toLocaleString()}
                      </td>
                    </tr>
                  ))}



                </tbody>
              </table>

              <div className='my-4 bg-[#05071D] '>
                {buttonVisible && (
                  <div>
                    {LiquidityTableData.length > displayCount && (
                      <div className='text-center mt-4'>
                        <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(displayCount + 5)}>
                          See More
                        </button>
                      </div>
                    )}

                    {LiquidityTableData.length <= displayCount && (
                      <div className='text-center mt-4'>
                        <button className='bg-gray-800 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(Math.min(5, SwappingData.length))}>
                          See Less
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
    </>
  )
}

export default LiquidityOverview
