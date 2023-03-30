import React, { createContext, useContext, useState } from "react"
import { Geolocation, Position } from "@capacitor/geolocation"


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
    position: Position | null
    screenSize: {width: number, height: number} | undefined
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
    position: null,
    screenSize: {width: 0, height: 0},
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
    const [positionWatchId, setPositionWatchId] = useState<string | null>(null)
    const [position, setPosition] = useState<Position | null>(null)

    // add state for managing screenSize
    const [screenSize, setScreenSize] = useState<{width: number, height: number} | undefined>(undefined)

    // implement detail functions
    const setDetailTo = (detail: ACTIVE_DETAIL) => setActiveDetailModal(detail)

    const closeDetail = () => setActiveDetailModal('none')

    const changeBaseUrl = (newUrl: string) => {
        setServerUrl(newUrl)
        setGeoserverUrl(`${newUrl}/geoserver`)
        setChecksumUrl(`${newUrl}/assets/checksums.json`)
    }

    const activatePosition = () => {
        Geolocation.watchPosition({enableHighAccuracy: true}, pos => {
            if (pos) setPosition(pos)
        }).then(watchId => {
            setPositionWatchId(watchId)
            setPositionEnabled(true)
        })
    }

    const deactivatePosition = () => {
        if (positionWatchId) {
            Geolocation.clearWatch({id: positionWatchId}).then(() => {
                setPositionWatchId(null)
                setPosition(null)
                setPositionEnabled(false)
            })
        }
    }

    // effect for listening to screen size changes
    React.useEffect(() => {
        const updateScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', updateScreenSize)
        updateScreenSize()
        return () => window.removeEventListener('resize', updateScreenSize)
    }, [])

    // create the export value
    const value = {
        serverUrl,
        geoserverUrl,
        checksumUrl,
        activeDetailModal,
        positionEnabled,
        position,
        screenSize,
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