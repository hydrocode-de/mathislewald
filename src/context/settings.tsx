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
    serverUrl: string
    geoserverUrl: string
    checksumUrl: string
    activeDetailModal: ACTIVE_DETAIL
    positionEnabled: boolean
    setDetailTo: (detail: ACTIVE_DETAIL) => void
    closeDetail: () => void
    changeBaseUrl: (newUrl: string) => void
    activatePosition: () => void
    deactivatePosition: () => void
}

// TODO: add the resource structures Public/Inventory etc
const initialState: SettingsState = {
    serverUrl: 'http://geowwd.uni-freiburg.de',
    geoserverUrl: 'http://geowwd.uni-freiburg.de/geoserver',
    checksumUrl: 'http://geowwd.uni-freiburg.de/assets/checksums.json',
    activeDetailModal: 'none',
    positionEnabled: false,
    setDetailTo: (detail: ACTIVE_DETAIL) => {},
    closeDetail: () => {},
    changeBaseUrl: (newUrl: string) => {},
    activatePosition: () => {},
    deactivatePosition: () => {}
}

// create the Settings Context
const SettingsContext = createContext(initialState);

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // set component state
    const [serverUrl, setServerUrl] = useState<string>(initialState.serverUrl);
    const [geoserverUrl, setGeoserverUrl] = useState<string>(initialState.geoserverUrl);
    const [checksumUrl, setChecksumUrl] = useState<string>(initialState.checksumUrl);

    const [activeDetailModal, setActiveDetailModal] = useState<ACTIVE_DETAIL>('none')

    // position state management
    const [positionEnabled, setPositionEnabled] = useState<boolean>(false)

    // implement detail functions
    const setDetailTo = (detail: ACTIVE_DETAIL) => setActiveDetailModal(detail)

    const closeDetail = () => setActiveDetailModal('none')

    const changeBaseUrl = (newUrl: string) => {
        setServerUrl(newUrl)
        setGeoserverUrl(`${newUrl}/geoserver`)
        setChecksumUrl(`${newUrl}/assets/checksums.json`)
    }

    const activatePosition = () => {
        setPositionEnabled(true)
    }

    const deactivatePosition = () => {
        setPositionEnabled(true)
    }

    // create the export value
    const value = {
        serverUrl,
        geoserverUrl,
        checksumUrl,
        activeDetailModal,
        positionEnabled,
        setDetailTo,
        closeDetail,
        changeBaseUrl,
        activatePosition,
        deactivatePosition
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