/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import useInfo from '../../../hooks/useInfo';

const RoomsAndBeds = () => {
    const { roomsAndBeds, setRoomsAndBeds } = useInfo()
    // roomsAndBeds, setRoomsAndBeds



    const isDisabled = (x) => {
        if (x > 7) {
            return true
        } else {
            return false
        }
    }
    // Increment traveler count for the selected category
    const handleIncrement = (category) => {
        if (roomsAndBeds[category] < 8)
            setRoomsAndBeds({
                ...roomsAndBeds,
                [category]: roomsAndBeds[category] + 1,
            });
    };

    // Decrement traveler count for the selected category, ensuring it doesn't go below zero
    const handleDecrement = (category) => {
        setRoomsAndBeds({
            ...roomsAndBeds,
            [category]: roomsAndBeds[category] > 0 ? roomsAndBeds[category] - 1 : 0,
        });
    };

    return (
        <div className="">
            <h2 className='text-xl font-semibold text-black pb-3'>Rooms and Beds</h2>
            <div className="space-y-4">
                {Object.keys(roomsAndBeds).map((category, index) => (
                    <div key={index} className=''>
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="capitalize text-lg font-semibold">{category}</p>

                            </div>
                            <div className="flex items-center space-x-2 gap-3">
                                <button
                                    className={`text-xl border border-black rounded-full p-1 ${roomsAndBeds[category] === 0 ? 'text-gray-400 border-gray-400 cursor-not-allowed' : ''}`}
                                    onClick={() => handleDecrement(category)}
                                    disabled={roomsAndBeds[category] === 0}
                                >
                                    <FiMinus />
                                </button>
                                <span className="text-lg font-medium w-[30px] flex justify-center items-center">{roomsAndBeds[category]}</span>
                                <button
                                    className={`text-xl border border-black rounded-full p-1 ${isDisabled(roomsAndBeds[category]) ? 'text-gray-400 border-gray-400 cursor-not-allowed' : ''}`}
                                    onClick={() => handleIncrement(category)}
                                    disabled={
                                        (category === 'adults' || category === 'children') && isBookingFull ||
                                        (category === 'infants' && roomsAndBeds.infants === 5) ||
                                        (category === 'pets' && roomsAndBeds.pets === 5)
                                    }
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        </div>
                        <hr className='my-2 border-gray-300' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomsAndBeds;
