import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { GiWorld } from 'react-icons/gi';
import logo from '../../assets/logo/mainLogo.png'
import earth from '../../assets/icon/earth.svg'
import Container from '../../Shared/Container';
import Searchbar from './Searchbar';
import Category from './Category';
import useInfo from '../../hooks/useInfo';
const Navbar = () => {
  const {showFullSearchBar, setShowFullSearchBar,keepFullSearchBar} = useInfo()
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled === 0) {
        setShowFullSearchBar(true)
      } else {
        setShowFullSearchBar(false)
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isShowFull = keepFullSearchBar ? true : showFullSearchBar ? true : false
  return (
    <Container>
      <div>
        <nav className="flex justify-between items-center py-4 bg-white">
          {/* Left - Logo */}
          <div className="flex items-center md:flex-1">
            <img
              src={logo}
              alt="Airbnb Logo"
              className="h-8"
            />
          </div>

          {/* Center - Links */}
          <div className="hidden md:flex">
            <p className={`text-gray-800 hover:text-black transition-all duration-300 ${isShowFull ? 'mt-0' : "-mt-20"}`}>Stays</p>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center justify-end space-x-2 md:flex-1">
            <button className='text-sm font-bold p-2 rounded-full hover:bg-black/5 transition-all duration-300 hidden lg:block'>Airbnb your home</button>
            <button className='p-2 rounded-full hover:bg-black/5 transition-all duration-300'><img className='size-4' src={earth} alt="" /></button>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="flex items-center border p-2 px-3 rounded-full space-x-2 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <FiMenu className="text-xl" />
                <FaUserCircle className="text-3xl text-gray-600" />
              </div>

              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 p-2 shadow text-base space-y-1">
                <li ><a className='font-bold'>Sign up</a></li>
                <li><a>Log in</a></li>
                <hr className='w-full' />
                <li><a>Gift cards</a></li>
                <li><a>Airbnb your home</a></li>
                <li><a>Host an experience</a></li>
                <li><a>Help Center</a></li>
              </ul>
            </div>

          </div>
        </nav>
        <div className={`transition-all duration-300 ${isShowFull ? 'mt-0' : "-mt-14"}`}>
          <Searchbar />
        </div>
        <Category />
      </div>
    </Container>
  );
};

export default Navbar;
