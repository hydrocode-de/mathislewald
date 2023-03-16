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


interface Count {
    total: number,
    filtered: number
}

// model the data types
interface DataState {
    allInventory: InventoryData | null;
    filteredInventory: InventoryData | null;
    inventoryCount: Count,
    synced: boolean;
}

// initial empty state
const initialState: DataState = {
    allInventory: null,
    filteredInventory: null,
    inventoryCount: {total: 0, filtered: 0},
    synced: false
}

// build the context
const DataContext = createContext(initialState)


export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal state of the provider
    const [allInventory, setAllInventory] = useState<InventoryData>()
    const [filteredInventory, setFilteredInventory] = useState<InventoryData>()
    const [inventoryCount, setInventoryCount] = useState<Count>(initialState.inventoryCount)

    // create state for synchronization
    const [synced, setSynced] = useState<boolean>(false)

    // use the offline context
    const { inventory } = useOffline()

    // copy over inventory data
    useEffect(() => {
        if (inventory) {
            setAllInventory(inventory)
            setInventoryCount({total: inventory.features.length, filtered: inventory.features.length})
        } else {
            setAllInventory(undefined)
            setInventoryCount({total: 0, filtered: 0})
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

            // set States
            setFilteredInventory(inv)
            setInventoryCount({total: allInventory.features.length, filtered: inv.features.length})
            setSynced(true)
        } else {
            setFilteredInventory(undefined)
            setInventoryCount({total: 0, filtered: 0})
        }
    }, [allInventory])

    // create the final value
    const value = {
        allInventory: allInventory || null,
        filteredInventory: filteredInventory || null,
        inventoryCount,
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
