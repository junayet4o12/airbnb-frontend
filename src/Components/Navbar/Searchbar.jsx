import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
    return (
        <div className="flex items-center bg-white rounded-full shadow-md p-2 max-w-4xl mx-auto text-sm space-x-2">
            {/* Where Section */}
            <div className="flex-grow px-5 rounded-full transition-all duration-300 hover:bg-gray-100 py-2">
                <label className="block   text-sm">Where</label>
                <p className=' '>
                    Search destinations
                </p>
            </div>

            {/* Divider */}
            <div className="border-l border-gray-300  h-10" />

            {/* Check in Section */}
            <div className="flex-grow px-5 rounded-full transition-all duration-300 hover:bg-gray-100 py-2">
                <label className="block   text-sm">Check in</label>
                <p>Add dates</p>
            </div>

            {/* Divider */}
            <div className="border-l border-gray-300 h-10" />

            {/* Check out Section */}
            <div className="flex-grow px-5 rounded-full transition-all duration-300 hover:bg-gray-100 py-2">
                <label className="block   text-sm">Check out</label>
                <p>Add dates</p>
            </div>

            {/* Divider */}
            <div className="border-l border-gray-300 h-10" />

            {/* Who Section */}
            <div className="flex-grow px-5 rounded-full transition-all duration-300 hover:bg-gray-100 py-2">
                <label className="block   text-sm">Who</label>
                <p>Add guests</p>
            </div>

            {/* Search Button */}
            <button className="bg-primary text-white p-3 rounded-full">
                <FaSearch />
            </button>
        </div>
    );
};

export default Searchbar;