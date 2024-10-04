import useInfo from "../../hooks/useInfo";
import { useGetAllPropertiesQuery } from "../../Redux/features/api/allBaseApi";
import PropertyCard from "./PropertyCard";

const Home = () => {
    const { isLoading, data=[] } = useInfo()
    const loadingComponents = <div className="w-full p-2 space-y-3">
        <div className="w-full h-32 rounded-lg skeleton"></div>
        <div className="w-[40%] h-5 skeleton"></div>
        <div className="w-[30%] h-5 skeleton"></div>
        <div className="w-[35%] h-5 skeleton"></div>
        <div className="w-[45%] h-5 skeleton"></div>
    </div>
    if (isLoading) {
        return <div className="grid grid-cols-2 md:grid-cols-4">
            {loadingComponents}
            {loadingComponents}
            {loadingComponents}
            {loadingComponents}
        </div>
    }

    return (
        <>
            {
                data.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-52">
                    {
                        data?.map(item => <PropertyCard key={item._id} data={item} />)
                    }
                </div> :
                    <p className="py-10 text-center">No Property Found!!</p>
            }
        </>
    );
};

export default Home;