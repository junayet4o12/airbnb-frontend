import { createContext, useState } from "react";
import { categories } from "../categories";



export const InfoContext = createContext(null);
const InfoProviders = ({ children }) => {

    const [filteringData, setFilteringData] = useState({
        location: '',
        checkIn: null,
        checkout: new Date(),
    })
    const [category, setCategory] = useState(categories[0])
    const [guests, setGuests] = useState({
        adults: 0,
        children: 0,
        infants: 0,
        pets: 0,
    })



    const allInfo = {
        filteringData, setFilteringData, guests, setGuests,category, setCategory
    };

    return (
        <InfoContext.Provider value={allInfo}>{children}</InfoContext.Provider>
    );
};
export default InfoProviders;
