/**
 * Offline context
 * 
 * This context implements axios and the @capacitor/filesystem to create offline functionality for the app.
 * 
 * The online backend sever exposes MD5 checksums for the different data packages, which are stored locally and used to decide on synchronizaiton cycles.
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { Filesystem, Directory, FileInfo } from "@capacitor/filesystem";
import axios from "axios";
import cloneDeep from "lodash.clonedeep";

import { InventoryData } from "./data.model";
import { useSettings } from "./settings";

interface Checksums {
    [key: string]: string
}

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
    // create the context state for data
    const [inventory, setInventory] = useState<InventoryData | null>(null)

    // handle the files
    const [localChecksums, setLocalChecksums] = useState<Checksums | null>(null)
    const [remoteChecksums, setRemoteChecksums] = useState<Checksums | null>(null)
    const [fileInfos, setFileInfos] = useState<FileInfo[]>([])
    
    // load the settings context
    const { geoserverUrl, checksumUrl } = useSettings()

    const updateFileList = (): void => {
        Filesystem.readdir({
            path: '',
            directory: Directory.Data
        }).then(result => {
            setFileInfos(cloneDeep(result.files))
        }).catch(err => console.log(`[updateFileList]: ${err}`))
    }

    const updateRemoteChecksums = (): Promise<void> => {
        // reach out to the checksums URL
        return axios.get<Checksums>(checksumUrl).then(result => {
            const check: Checksums = result.data
            setRemoteChecksums(check)
        })
        .then(() => Promise.resolve())
        .catch(err => Promise.reject(`[updateReomteChecksums] ${err}`))
    }

    // run a check for data only once
    useEffect(() => {
        // 1. check if the file is there
        updateFileList()

        // 2. reach out to remote checksums
        updateRemoteChecksums()

        // if no -> load from WFS
        // if yes check checksum
        // if valid -> read file
        // if invalid load from WFS
    }, [])

    // search for local checksums
    useEffect(() => {
        // if the localChecksums are already checked, do nothing
        if (localChecksums) return

        if (fileInfos.map(i => i.name).includes('checksums.json')) {
            Filesystem.readFile({path: 'checksums.json', directory: Directory.Data}).then(value => {
                setLocalChecksums(JSON.parse(value.data))
            })
        }
    }, [fileInfos, localChecksums])

    // check if local and remote checksums are there and not the same
    useEffect(() => {
        if (!localChecksums || !remoteChecksums) return

        // DO THE STUFF HERE
        
        // check each of the checksums
        Object.entries(remoteChecksums).forEach(([key, checksum]) => {
            if (!localChecksums[key] || localChecksums[key] !== checksum) {
                console.log(`Updating ${key} (${checksum})`)
            } else {
                console.log(`${key} (${checksum}) is up-to-date.`)
            }
        })

    }, [localChecksums, remoteChecksums])

    

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