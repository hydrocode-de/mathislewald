import React, { createContext, useContext, useEffect, useState } from "react";
import { Checksums, OfflineBaselayer, OfflineImage, OfflineInventory } from "./offline.model";
import { getItem, setItem } from 'localforage'

import { useSettings } from "./settings";


// model the data types
interface OfflineState {
    synced: boolean,
    inventory: OfflineInventory[],
    images: OfflineImage[],
    baselayers: OfflineBaselayer[]
}

// initial empty state
const initialState: OfflineState = {
    synced: false,
    inventory: [],
    images: [],
    baselayers: []
}

// build the context 
const OfflineContext = createContext(initialState)

export const OfflineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal state of the provider
    const [synced, setSynced] = useState<boolean>(false)


    const checkRemoteStatus = () => {}

    // load the offline state on startup
    useEffect(() => {
        //
    })


    

    // get the current geoserver url from settings context
    const { geoserverUrl } = useSettings()

    // create the final value
    const value = {
        synced,
        inventory: [],
        images: [],
        baselayers: []
    }

    return <>
        <OfflineContext.Provider value={value}>
            { children }
        </OfflineContext.Provider>
    </>
}

// create a hook for easier data access
export const useOffline = () => {
    return useContext(OfflineContext)
}