import React, { useState, useEffect } from 'react';
import { poolsSvg } from './PoolPageComponentsSvg';
import GradientButton from '../../buttons/GradientButton';
import { AllPoolsData } from '../../TextData';
import { useNavigate } from 'react-router-dom';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShowAllPools = () => {
  const [allDataInPool, setAllDataInPool] = useState(null);
  const [displayCount, setDisplayCount] = useState(5);
  const [buttonVisible, setButtonVisibility] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [activeSort, setActiveSort] = useState();

  useEffect(() => {
    // Simulate a data fetch with a timeout
    setTimeout(() => {
      setAllDataInPool(AllPoolsData);
    }, 1000); // Simulate 2 seconds loading time
  }, []);

  useEffect(() => {
    if (allDataInPool?.TableData?.length < 6) {
      setButtonVisibility(false);
    }
  }, [allDataInPool]);

  const sortValue = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aValue = typeof a.PoolValue === 'string' ? parseFloat(a.PoolValue.replace(/[\$,]/g, '')) : a.PoolValue;
      const bValue = typeof b.PoolValue === 'string' ? parseFloat(b.PoolValue.replace(/[\$,]/g, '')) : b.PoolValue;
      return isAscending ? bValue - aValue : aValue - bValue;
    });

    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
  };

  const sortTotalVolume = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aVolume = typeof a.TotalVolume === 'string' ? parseFloat(a.TotalVolume.replace(/[\$,]/g, '')) : a.TotalVolume;
      const bVolume = typeof b.TotalVolume === 'string' ? parseFloat(b.TotalVolume.replace(/[\$,]/g, '')) : b.TotalVolume;
      return isAscending ? bVolume - aVolume : aVolume - bVolume;
    });
    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
  };

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

  const sortApr = () => {
    const sortedTableData = [...allDataInPool.TableData].sort((a, b) => {
      const aprA = parseAPR(a.APR);
      const aprB = parseAPR(b.APR);

      if (aprA && aprB) {
        if (isAscending) {
          return aprB.min - aprA.min || aprB.max - aprA.max;
        } else {
          return aprA.min - aprB.min || aprA.max - aprB.max;
        }
      }
      return 0;
    });
    setAllDataInPool({ ...allDataInPool, TableData: sortedTableData });
    setIsAscending(!isAscending);
  };

  const sortingConditional = (poolIndex) => {
    if (poolIndex === 1) {
      sortValue();
      setActiveSort(poolIndex);
    } else if (poolIndex === 2) {
      sortTotalVolume();
      setActiveSort(poolIndex);
    } else if (poolIndex === 3) {
      sortApr();
      setActiveSort(poolIndex);
    }
  };

  const navigate = useNavigate();

  return (
    <div className='max-w-[1200px] mx-auto h-screen relative'>
      <div className='w-full h-screen text-white mt-4 z-20 sm:px-8 mx-auto absolute'>
        <div className='flex justify-between bg-[#010427] p-2 pb-6 pt-6 rounded-t-lg mx-auto'>
          <div className='flex items-center justify-between gap-4 mx-8 md:gap-16 md:mx-16'>
            <span className='font-medium text-white font-cabin md:text-3xl'>Ethereum Pools</span>
            <div className='cursor-pointer'>{poolsSvg}</div>
          </div>
          <div className='mr-4' onClick={() => navigate('/dex-swap/pool/create-pool')}>
            <GradientButton CustomCss={`hover:opacity-75 text-xs md:text-base lg:text-base h-[45px] w-[120px] py-2 lg:py-4`}>
              Create Pool
            </GradientButton>
          </div>
        </div>
        <div className='flex flex-col font-cabin bg-[#05071D]'>
          <div className='-my-2 overflow-x-auto'>
            <div className='inline-block min-w-full py-2 align-middle'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5'>
                <SkeletonTheme baseColor="#1f2029" highlightColor="#2b2b2b" borderRadius="0.5rem" duration={2}>
                  <table className='min-w-full'>
                    <thead>
                      <tr>
                        {allDataInPool?.Headings?.map((heading, index) => (
                          <th
                            scope='col'
                            key={index}
                            className='pl-6 pr-3 text-sm font-medium text-center text-white py-7 md:text-base lg:text-xl'
                          >
                            <span className='flex items-center justify-center gap-2' onClick={() => sortingConditional(index)}>
                              {heading}
                              {index === activeSort ? <ArrowDownwardIcon sx={{ color: '' }} /> : ''}
                            </span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {!allDataInPool
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                              <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                <Skeleton height={30} />
                              </td>
                              <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                <Skeleton height={30} />
                              </td>
                              <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                <Skeleton height={30} />
                              </td>
                              <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                <Skeleton height={30} />
                              </td>
                            </tr>
                          ))
                        : allDataInPool.TableData.slice(0, displayCount).map((pool, index) => {
                            const TokenPool = pool.Tokens;
                            const FirstTokenName = pool.Tokens[0].TokenName;
                            const FirstTokenShare = pool.Tokens[0].Share;
                            return (
                              <tr key={index}>
                                <td className='flex items-center justify-center gap-5 my-4 text-sm font-medium text-white min-w-52 whitespace-nowrap md:text-base'>
                                  <span className='flex gap-2'>
                                    {TokenPool.map((token, index) => (
                                      <span key={index} className='bg-[#3D3F47] p-2 rounded-xl'>
                                        <img src={token.ImagePath} alt='' className='w-6 h-6' />
                                      </span>
                                    ))}
                                  </span>
                                  <span className='flex items-center'>
                                    <span>{FirstTokenName}</span>
                                    <span>
                                      {TokenPool.slice(1).map((token, index) => (
                                        <span key={index}>/{token.TokenName}</span>
                                      ))}
                                    </span>
                                    <span>: :</span>
                                    <span>{FirstTokenShare}</span>
                                    <span>
                                      {pool.Tokens.slice(1).map((token, index) => (
                                        <span key={index}>/{token.Share}</span>
                                      ))}
                                    </span>
                                  </span>
                                </td>
                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                  $ {pool.PoolValue.toLocaleString('en-US')}
                                </td>
                                <td className='px-3 py-4 text-sm text-center text-white whitespace-nowrap md:text-base'>
                                  $ {pool.TotalVolume.toLocaleString('en-US')}
                                </td>
                                <td className='py-4 pl-3 pr-6 text-sm font-medium text-center whitespace-nowrap md:text-base'>
                                  {pool.APR}
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </SkeletonTheme>
                <div className='flex items-center justify-center mb-24'>
                  {buttonVisible && (
                    <div>
                      {allDataInPool?.TableData?.length > displayCount && (
                        <div className='mt-4 text-center'>
                          <button className='px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-600' onClick={() => setDisplayCount(displayCount + 5)}>
                            {allDataInPool.SeeMoreButtonText}
                          </button>
                        </div>
                      )}
                      {allDataInPool?.TableData?.length <= displayCount && (
                        <div className='mt-4 text-center'>
                          <button className='px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-600' onClick={() => setDisplayCount(5)}>
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
  );
};

export default ShowAllPools;
