/**
 * Offline context
 * 
 * This context implements axios and the @capacitor/filesystem to create offline functionality for the app.
 * 
 * The online backend sever exposes MD5 checksums for the different data packages, which are stored locally and used to decide on synchronizaiton cycles.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Filesystem, Directory, FileInfo, Encoding } from "@capacitor/filesystem";
import axios, { AxiosResponse } from "axios";
import cloneDeep from "lodash.clonedeep";
import { Buffer } from 'buffer'

import { InventoryData } from "./data.model";
import { useSettings } from "./settings";
import * as wfs from "../util/wfs";


export type OFFLINE_STATUS = 'pending' | 'online' | 'offline'

interface Checksums {
    [key: string]: string
}

export interface OfflineImage {
    name: string,
    data: string,
}

interface OfflineState {
    status: OFFLINE_STATUS,
    inventory: InventoryData | null;
    getImageData: (name: string) => Promise<string>
}

// initial state
const initialState: OfflineState = {
    status: 'pending',
    inventory: null,
    getImageData: (name: string) => Promise.reject()
}

// build the context
const OfflineContext = createContext(initialState)


// define the provider
export const OfflineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // general context information
    const [status, setStatus] = useState<OFFLINE_STATUS>('pending')
    
    // create the context state for data
    const [inventory, setInventory] = useState<InventoryData | null>(null)
    const [images, setImages] = useState<OfflineImage[] | null>(null)

    // handle the files
    const [localChecksums, setLocalChecksums] = useState<Checksums | null>(null)
    const [remoteChecksums, setRemoteChecksums] = useState<Checksums | null>(null)
    const [fileInfos, setFileInfos] = useState<FileInfo[] | null>(null)
    
    // load the settings context
    const { serverUrl, geoserverUrl, checksumUrl } = useSettings()

    const updateFileList = useCallback((): Promise<void> => {
        return Filesystem.readdir({
            path: '',
            directory: Directory.Data
        }).then(result => {
            setFileInfos(cloneDeep(result.files))
        }).then(() => Promise.resolve())
        .catch(err => Promise.reject(`[updateFileList]: ${err}`))
    }, [])

    const updateRemoteChecksums = useCallback((): Promise<void> => {
        // reach out to the checksums URL
        return axios.get<Checksums>(checksumUrl).then(result => {
            const check: Checksums = result.data
            setRemoteChecksums(check)
            setStatus('online')
        })
        .then(() => Promise.resolve())
        .catch(err => {
            Promise.reject(`[updateReomteChecksums] ${err}`)
            setStatus('offline')
        })
    }, [checksumUrl])

    const updateLocalChecksums = async (key: string): Promise<void> => {
        if (!remoteChecksums) return Promise.reject('No remote checksums loaded')
        
        // load the old checksums
        let old: Checksums = {}
        if (fileInfos?.map(f => f.name).includes('checksums.json')) {
            await Filesystem.readFile({path: 'checksums.json', directory: Directory.Data}).then(val => {
                old = JSON.parse(val.data)
            })
        }

        // update
        old[key] = remoteChecksums[key]

        // write back
        await Filesystem.writeFile({
            path: 'checksums.json',
            directory: Directory.Data,
            data: JSON.stringify(old),
            encoding: Encoding.UTF8
        }).then(() => setLocalChecksums(old))
        .catch(err => Promise.reject(err))

        return Promise.resolve()
    }

    const downloadInventory = async (): Promise<void> => {
        await wfs.getInventoryData(geoserverUrl).then(inv => {
            // set Inventory Data
            setInventory(inv)

            // save the inventory to file
            Filesystem.writeFile({
                path: 'inventory.json',
                directory: Directory.Data,
                data: JSON.stringify(inv),
                encoding: Encoding.UTF8
            })
        }).then(() => {
            updateLocalChecksums('inventory')
        })

        return Promise.resolve()
    }

    const downloadImages = async (): Promise<void> => {
        if (!inventory) return Promise.reject('Inventory not loaded')
        const requests: Promise<void>[] = []
        
        // create the images folder
        if (!fileInfos?.map(i => i.name).includes('images')) {
            await Filesystem.mkdir({path: '/images', directory: Directory.Data})
        }
 
        // create a new request for each image
        inventory?.features.forEach(img => {
            requests.push(
                axios.get<string>(`${serverUrl}/img/${img.properties.image}`, {responseType: 'arraybuffer'})
                .then(res => {
                    Filesystem.writeFile({
                        path: `/images/${img.properties.image}`,
                        directory: Directory.Data,
                        data: Buffer.from(res.data, 'binary').toString('base64')
                    })
                }).catch(err => Promise.reject(err))
            )
        })

        return axios.all(requests).then(() => {
            updateLocalChecksums('images')
            Promise.resolve()
        })
        .catch(err => Promise.reject(err))
        
    }

    const loadInventory = () => {
        Filesystem.readFile({path: 'inventory.json', directory: Directory.Data}).then(value => {
            const inv: InventoryData = JSON.parse(value.data)
            setInventory(inv)
        }).catch(err => console.log(`[loadInventory] ${err}`))
    }

    /**
     * 
     */
    const getImageData = (filename: string): Promise<string> => {
        // read all images
        return Filesystem.readFile({
            path: `/images/${filename}`, 
            directory: Directory.Data
        }).then(value => {
            return value.data
        })
    }

    // run a check for data only once
    useEffect(() => {
        // 1. check if the file is there
        updateFileList().then(() => {
        
            // 2. reach out to remote checksums
            updateRemoteChecksums()
        })

    }, [updateFileList, updateRemoteChecksums])

    // search for local checksums
    useEffect(() => {
        // if the localChecksums are already checked, do nothing
        if (localChecksums || !fileInfos) return

        if (fileInfos.map(i => i.name).includes('checksums.json')) {
            Filesystem.readFile({path: 'checksums.json', directory: Directory.Data}).then(value => {
                setLocalChecksums(JSON.parse(value.data))
            })
        } else {
            setLocalChecksums({})
        }
    }, [fileInfos, localChecksums])

    // check if local and remote checksums are there and not the same
    useEffect(() => {
        if (!localChecksums || !remoteChecksums) return

        // DO THE STUFF HERE
        // refresh inventory data
        if (!inventory) {
            if (localChecksums.inventory! === remoteChecksums.inventory!) {
                loadInventory()
            } else {
                downloadInventory()
            }
        }

        // refresh images
        if (!images) {
            if (localChecksums.images! === remoteChecksums.images!) {
                ;
            } else {
                downloadImages()
            }
        }
        
        // check each of the checksums
        // DEV ONLY
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
        status,
        inventory,
        getImageData
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