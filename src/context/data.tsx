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
import { InventoryData } from "./data.model";
import { useSettings } from "./settings";
import cloneDeep from "lodash.clonedeep";

import * as wfs from '../util/wfs';
import * as wms from '../util/wms';

// model the data types
interface DataState {
    availableInventory: wfs.FeatureType[];
    availableBaselayer: wms.GroundLayerType[];
    allInventory: InventoryData | null;
    inventory: InventoryData | null;
    synced: boolean;
}

// initial empty state
const initialState: DataState = {
    availableInventory: [],
    availableBaselayer: [],
    allInventory: null,
    inventory: null,
    synced: false
}

// build the context
const DataContext = createContext(initialState)


export const DataProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal state of the provider
    const [allInventory, setAllInventory] = useState<InventoryData>()
    const [inventory, setInventory] = useState<InventoryData>()

    // create internal state for available layer
    const [availableInventory, setAvailableInventory] = useState<wfs.FeatureType[]>([])
    const [availableBaselayer, setAvailableBaselayer] = useState<wms.GroundLayerType[]>([])

    // create internal and external state to distribute active layers
    const [activeDataLayer, setActiveDataLayer] = useState<string[]>([])
    const [activeBaseLayer, setActiveBaseLayer] = useState<string[]>([])

    // create state for synchronization
    const [synced, setSynced] = useState<boolean>(false)

    // use the Settings context
    const { geoserverUrl } = useSettings()

    // create effect to load data
    // TODO: refactor this into a module to read WFS
    // TODO: change to sync with offline store
    useEffect(() => {
        // run only if settings loaded
        if (geoserverUrl) {
            // TODO: we do not handle layer names so far
            wfs.getInventoryData(geoserverUrl)
            .then(invData => setAllInventory(invData))
            .catch(error => console.log(error))

            // get the available options from the Geoserver instance
            wfs.getInventories(geoserverUrl).then(invTypes => setAvailableInventory(invTypes))
            wms.getBaseLayers(geoserverUrl).then(bl => setAvailableBaselayer(bl))
        }
    }, [geoserverUrl])

    // re-filter inventory when allInventory changes
    useEffect(() => {
        if (allInventory) {
            // TODO build the filter here
            const inv = {
                type: 'FeatureCollection',
                bbox: allInventory?.bbox,  // TODO after filter, update this
                features: [...cloneDeep(allInventory.features.filter(f => true))]
            } as InventoryData
            setInventory(inv)
            setSynced(true)
        } else {
            setInventory(undefined)
        }
    }, [allInventory])

    // create the final value
    const value = {
        allInventory: allInventory || null,
        inventory: inventory || null,
        availableInventory,
        availableBaselayer,
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
