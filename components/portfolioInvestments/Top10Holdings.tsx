"use client"

import React, { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"


interface Holding {
  ticker: string
  percentage: string
  value: string
  company: string
  icon: string
  bgColor: string
}

const Top10Holdings: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null)

  const holdings: Holding[] = [
    {
      ticker: "TSLA",
      percentage: "10.5%",
      value: "R 105,000",
      company: "Tesla Inc",
      icon: "T",
      bgColor: "bg-red-500",
    },
    {
      ticker: "AMZN",
      percentage: "8.9%",
      value: "R 89,000",
      company: "Amazon.com Inc",
      icon: "a",
      bgColor: "bg-gray-900",
    },
    {
      ticker: "GOOGL",
      percentage: "7.5%",
      value: "R 75,000",
      company: "Alphabet Inc Class A",
      icon: "G",
      bgColor: "bg-white text-black",
    },
    {
      ticker: "META",
      percentage: "6.8%",
      value: "R 68,000",
      company: "Meta Platforms",
      icon: "ƒ",
      bgColor: "bg-blue-600",
    },
    {
      ticker: "LLY",
      percentage: "5.2%",
      value: "R 52,000",
      company: "Eli Lilly & Co",
      icon: "L",
      bgColor: "bg-red-600",
    },
    {
      ticker: "BRK.B",
      percentage: "4.5%",
      value: "R 45,000",
      company: "Berkshire Hathaway B",
      icon: "B",
      bgColor: "bg-blue-900",
    },
    {
      ticker: "JPM",
      percentage: "3.8%",
      value: "R 38,000",
      company: "JPMorgan Chase",
      icon: "J",
      bgColor: "bg-gray-800",
    },
  ]

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mt-4 mb-6">
        Top 10 Holdings
      </h3>

      <Swiper
        modules={[Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: false,
        }}
        loop
        speed={12000}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.2 },
          1280: { slidesPerView: 6 },
        }}
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay.start()}
      >
        {holdings.map((holding, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-shadow h-full">
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-8 h-8 ${holding.bgColor} rounded flex items-center justify-center text-white font-bold text-sm`}
                >
                  {holding.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {holding.percentage}
                </span>
              </div>

              <p className="text-lg font-medium text-gray-800">
                {holding.value}
              </p>
              <p className="text-xs text-gray-600">{holding.company}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Top10Holdings
