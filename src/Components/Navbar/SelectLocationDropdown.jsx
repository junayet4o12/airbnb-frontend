/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import map1 from '../../assets/map/map1.jpg'
import map2 from '../../assets/map/map2.jpg'
import map3 from '../../assets/map/map3.jpg'
import map4 from '../../assets/map/map4.jpg'
import map5 from '../../assets/map/map5.jpg'
import map6 from '../../assets/map/map6.jpg'
import useInfo from "../../hooks/useInfo";
const SelectLocationDropdown = ({ setIsOpen, handleChangeLocation }) => {
const {setShowFullSearchBar, setKeepFullSearchBar} = useInfo()
    const dropdownRef = useRef(null);
    const allMaps = [
        {
            name: 'I’m flexible',
            value: '',
            image: map1,
        },
        {
            name: 'Southeast Asia',
            value: 'Southeast Asia',
            image: map2,
        },
        {
            name: 'Canada',
            value: 'Canada',
            image: map3,
        },
        {
            name: 'Europe',
            value: 'Europe',
            image: map4,
        },
        {
            name: 'Malaysia',
            value: 'Malaysia',
            image: map5,
        },
        {
            name: 'United States',
            value: 'United States',
            image: map6,
        },
    ]
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
    return (
        <div ref={dropdownRef} className="allAirportDropDown rounded-lg bg-gray-50  w-[400px] p-5 overflow-x-auto max-h-[55vh]  custom-scrollbar">
            <div className="grid grid-cols-3 gap-2">
                {
                    allMaps.map((item, idx) => <div key={idx} className="hover:bg-gray-200 p-2 rounded-md">
                        <img onClick={() => handleChangeLocation(item.value)} src={item.image} className="rounded-md cursor-pointer" alt="" />
                        <p className="text-center font-semibold">{item.name}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SelectLocationDropdown;