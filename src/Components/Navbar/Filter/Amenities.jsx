import { FaWifi } from "react-icons/fa";
import useInfo from "../../../hooks/useInfo";
import { TbToolsKitchen3 } from "react-icons/tb";
import { BiSolidWasher } from "react-icons/bi";

const Amenities = () => {
    const { amenities, setAmenities } = useInfo();
    const wifi = amenities.wifi
    const kitchen = amenities.kitchen
    const washer = amenities.washer;
    const btnStyle = (isActive = false) => {
        return ` px-5 py-3 rounded-full transition-all duration-200 active:scale-90 hover:border-black flex gap-2 items-center ${isActive ? 'border-[2.5px] border-black' : 'border border-gray-500'}`
    }
    return (
        <div>
            <h2 className='text-xl font-semibold text-black pb-3'>Amenities</h2>
            <div className="flex flex-wrap gap-3">
                <button onClick={()=> setAmenities({...amenities, wifi: !wifi})} className={`${btnStyle(wifi)}`}>
                <FaWifi className="text-2xl" />   Wifi
                </button>
                <button onClick={()=> setAmenities({...amenities, kitchen: !kitchen})} className={`${btnStyle(kitchen)}`}>
                <TbToolsKitchen3 className="text-2xl" /> Kitchen
                </button>
                <button onClick={()=> setAmenities({...amenities, washer: !washer})} className={`${btnStyle(washer)}`}>
                <BiSolidWasher className="text-2xl" /> Washer
                </button>
            </div>
        </div>
    );
};

export default Amenities;