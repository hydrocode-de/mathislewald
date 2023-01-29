import React, { createContext, useContext, useState } from "react"


export type ACTIVE_DETAIL = 'tree' | 'list' | 'none';
/**
 * Global Settings
 * 
 * For now the global settings context is read-only
 * Can be used later on to save user-settings to the local-storage
 * 
 */
interface SettingsState {
    geoserverUrl: string
    activeDetailModal: ACTIVE_DETAIL
    setDetailTo: (detail: ACTIVE_DETAIL) => void
    closeDetail: () => void
}

// TODO: add the resource structures Public/Inventory etc
const initialState: SettingsState = {
    geoserverUrl: 'http://geowwd.uni-freiburg.de/geoserver',
    activeDetailModal: 'none',
    setDetailTo: (detail: ACTIVE_DETAIL) => {},
    closeDetail: () => {}
}

// create the Settings Context
const SettingsContext = createContext(initialState);

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // set component state
    const [geoserverUrl, setGeoserverUrl] = useState<string>(initialState.geoserverUrl);
    const [activeDetailModal, setActiveDetailModal] = useState<ACTIVE_DETAIL>('none')

    // implement detail functions
    const setDetailTo = (detail: ACTIVE_DETAIL) => setActiveDetailModal(detail)

    const closeDetail = () => setActiveDetailModal('none')

    // create the export value
    const value = {
        geoserverUrl,
        activeDetailModal,
        setDetailTo,
        closeDetail
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