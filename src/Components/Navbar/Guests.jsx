/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const Guests = ({ setIsOpen, guests, setGuests }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsOpen]);

    const totalAdultsChildren = guests.adults + guests.children;
    const isBookingFull = totalAdultsChildren >= 15;

    const travelerCategories = {
        adults: '13 years and above',
        children: '2 years - under 12 years',
        infants: 'below 2 years',
        pets: 'Bringing a service animal?',
    };

    // Increment traveler count for the selected category
    const handleIncrement = (category) => {
        if (category === 'adults' || category === 'children') {
            if (totalAdultsChildren < 15) {
                setGuests({
                    ...guests,
                    [category]: guests[category] + 1,
                });
            }
        } else if ((category === 'infants' && guests.infants < 5) || (category === 'pets' && guests.pets < 5)) {
            setGuests({
                ...guests,
                [category]: guests[category] + 1,
            });
        }
    };

    // Decrement traveler count for the selected category, ensuring it doesn't go below zero
    const handleDecrement = (category) => {
        setGuests({
            ...guests,
            [category]: guests[category] > 0 ? guests[category] - 1 : 0,
        });
    };

    return (
        <div ref={dropdownRef} className="bg-white p-3 shadow-lg w-full min-w-[400px] rounded-xl max-h-[55vh] overflow-auto custom-scrollbar">
            <div className="space-y-4">
                {Object.keys(guests).map((category, index) => (
                    <div key={index} className=''>
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="capitalize text-lg font-semibold">{category}</p>
                                <p className='text-sm text-gray-700'>{travelerCategories[category]}</p>
                            </div>
                            <div className="flex items-center space-x-2 gap-3">
                                <button
                                    className={`text-xl border border-black rounded-full p-1 ${guests[category] === 0 ? 'text-gray-400 border-gray-400 cursor-not-allowed' : ''}`}
                                    onClick={() => handleDecrement(category)}
                                    disabled={guests[category] === 0}
                                >
                                    <FiMinus />
                                </button>
                                <span className="text-lg font-medium w-[30px] flex justify-center items-center">{guests[category]}</span>
                                <button
                                    className={`text-xl border border-black rounded-full p-1 ${(category === 'adults' || category === 'children') && isBookingFull || (category === 'infants' && guests.infants === 5) || (category === 'pets' && guests.pets === 5) ? 'text-gray-400 border-gray-400 cursor-not-allowed' : ''}`}
                                    onClick={() => handleIncrement(category)}
                                    disabled={
                                        (category === 'adults' || category === 'children') && isBookingFull ||
                                        (category === 'infants' && guests.infants === 5) ||
                                        (category === 'pets' && guests.pets === 5)
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

export default Guests;
