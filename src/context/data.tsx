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
import axios from 'axios';
import { InventoryData } from "./data.model";
import { useSettings } from "./settings";

// model the data types
interface DataState {
    inventory: InventoryData | null;
    synced: boolean;
}

// initial empty state
const initialState: DataState = {
    inventory: null,
    synced: false
}

// build the context
const DataContext = createContext(initialState)


export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal state of the provider
    const [inventory, setInventory] = useState<InventoryData>()

    // create state for synchronization
    const [synced, setSynced] = useState<boolean>(false)

    // use the Settings context
    const { geoserverUrl } = useSettings()

    // create effect to load data
    useEffect(() => {
        // run only if settings loaded
        if (geoserverUrl) {
            // build query params -> TODO: this should be configurable as well
            const params = {
                service: 'WFS',
                version: '1.0.0',
                request: 'GetFeature',
                typeName: 'Public:inventory',
                outputFormat: 'application/json',
                srsName: 'EPSG:4326'
            }
            axios.get<InventoryData>(`${geoserverUrl}/Public/ows`, {params: params})
            .then((response => {
                setInventory(response.data)
                setSynced(true)
                console.log(response.data)
            })).catch(error => console.log(error))
        } else {
            console.log('No geoserver url')
        }
    }, [geoserverUrl])

    // create the final value
    const value = {
        inventory: inventory || null,
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
