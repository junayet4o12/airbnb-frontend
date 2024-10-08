import { createContext, useEffect, useState } from "react";
import { categories } from "../categories";
import { useFilterPropertyMutation } from "../Redux/features/api/allBaseApi";



export const InfoContext = createContext(null);
const InfoProviders = ({ children }) => {
    const [showTexas, setShowTexas] = useState(true); // Initial state set to true

    const [filteringData, setFilteringData] = useState({
        location: '',
        checkIn: null,
        checkout: null,
        type: 'anyType',
        price: {
            min: 30,
            max: 200
        }
    })
    const [category, setCategory] = useState(categories[0])
    const [showFullSearchBar, setShowFullSearchBar] = useState(true)
    const [keepFullSearchBar, setKeepFullSearchBar] = useState(false)
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })
    const [roomsAndBeds, setRoomsAndBeds] = useState({
        room: 0,
        bed: 0,
        bathroom: 0,
    })
    const [amenities, setAmenities] = useState({
        wifi: false,
        kitchen: false,
        washer: false
    })

    const [filter, { data, isLoading }] = useFilterPropertyMutation();
    console.log(data);

    const filterAll = () => {
        filter({ ...filteringData, category: category.category, ...guests, roomsAndBeds,amenities })
    }
    useEffect(() => {
        filterAll()
    }, [category])

    const allInfo = {
        filteringData, setFilteringData, guests, setGuests, category, setCategory, showFullSearchBar, isLoading, data, setShowFullSearchBar, keepFullSearchBar, setKeepFullSearchBar, filterAll, showTexas, setShowTexas, roomsAndBeds, setRoomsAndBeds, amenities, setAmenities
    };

    return (
        <InfoContext.Provider value={allInfo}>{children}</InfoContext.Provider>
    );
};
export default InfoProviders;
