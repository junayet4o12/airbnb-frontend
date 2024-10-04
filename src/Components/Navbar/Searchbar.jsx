import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SelectLocationDropdown from './SelectLocationDropdown';
import CheckIn from './CheckIn';
import Checkout from './Checkout';
import Guests from './Guests';
import useInfo from '../../hooks/useInfo';

const Searchbar = () => {
    const { filteringData, setFilteringData, guests, setGuests, showFullSearchBar, keepFullSearchBar, setKeepFullSearchBar,filterAll } = useInfo()
    // Separate isOpen states for each dropdown
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
    const [isOpenCheckout, setIsOpenCheckout] = useState(false);
    const [isOpenGuest, setIsOpenGuest] = useState(false);
    const openLocation = () => {
        setIsOpenLocation(true)
        setKeepFullSearchBar(true)
    }
    const openCheckIn = () => {
        setIsOpenCheckIn(true)
        setKeepFullSearchBar(true)
    }
    const openCheckOut = () => {
        if (filteringData.checkIn === null) {
            return openCheckIn()
        }
        setIsOpenCheckout(true)
        setKeepFullSearchBar(true)
    }
    const openGuest = () => {
        setIsOpenGuest(true)
        setKeepFullSearchBar(true)
    }

    const formatDate = (date) => {

        if (date === null) {
            return 'Add dates'
        }
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    const handleChangeLocation = (location) => {
        setFilteringData({ ...filteringData, location: location })
        setIsOpenLocation(false)
        openCheckIn()
    }
    const handleChangeCheckIn = (date) => {
        // Access the 'checkout' directly from 'filteringData' before updating the state
        const isChangeEndDate = filteringData.checkout === null ? true : filteringData.checkout.getTime() >= date.getTime();

        // Update 'checkIn' and conditionally set 'checkout'
        setFilteringData((prevData) => ({
            ...prevData,
            checkIn: date,
            checkout: isChangeEndDate ? prevData.checkout : date
        }));

        // Close the check-in and open the check-out
        setIsOpenCheckIn(false);
        openCheckOut();
    }
    const handleChangeCheckout = (checkout) => {
        setFilteringData({ ...filteringData, checkout: checkout[0].endDate })
        setIsOpenCheckout(false)
        openGuest()
    }
    const totalGuest = guests.adults + guests.children;
    const totalInfants = guests.infants || 0;
    const totalPets = guests.pets || 0;
    const total = totalGuest + totalInfants + totalPets;
    const showingGuestText = total > 0
        ? [
            totalGuest > 0 ? `Guests: ${totalGuest}` : '',
            totalInfants > 0 ? `Infants: ${totalInfants}` : '',
            totalPets > 0 ? `Pets: ${totalPets}` : ''
        ].filter(Boolean).join(', ')
        : 'Add guests';

    const isShowFull = keepFullSearchBar ? true : showFullSearchBar ? true : false

    return (
        <div className={`transition-all duration-300 flex  items-center rounded-full shadow-md p-0.5 pr-2 ${isShowFull ? 'max-w-4xl flex-col sm:flex-row' : 'max-w-[350px]'} mx-auto text-sm space-x-2 ${isOpenLocation || isOpenCheckIn || isOpenCheckout || isOpenGuest ? 'bg-gray-200' : 'bg-white'}`}>
            {/* Where Section */}
            <div className='relative md:flex-1'>
                {
                    isShowFull ? <div onClick={openLocation} className={`flex-grow px-5 rounded-full transition-all duration-300 ${isOpenLocation ? 'bg-white' : 'hover:bg-gray-100'}  py-4`}>
                        <label className="block   text-sm">Where</label>
                        <input className='rounded-full bg-transparent outline-none' type="text" placeholder='Search destinations' value={filteringData.location} />
                    </div> : <div onClick={openLocation} className='font-bold cursor-pointer pl-2'>Any where</div>
                }
                {isOpenLocation && (
                    <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                        <SelectLocationDropdown
                            setIsOpen={setIsOpenLocation}
                            handleChangeLocation={handleChangeLocation}
                        />
                    </div>
                )}
            </div>

            <div className='md:flex-1 flex items-center'>
                {/* Divider */}
                <div className="border-l border-gray-300  h-10" />

                {
                    isShowFull ? <>
                        {/* Check in Section */}
                        <div className='relative flex-grow'>
                            <div onClick={openCheckIn} className={` px-5 rounded-full transition-all duration-300 py-4 ${isOpenCheckIn ? 'bg-white' : 'hover:bg-gray-100'}`}>
                                <label className="block   text-sm">Check in</label>
                                <p>{formatDate(filteringData.checkIn)}</p>
                            </div>
                            {isOpenCheckIn && (
                                <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                                    <CheckIn
                                        setIsOpen={setIsOpenCheckIn}
                                        handleChangeCheckIn={handleChangeCheckIn}
                                        checkIn={filteringData.checkIn}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Divider */}
                        <div className="border-l border-gray-300 h-10" />

                        {/* Check out Section */}
                        <div className='relative flex-grow'>
                            <div onClick={openCheckOut} className={` px-5 rounded-full transition-all duration-300 py-4 ${isOpenCheckout ? 'bg-white' : 'hover:bg-gray-100'}`}>
                                <label className="block   text-sm">Check out</label>
                                <p>{formatDate(filteringData.checkout)}</p>
                            </div>
                            {
                                isOpenCheckout && <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                                    <Checkout setIsOpen={setIsOpenCheckout} handleChangeCheckout={handleChangeCheckout} checkout={filteringData.checkout} checkIn={filteringData.checkIn} />
                                </div>
                            }
                        </div>
                    </> : <p onClick={openCheckIn} className='font-bold px-2'>Any Time</p>
                }

                {/* Divider */}
                <div className="border-l border-gray-300 h-10" />
            </div>

            <div className='relative md:flex-1'>
                {
                    isShowFull ? <>
                        {/* Who Section */}
                        <div className={`relative px-5 rounded-full transition-all duration-300  ${isOpenGuest ? 'bg-white' : 'hover:bg-gray-100'} flex justify-between items-center gap-1`}>
                            <div onClick={openGuest} className='flex-grow overflow-hidden cursor-pointer py-4'>
                                <label className="block   text-sm">Who</label>
                                <p className='font-bold text-nowrap'>{showingGuestText}</p>
                            </div>
                            {/* Search Button */}
                            <button onClick={filterAll} className={`bg-primary text-white  rounded-full  flex justify-center items-center gap-2 transition-all duration-300 p-3 h-11 ${isShowFull ? 'w-max' : 'w-11'}`}>
                                {isShowFull && ' Search'}<FaSearch />
                            </button>
                        </div>
                    </> : <div onClick={openGuest} className='flex gap-2 items-center cursor-pointer'>
                        <p className='text-nowrap font-bold '>Add guests</p>
                        {/* Search Button */}
                        <button  className="bg-primary text-white p-3 rounded-full top-4 right-4 flex items-center gap-2 transition-all duration-300">
                            {isShowFull && ' Search'} <FaSearch />
                        </button>
                    </div>
                }
                {
                    isOpenGuest && <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                        <Guests
                            setIsOpen={setIsOpenGuest}
                            guests={guests}
                            setGuests={setGuests}
                        />
                    </div>
                }
            </div>


        </div>
    );
};

export default Searchbar;