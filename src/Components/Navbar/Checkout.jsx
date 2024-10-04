/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import useInfo from "../../hooks/useInfo";

const Checkout = ({ setIsOpen, checkout: incomingCheckout, handleChangeCheckout, checkIn }) => {

    const checkout = [
        { startDate: checkIn || new Date(), endDate: incomingCheckout || checkIn, key: 'selection' }
    ]
    const dropdownRef = useRef(null);
    const { setShowFullSearchBar, setKeepFullSearchBar } = useInfo()

    useEffect(() => {
        // Close the dropdown when clicking outside of it
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowFullSearchBar(true)
                setKeepFullSearchBar(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDateChange = (item) => {
        // Allow only the endDate to be updated, keeping startDate fixed
        const newSelection = {
            ...item.selection,
            startDate: checkout[0].startDate // Keep the startDate unchanged
        };
        handleChangeCheckout([newSelection])
        // setReturnDate();
    };

    return (
        <div className="allAirportDropDown rounded-lg bg-white overflow-hidden" ref={dropdownRef}>
            <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={checkout}
                minDate={checkout[0].startDate} // Prevent selection before startDate
            />
        </div>
    );
};

export default Checkout;