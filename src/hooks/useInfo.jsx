// import React from 'react';

import { useContext } from "react";
import { InfoContext } from "../InfoProfiders/InfoProfiders";
 
const useInfo = () => {
    const givingInfo = useContext(InfoContext)
    return givingInfo 
};
  
export default useInfo; 