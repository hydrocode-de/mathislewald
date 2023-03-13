/**
 * Data context
 * 
 * This context loads the data into the application.
 * In the final version, it will synchronize the data to localstorage and
 * then load from the localstorage to this context.
 * 
 * The application will only subscribe to this context in order to implement 
 * future changes to the data model
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

import { useOffline } from "./offline";
import { InventoryData } from "./data.model";


// model the data types
interface DataState {
    allInventory: InventoryData | null;
    filteredInventory: InventoryData | null;
    synced: boolean;
}

// initial empty state
const initialState: DataState = {
    allInventory: null,
    filteredInventory: null,
    synced: false
}

// build the context
const DataContext = createContext(initialState)


export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal state of the provider
    const [allInventory, setAllInventory] = useState<InventoryData>()
    const [filteredInventory, setFilteredInventory] = useState<InventoryData>()

    // create state for synchronization
    const [synced, setSynced] = useState<boolean>(false)

    // use the offline context
    const { inventory } = useOffline()

    // copy over inventory data
    useEffect(() => {
        if (inventory) {
            setAllInventory(inventory)
        } else {
            setAllInventory(undefined)
        }
    }, [inventory])

    // re-filter inventory when allInventory changes
    useEffect(() => {
        if (allInventory) {
            // TODO build the filter here
            const inv = {
                type: 'FeatureCollection',
                bbox: allInventory?.bbox,  // TODO after filter, update this
                features: [...cloneDeep(allInventory.features.filter(f => true))]
            } as InventoryData
            setFilteredInventory(inv)
            setSynced(true)
        } else {
            setFilteredInventory(undefined)
        }
    }, [allInventory])

    // create the final value
    const value = {
        allInventory: allInventory || null,
        filteredInventory: filteredInventory || null,
        synced
    }

    return <>
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    </>
}

// create a hook for easier data access
export const useData = () => {
    return useContext(DataContext);
}
