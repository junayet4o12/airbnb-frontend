// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core and required modules
import { categories } from '../../categories';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Navigation } from 'swiper/modules';
import { useState, useRef } from 'react';
import useInfo from '../../hooks/useInfo';
import Filter from './Filter/Filter';

const CategoriesCarousel = () => {
    const { category, setCategory, showTexas, setShowTexas } = useInfo();
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const swiperRef = useRef(null); // Ref to access Swiper instance

    const handleToggleChange = (e) => {
        setShowTexas(e.target.checked); // Update the state based on the checkbox's checked value
    };
    return (
        <div className='flex gap-2 items-center bg-white mt-2'>
            <div className={`relative my-3 w-[calc(100%-320px)]`}>
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
                                slidesPerView: 1,
                            },
                            320: {
                                slidesPerView: 2,
                            },
                            480: {
                                slidesPerView: 3,
                            },
                            640: {
                                slidesPerView: 4,
                            },
                            768: {
                                slidesPerView: 6,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                            1280: {
                                slidesPerView: 8,
                            },
                            1440: {
                                slidesPerView: 9,
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
            <div className='flex justify-center items-center w-[320px] gap-2'>
                <Filter />
                <button className='flex items-center gap-1 border border-gray-700 h-max px-2 py-3 rounded-lg text-sm text-nowrap'>Display total before texas  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={showTexas}  // Bound to the state variable
                    onChange={handleToggleChange} // Handle state change
                /></button>
            </div>
        </div>
    );
};

export default CategoriesCarousel;
