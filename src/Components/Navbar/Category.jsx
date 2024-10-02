// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core and required modules
import { categories } from '../../categories';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';
import useInfo from '../../hooks/useInfo';

const CategoriesCarousel = () => {
    const {category, setCategory} = useInfo();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const swiperRef = useRef(null); // Ref to access Swiper instance

    return (
        <div className='w-full relative my-3'>
            <div className='px-10'>
                <Swiper
                    onInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={300}
                    modules={[Navigation]}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 5,
                        },
                        480: {
                            slidesPerView: 4,
                            spaceBetween: 8,
                        },
                        640: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 8,
                            spaceBetween: 12,
                        },
                        1024: {
                            slidesPerView: 9,
                            spaceBetween: 15,
                        },
                        1280: {
                            slidesPerView: 11,
                            spaceBetween: 20,
                        },
                        1440: {
                            slidesPerView: 12,
                            spaceBetween: 25,
                        },
                    }}
                >
                    {categories.map((item, key) => (
                        <SwiperSlide key={key}>
                            <div
                                onClick={() => setCategory(item)}
                                className={`border-b-2 flex flex-col items-center cursor-pointer ${category.category === item.category ? 'border-black' : 'border-transparent'}`}
                            >
                                <img className='size-5' src={item.icon} alt={item.category} />
                                <p className='text-sm'>{item.category}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Previous Button */}
            <div
                className={`swiper-button-prev-custom text-xl p-1 cursor-pointer absolute top-0 left-0 border border-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-black ${isBeginning ? 'hidden' : ''}`}
                onClick={() => !isBeginning && swiperRef.current.slidePrev()}
            >
                <GrFormPrevious />
            </div>

            {/* Custom Next Button */}
            <div
                className={`swiper-button-next-custom text-xl p-1 cursor-pointer absolute top-0 right-0 border border-black rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-black ${isEnd ? 'hidden' : ''}`}
                onClick={() => !isEnd && swiperRef.current.slideNext()}
            >
                <GrFormNext />
            </div>
        </div>
    );
};

export default CategoriesCarousel;
