import React, { useState } from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import useInfo from "../../../hooks/useInfo";

const FilterTab = () => {
    const { filteringData, setFilteringData } = useInfo()

    const activeTab = filteringData.type;
    console.log(activeTab);
    
    const data = [
        {
            label: "Any type",
            value: "anyType",
            desc: "Description for Any type",
        },
        {
            label: "Room",
            value: "room",
            desc: "Description for Room",
        },
        {
            label: "Entire Home",
            value: "entireHome",
            desc: "Description for Entire Home",
        },
    ];

    return (
        <Tabs value={activeTab}>
            <TabsHeader>
                {data.map(({ label, value }) => (
                    <Tab
                        key={value}
                        value={value}
                        onClick={() => setFilteringData({ ...filteringData, type: value })} // Change tab on click
                    >
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
        </Tabs>
    );
};

export default FilterTab;
