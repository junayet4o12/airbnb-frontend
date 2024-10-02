import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SelectLocationDropdown from './SelectLocationDropdown';
import CheckIn from './CheckIn';
import Checkout from './Checkout';
import Guests from './Guests';

const Searchbar = () => {
    const [filteringData, setFilteringData] = useState({
        location: '',
        checkIn: null,
        checkout: new Date(),
    })
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })

    // Separate isOpen states for each dropdown
    const [isOpenLocation, setIsOpenLocation] = useState(false);
    const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
    const [isOpenCheckout, setIsOpenCheckout] = useState(false);
    const [isOpenGuest, setIsOpenGuest] = useState(false);
    const handleChangeLocation = (location) => {
        setFilteringData({ ...filteringData, location: location })
        setIsOpenLocation(false)
        setIsOpenCheckIn(true)
    }
    const formatDate = (date) => {
        if (!filteringData.checkIn) {
            return 'Add dates'
        } else if (!date) {
            return 'Add dates'
        }
        const options = { month: 'short', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    const handleChangeCheckIn = (checkIn) => {
        const isChangeEndDate = filteringData.checkout.getTime() >= checkIn.getTime()

        setFilteringData({ ...filteringData, checkIn: checkIn, checkout: isChangeEndDate ? filteringData.checkout : checkIn, })
        setIsOpenCheckIn(false)
        setIsOpenCheckout(true)
    }
    const handleChangeCheckout = (checkout) => {
        setFilteringData({ ...filteringData, checkout: checkout[0].endDate })
        setIsOpenCheckout(false)
        setIsOpenGuest(true)
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
    return (
        <div className={`flex items-center rounded-full shadow-md p-0.5 pr-2 max-w-4xl mx-auto text-sm space-x-2 ${isOpenLocation || isOpenCheckIn || isOpenCheckout || isOpenGuest ? 'bg-gray-200' : 'bg-white'}`}>
            {/* Where Section */}
            <div className='relative flex-1'>
                <div onClick={() => setIsOpenLocation(true)} className={`flex-grow px-5 rounded-full transition-all duration-300 ${isOpenLocation ? 'bg-white' : 'hover:bg-gray-100'}  py-4`}>
                    <label className="block   text-sm">Where</label>
                    <input className='rounded-full bg-transparent outline-none' type="text" placeholder='Search destinations' value={filteringData.location} />
                </div>
                {isOpenLocation && (
                    <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                        <SelectLocationDropdown
                            setIsOpen={setIsOpenLocation}
                            handleChangeLocation={handleChangeLocation}
                        />
                    </div>
                )}
            </div>

            <div className='flex-1 flex items-center'>
                {/* Divider */}
                <div className="border-l border-gray-300  h-10" />

                {/* Check in Section */}
                <div className='relative flex-grow'>
                    <div onClick={() => setIsOpenCheckIn(true)} className={` px-5 rounded-full transition-all duration-300 py-4 ${isOpenCheckIn ? 'bg-white' : 'hover:bg-gray-100'}`}>
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
                    <div onClick={() => setIsOpenCheckout(true)} className={` px-5 rounded-full transition-all duration-300 py-4 ${isOpenCheckout ? 'bg-white' : 'hover:bg-gray-100'}`}>
                        <label className="block   text-sm">Check out</label>
                        <p>{formatDate(filteringData.checkout)}</p>
                    </div>
                    {
                        isOpenCheckout && <div className="z-30 absolute left-0 top-24 shadow-lg rounded-2xl overflow-hidden bg-gray-100 ">
                            <Checkout setIsOpen={setIsOpenCheckout} handleChangeCheckout={handleChangeCheckout} checkout={filteringData.checkout} checkIn={filteringData.checkIn} />
                        </div>
                    }
                </div>

                {/* Divider */}
                <div className="border-l border-gray-300 h-10" />
            </div>

            <div className='relative flex-1'>
                {/* Who Section */}
                <div onClick={() => setIsOpenGuest(true)} className={`relative px-5 rounded-full transition-all duration-300 py-4 ${isOpenGuest ? 'bg-white' : 'hover:bg-gray-100'} flex justify-between items-center gap-1`}>
                    <div className='flex-grow overflow-hidden'>
                        <label className="block   text-sm">Who</label>
                        <p className='font-bold text-nowrap'>{showingGuestText}</p>
                    </div>
                    {/* Search Button */}
                    <button className="bg-primary text-white p-3 rounded-full top-4 right-4 flex items-center gap-2 transition-all duration-300">
                      {isOpenGuest && ' Search'} <FaSearch />
                    </button>
                </div>
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