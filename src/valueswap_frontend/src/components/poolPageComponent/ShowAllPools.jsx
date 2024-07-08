import React, { useState, useEffect } from 'react'
import { poolsSvg } from './PoolPageComponentsSvg'
import GradientButton from '../../buttons/GradientButton'
import { AllPoolsData } from '../../TextData'
import { useNavigate } from 'react-router-dom'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const ShowAllPools = () => {
  const [allDataInPool, setAllDataInPool] = useState(AllPoolsData);
  console.log(allDataInPool)
  const [displayCount, setDisplayCount] = useState(Math.min(5, allDataInPool?.TableData?.length || 0));
  const [buttonVisible, setButtonVisibility] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [activeSort, setActiveSort] = useState()
  useEffect(() => {
    if (allDataInPool?.TableData?.length < 6) {
      setButtonVisibility(false);
    }
  }, [allDataInPool.TableData]);
/// pool value sort 
  const sortValue = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aValue = typeof a.PoolValue === 'string' ? parseFloat(a.PoolValue.replace(/[\$,]/g, '')) : a.PoolValue;
      const bValue = typeof b.PoolValue === 'string' ? parseFloat(b.PoolValue.replace(/[\$,]/g, '')) : b.PoolValue;
      return isAscending ? aValue - bValue : bValue - aValue;
    });

    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
    console.log("u just click")
  };

  ///pool Total volume sort 

  const sortTotalVolume = () =>{
    const sortedTableData = [...allDataInPool.TableData].sort((a,b) => {
      const aVolume = typeof a.TotalVolume === 'string' ? parseFloat(a.TotalVolume.replace(/[\$,]/g, '')): a.TotalVolume;
      const bVolume = typeof b.TotalVolume === 'string' ? parseFloat(b.TotalVolume.replace(/[\$,]/g, '')): b.TotalVolume;
      return isAscending ? bVolume -aVolume: aVolume - bVolume;
    })
    setAllDataInPool({...allDataInPool, TableData: sortedTableData});
    setIsAscending(!isAscending);
  }

//APR sort 

  // Helper function to parse APR values
  const parseAPR = (aprString) => {
    const matches = aprString.match(/(\d+\.\d+)% - (\d+\.\d+)%/);
    if (matches) {
      return {
        min: parseFloat(matches[1]),
        max: parseFloat(matches[2]),
      };
    }
    return null;
  };

 
  // Sort by APR
  const sortApr = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aprA = parseAPR(a.APR);
      const aprB = parseAPR(b.APR);

      if (aprA && aprB) {
        if (isAscending) {
          return aprA.min - aprB.min || aprA.max - aprB.max;
        } else {
          return aprB.min - aprA.min || aprB.max - aprA.max;
        }
      }
      return 0;
    });
    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
  };

  const sortingConditional = (poolIndex) =>{
    if(poolIndex == 1){
      sortValue()
      setActiveSort(poolIndex)

    }else if(poolIndex == 2){
      sortTotalVolume()
      setActiveSort(poolIndex)
    }else if(poolIndex == 3){
      sortApr()
      setActiveSort(poolIndex)
    }
    }
  
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
                      {allDataInPool?.Headings?.map((heading, index) => (
                        <th scope='col'
                          key={index}
                          className='py-3.5 pl-6 pr-3 text-center text-sm md:text-base lg:text-xl font-medium text-white '
                        >
                          <span className='flex gap-2 items-center justify-center' onClick={()=> sortingConditional(index)}>
                            {heading}
                           {index === activeSort ? <ArrowDownwardIcon  sx={{color: ""}}/>: ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className=' '>
                    {allDataInPool?.TableData?.slice(0, displayCount).map((pool, index) => {

                      const TokenPool = pool.Tokens
                      const FirstTokenName = pool.Tokens[0].TokenName
                      const FirstTokenShare = pool.Tokens[0].Share
                      return (
                        <tr key={index}>

                          <td className='min-w-52 whitespace-nowrap my-4 text-sm md:text-base font-medium text-white flex items-center gap-5 justify-center'>
                            <span className='flex gap-2'>
                              {TokenPool?.map((token, index) => (
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
                                  TokenPool?.slice(1).map((token, index) => (
                                    <span key={index}>/{token.TokenName}</span>
                                  ))
                                }
                              </span>
                              <span>: :</span>
                              <span>{FirstTokenShare}</span>
                              <span>
                                {
                                  pool.Tokens?.slice(1).map((token, index) => (
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
                      )
                    })}




                  </tbody>
                </table>
                <div className='flex justify-center items-center mb-24'>
                  {buttonVisible && (
                    <div>
                      {allDataInPool?.TableData?.length > displayCount && (
                        <div className='text-center mt-4'>
                          <button className='bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(displayCount + 5)}>
                            {allDataInPool.SeeMoreButtonText}
                          </button>
                        </div>
                      )}

                      {allDataInPool?.TableData?.length <= displayCount && (
                        <div className='text-center mt-4'>
                          <button className='bg-gray-800 hover:bg-gray-600 text-white px-4 py-2 rounded-md' onClick={() => setDisplayCount(Math.min(5, allDataInPool.TableData.length))}>
                            {allDataInPool.SeeLessButtonText}
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
