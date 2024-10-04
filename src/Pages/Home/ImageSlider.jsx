/* eslint-disable react/prop-types */
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Navigation,Pagination } from 'swiper/modules';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Ensure Swiper CSS is imported

const ImageSlider = ({ images, id }) => {
    const swiperRef = useRef(null); // Ref to access Swiper instance

    const swiperNextBtnClass = `nextBTN${id}`;
    const swiperPrevBtnClass = `prevBTN${id}`;

    return (
        <div className="w-full h-52 object-cover overflow-hidden rounded-lg relative swiperBtnParents">
            <Swiper
                onInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                  }}
                navigation={{
                    nextEl: `.${swiperNextBtnClass}`,
                    prevEl: `.${swiperPrevBtnClass}`,
                }}
                slidesPerView={1} // Ensure one slide is visible at a time
                spaceBetween={0}
                speed={300}
                modules={[Navigation,Pagination]}
                // allowTouchMove={false} // Disable touch to avoid conflicting behavior
                loop={true} // Ensure loop is disabled for correct navigation
            >
                {images.map((item, key) => (
                    <SwiperSlide key={key}>
                        <img src={item} className=" rounded-lg w-full h-52 object-cover " alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Previous Button */}
            <div
                className={`${swiperPrevBtnClass} text-xl p-1 cursor-pointer absolute top-[90px] left-2 bg-gray-200 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-black z-10 swiperBtn`}
               
            >
                <GrFormPrevious />
            </div>

            {/* Custom Next Button */}
            <div
                className={`${swiperNextBtnClass} text-xl p-1 cursor-pointer absolute top-[90px] right-2 bg-gray-200 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-black z-10 swiperBtn`}
                
            >
                <GrFormNext />
            </div>
        </div>
    );
};

export default ImageSlider;
