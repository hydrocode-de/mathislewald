import React, { createContext, useContext, useState } from "react"

/**
 * Global Settings
 * 
 * For now the global settings context is read-only
 * Can be used later on to save user-settings to the local-storage
 * 
 */
interface SettingsState {
    geoserverUrl: string
}

// TODO: add the resource structures Public/Inventory etc
const initialState: SettingsState = {
    geoserverUrl: 'http://geowwd.uni-freiburg.de/geoserver'
}

// create the Settings Context
const SettingsContext = createContext(initialState);

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // set component state
    const [geoserverUrl, setGeoserverUrl] = useState<string>(initialState.geoserverUrl);

    // create the export value
    const value = {
        geoserverUrl
    }

    return <>
        <SettingsContext.Provider value={value}>
            { children }
        </SettingsContext.Provider>
    </>
}

// create a settings hook
export const useSettings = () => {
    return useContext(SettingsContext);
}