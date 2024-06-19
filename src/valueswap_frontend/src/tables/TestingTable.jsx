const PortfolioDataComponent = () => {

  const navigate = useNavigate();
  return (
    <div className='w-full h-screen  text-white  md:max-w-[80%] mt-28 z-50 px-8 mx-auto'>

      <div className='flex justify-between bg-[#010427] p-2  py-6  rounded-lg mx-auto'>
        <div className='flex justify-between items-center  mx-2  md:mx-16'>
          <span className='font-cabin text-xl md:text-3xl font-medium'>My Liquidity Pools</span>
        </div>

        <div className='mr-4'
          onClick={() => {
            navigate('/dex-swap/pool/create-pool');
          }}>
          <GradientButton>
            Create Pool
          </GradientButton>
        </div>
      </div>

      <div className='bg-[#05071D] h-fit rounded-lg text-white p-4'>

        <div>
          <div className='grid grid-cols-2 md:grid-cols-6  p-4 font-cabin text-lg font-medium'>
            <div className='col-span-2 text-start ml-7'>Tokens Composition</div>

            <div className='flex justify-end  items-center'>
              Balance
            </div>

            <div className='hidden md:flex justify-end  items-center'>
              Pool Value
            </div>

            <div className='hidden md:flex justify-end items-center '>
              APR
            </div>

            <div className='hidden md:flex justify-end items-center '>
              Time
            </div>

          </div>

          <div className='border-t-[1px] my-2 border-[#00308E]'></div>

          {
            portfolioSampleData.Pools ? (
              <div>
                {
                  portfolioSampleData.Pools.map((pool, index) => (
                    <div key={index} className='my-5 hover:bg-[#546093] rounded-lg cursor-pointer'
                      onClick={() => {
                        navigate(`/dex-swap/portfolio/pool-info/${index}`)
                      }}
                      >
                      <div className='grid grid-cols-2 md:grid-cols-6  p-4 font-cabin text-base font-medium items-center'>
                        <div className='col-span-2 flex items-center gap-4 ml-4'>
                          <div className='flex items-center gap-1'>
                            {
                              pool.PoolData.map((token, index) => (
                                <div key={index}>
                                  <div className='bg-[#3D3F47] p-1 rounded-lg'>
                                    <img src={token.ImagePath} alt="" className='w-7 h-7 transform scale-125' />
                                  </div>
                                </div>
                              ))

                            }

                          </div>

                          <div className='flex items-center'>
                            <span  >{pool.PoolData[0].ShortForm}</span>
                            {
                              pool.PoolData.slice(1).map((token, index) => (
                                <div key={index} className=''>
                                  <span className='mx-0.5'>/</span>
                                  {token.ShortForm}
                                </div>
                              ))
                            }
                            <span className='mx-1'>:  :</span>

                            <span>{pool.PoolData[0].WeightedPercentage}</span>
                            {
                              pool.PoolData.slice(1).map((token, index) => (
                                <div key={index} className=''>
                                  <span className='mx-0.5'>/</span>
                                  {token.WeightedPercentage}
                                </div>
                              ))
                            }
                          </div>

                        </div>

                        <div className='col-span-1 flex justify-end'>
                          $ {pool.PoolMetaData.Balance.toLocaleString('en-US')}
                        </div>
                        <div className='col-span-1 flex justify-end'>
                          $ {pool.PoolMetaData.PoolValue.toLocaleString('en-US')}
                        </div>
                        <div className='col-span-1 flex justify-end'>
                          {pool.PoolMetaData.APRstart}%  -  {pool.PoolMetaData.APRend}%
                        </div>
                        <div className='col-span-1 flex justify-end'>
                          {new Date(pool.PoolMetaData.Time).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <div className='flex justify-center items-center text-center    '>
                <div>
                  <img src={NoPortfolioImage} alt="" />
                  <span className='font-cabin font-medium leading-5 text-[#F7931A]'>
                    You have not added liquidity yet
                  </span>
                </div>
              </div>
            )
          }



        </div>
      </div>

    </div>
  )
}

export default PortfolioDataComponent
