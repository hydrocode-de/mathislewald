/**
 * Offline context
 * 
 * This context implements axios and the @capacitor/filesystem to create offline functionality for the app.
 * 
 * The online backend sever exposes MD5 checksums for the different data packages, which are stored locally and used to decide on synchronizaiton cycles.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { InventoryData } from "./data.model";

interface OfflineState {
    inventory: InventoryData | null;
}

// initial state
const initialState: OfflineState = {
    inventory: null
}

// build the context
const OfflineContext = createContext(initialState)


// define the provider
export const OfflineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create the context state
    const [inventory, setInventory] = useState<InventoryData | null>(null)
    
    // run a check for data once
    useEffect(() => {
        // 1. check if the file is there
        // if no -> load from WFS
        // if yes check checksum
        // if valid -> read file
        // if invalid load from WFS
    }, [])

    // build the final context value
    const value = {
        inventory
    }

    return <>
        <OfflineContext.Provider value={value}>
            { children }
        </OfflineContext.Provider>
    </>
}

// create a hook for easier access
export const useOffline = () => {
    return useContext(OfflineContext)
}