import React from 'react'
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';


const ImpactButton = ({ customCss, Impact, children }) => {
    return (
        <div>
            {
                Impact === 'Positive' ? (
                    <button className={`${customCss} p-2 sm:p-3 border border-green-600 text-green-600 rounded-lg flex  gap-3 sm:gap-6`}><TrendingUp color='#16a34a' />{children}</button>
                )
                    :

                    Impact === 'Negative' ? (<button className={`${customCss}p-2 sm:p-3     border border-red-600 text-red-600 rounded-lg flex gap-3 sm:gap-6`}><TrendingDown color='#dc2626' />{children}</button>

                    ) : (
                        <button className={`${customCss} p-2 sm:p-3 border border-[#6b7280] text-[#6b7280] rounded-lg flex gap-3 sm:gap-6`}><ArrowRight color='#6b7280' />{children}</button>
                    )
            }

        </div>
    )
}

export default ImpactButton
