import { useState } from 'react';
import filerIcon from '../../../assets/icon/filter.jpg'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { RxCross1 } from 'react-icons/rx';
import FilterTab from './FilterTab';
import PriceRange from './PriceRange';
import RoomAndBeds from './RoomAndBeds';
import Amenities from './Amenities';
import useInfo from '../../../hooks/useInfo';
const Filter = () => {
    const { filterAll } = useInfo()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleShow = () => {
        filterAll()
        handleClose()
    }
    return (
        <>
            <button onClick={handleOpen} className='flex items-center gap-1 border border-gray-700 h-max px-2 py-3 rounded-lg text-sm text-nowrap'> <img src={filerIcon} className='size-4 object-cover' alt="" />Filter</button>





            <Dialog open={open} handler={handleClose} className=''>
                <DialogHeader className='border-b border-gray-500 py-2 relative'>
                    <p className='text-xl text-center w-full'>Filter</p>
                    <button onClick={handleClose} className='absolute left-3 top-3 text-base font-medium hover:bg-gray-200 active:scale-90 p-1 rounded-full'><RxCross1 /></button>
                </DialogHeader>

                <DialogBody className='space-y-3 text-black max-h-[75vh] overflow-y-auto'>
                    <FilterTab />
                    <PriceRange />
                    <RoomAndBeds />
                    <Amenities />
                </DialogBody>
                <DialogFooter className='py-2 border-t border-gray-500'>
                    <button onClick={handleShow} className='text-white bg-black/90 hover:bg-black active:scale-90 transition-all duration-300 p-3 rounded-lg'>Show Places</button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default Filter;