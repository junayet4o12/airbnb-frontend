import React from 'react';
import ImageSlider from './ImageSlider';
import useInfo from '../../hooks/useInfo';

const PropertyCard = ({ data }) => {
    const { showTexas, category: selectedCategory } = useInfo();
    const isShowTexas = selectedCategory.category === 'Icons' ? false : showTexas
    const {
        dates: { startDate, endDate },
        roomsAndBeds: { rooms, beds, bathrooms },
        amenities: { wifi, kitchen, washer },
        bookingOptions: { instantBook, selfCheckIn, allowsPets },
        acceptableGuestAmount: { adults, children, infants, pets },
        _id,
        location,
        viewType,
        distance,
        pricePerNight,
        rating,
        images,
        category,
        totalBeforeTaxes,
        typeOfPlace,
        region
    } = data;

    const formatDate = (incomingdate) => {
        const date = new Date(incomingdate)
        if (date === null) {
            return 'Add dates'
        }
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    return (
        <div className='w-full p-2'>
            <ImageSlider id={_id} images={images} />
            <div>
                <h2 className='text-base font-semibold'>{location}</h2>
                <h3 className='text-base text-gray-600 font-semibold'>{viewType}</h3>
                <h3 className='text-base text-gray-600 font-semibold'>{formatDate(startDate)} - {formatDate(endDate)}</h3>
                {
                    isShowTexas ? <p className='underline font-semibold'>${totalBeforeTaxes} total before texas</p> : <p className='font-bold'>${pricePerNight} per Guest</p>
                }
                
            </div>
        </div>
    );
};

export default PropertyCard;