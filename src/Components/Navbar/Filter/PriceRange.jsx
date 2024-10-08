import React, { useState } from 'react';
import { Col, InputGroup, InputNumber, RangeSlider, Row } from 'rsuite';
import useInfo from '../../../hooks/useInfo';

const PriceRange = () => {
    const { filteringData, setFilteringData } = useInfo();
    const minPrice = filteringData.price.min
    const maxPrice = filteringData.price.max
    const value = [minPrice, maxPrice]
    return (
        <div>
            <h2 className='text-xl font-semibold text-black'>Price range</h2>
            <RangeSlider
                progress
                className=''
                style={{ marginTop: 16, }}
                value={value}
                max={300}
                onChange={value => {
                    setFilteringData({ ...filteringData, price: { min: value[0], max: value[1] } })

                }}
            />
            <div className='flex justify-between py-3 text-black text-sm'>
                <div>
                    <p>Minimum</p>
                    <input value={minPrice}
                        onChange={(e) => setFilteringData({ ...filteringData, price: { min: e.target.value, max: maxPrice } })}
                        
                        type="number" className='border border-black w-20 px-2 text-center py-3 rounded-full flex justify-center items-center outline-none' placeholder='Type' />
                </div>
                <div>
                    <p>Maximum</p>
                    <input
                        onChange={(e) => setFilteringData({ ...filteringData, price: { max: e.target.value, min: minPrice } })}
                        value={maxPrice} type="number" className='border border-black w-20 px-2 text-center py-3 rounded-full flex justify-center items-center outline-none' placeholder='Type' />
                </div>
            </div>
        </div>
    );
};

export default PriceRange;
