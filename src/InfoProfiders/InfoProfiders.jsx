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
    const [filter, { data, isLoading }] = useFilterPropertyMutation();
    const filterAll = () => {
        filter({ ...filteringData, category: category.category, ...guests })
    }
    useEffect(() => {
        filterAll()
    }, [category])

    const allInfo = {
        filteringData, setFilteringData, guests, setGuests, category, setCategory, showFullSearchBar, isLoading, data, setShowFullSearchBar, keepFullSearchBar, setKeepFullSearchBar, filterAll, showTexas, setShowTexas
    };

    return (
        <InfoContext.Provider value={allInfo}>{children}</InfoContext.Provider>
    );
};
export default InfoProviders;
