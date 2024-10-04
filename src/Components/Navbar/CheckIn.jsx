/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { Calendar } from "react-date-range";
import useInfo from "../../hooks/useInfo";

const CheckIn = ({ setIsOpen, checkIn, handleChangeCheckIn }) => {
    const dropdownRef = useRef(null);
    const {setShowFullSearchBar, setKeepFullSearchBar} = useInfo()
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
    const handleCheckinChange = (item) => {
        
        handleChangeCheckIn(item)
    }
    return (
        <div className="allAirportDropDown rounded-lg bg-white overflow-hidden" ref={dropdownRef}>
            <Calendar onChange={(e)=> handleCheckinChange(e)}
                date={checkIn} />
        </div>
    );
};

export default CheckIn;