import React from 'react'

const Featurepage = () => {
  return (
    <div className="bg-white px-[8px] pt-5 space-x-4 py-[8px] mt-2 mb-2 custom-scrollbar  flex overflow-x-auto overflow-hidden scroll-smooth" alt="feature pages">
    <div className="border rounded-lg border-[#6B84DD] pt-[8px] space-y-2 px-[12px] min-w-[210px] w-[210px] h-[140px] items-center text-center">
      <span className="text-black font-semibold text-xl leading-10">
        Bargain Your Way
      </span>
      <br/>
      
      <span className="text-base leading-relaxed">
       Allows you to bargain with your service provider individually.
      </span>
    </div>
    <div className="border rounded-lg border-[#6B84DD] pt-[8px] space-y-2 px-[12px] min-w-[210px] w-[210px] h-[140px] items-center text-center">
      <span className="text-black font-semibold text-xl leading-10">
        Lot's Of Options
      </span>
      <br/>
      
      <span className="text-base leading-relaxed">
        Allows you to choose from various Service Providers With Ease.
      </span>
    </div>
    <div className="border rounded-lg border-[#6B84DD] pt-[8px] space-y-2 px-[12px] min-w-[210px] w-[210px] h-[140px] items-center text-center">
      <span className="text-black font-semibold text-xl leading-10">
      At Your Preferences
      </span>
      <br/>
      
      <span className="text-base leading-relaxed">
      Allows you to choose Time, Location and Date according to your Need.
      </span>
    </div>
    <div className="border rounded-lg border-[#6B84DD] pt-[8px] space-y-2 px-[12px] min-w-[210px] w-[210px] h-[140px] items-center text-center">
      <span className="text-black font-semibold text-xl leading-10">
        Basic to High Needs
      </span>
      <br/>
      
      <span className="text-base leading-relaxed">
        Provides you various types of Services that are Hard to find in Market.
      </span>
    </div>
  </div>
  )
}

export default Featurepage