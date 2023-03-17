/**
 * Offline context
 * 
 * This context implements axios and the @capacitor/filesystem to create offline functionality for the app.
 * 
 * The online backend sever exposes MD5 checksums for the different data packages, which are stored locally and used to decide on synchronizaiton cycles.
 */

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Filesystem, Directory, FileInfo, Encoding } from "@capacitor/filesystem";
import axios from "axios";
import cloneDeep from "lodash.clonedeep";
import { Buffer } from 'buffer'

import { InventoryData } from "./data.model";
import { useSettings } from "./settings";
import * as wfs from "../util/wfs";
import * as wms from "../util/wms";


export type OFFLINE_STATUS = 'pending' | 'online' | 'offline'

interface Checksums {
    inventory?: string,
    images?: string,
    baselayer?: string
}

export interface OfflineImage {
    name: string,
    data: string,
}

interface OfflineState {
    status: OFFLINE_STATUS,
    inventory: InventoryData | null;
    baselayers: wms.BaseLayerData[] | null;
    localChecksums: Checksums | null;
    remoteChecksums: Checksums | null;
    getImageData: (name: string) => Promise<string>
    getBaselayer: (name: string) => Promise<string>
}

// initial state
const initialState: OfflineState = {
    status: 'pending',
    inventory: null,
    baselayers: null,
    localChecksums: null,
    remoteChecksums: null,
    getImageData: (name: string) => Promise.reject(),
    getBaselayer: (name: string) => Promise.reject()
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
    const [baselayers, setBaseLayers] = useState<wms.BaseLayerData[] | null>(null)

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

    const updateLocalChecksums = async (key: keyof Checksums): Promise<void> => {
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
            // transform inventory data
            const parsedInv = cloneDeep({...inv, features: inv.features.map(f => {
                return {
                    ...f,
                    properties: {
                        ...f.properties,
                        images: (f.properties.image as string).split(';').filter(img => img !== '')
                    }
                }
            })})

            // set Inventory Data
            setInventory(parsedInv)

            // save the inventory to file
            Filesystem.writeFile({
                path: 'inventory.json',
                directory: Directory.Data,
                data: JSON.stringify(parsedInv),
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
        inventory?.features.flatMap(f => f.properties.images).forEach(img => {
            requests.push(
                axios.get<string>(`${serverUrl}/img/${img}`, {responseType: 'arraybuffer'})
                .then(res => {
                    Filesystem.writeFile({
                        path: `/images/${img}`,
                        directory: Directory.Data,
                        data: Buffer.from(res.data, 'binary').toString('base64')
                    })
                }).catch(err => Promise.reject(err))
            )
        })

        return axios.all(requests).then(() => {
            updateLocalChecksums('images').then(() => Promise.resolve())
            
        })
        .catch(err => Promise.reject(err))
        
    }

    const downloadBaselayer = async (): Promise<void> => {
        // before removing existing data, download the info from geoserver
        const layers = await wms.getBaseLayers(geoserverUrl)
        
        const infos = await Promise.all(layers.map(layer => {
            // load the image as base64
            const opts = {type: 'png', width: 2048, height: 2048}
                return wms.getBaseLayersImg(geoserverUrl, layer.name, layer.bbox, opts).then(buf => {
                    return {
                        ...layer,
                        data: buf,
                        opt: opts
                    }
                })
        }))

        // if baselayers already exists, delete it
        if (fileInfos?.map(i => i.name).includes('baselayers')) {
            await Filesystem.rmdir({path: '/baselayers', directory: Directory.Data, recursive: true})
        }
        
        // create the folder again
        await Filesystem.mkdir({path: '/baselayers', directory: Directory.Data})

        // create all the files
        await Promise.all(infos.map(info => {
            return Filesystem.writeFile({
                path: `/baselayers/${info.name}.json`,
                directory: Directory.Data,
                data: JSON.stringify(info),
                encoding: Encoding.UTF8
            })
        })).then(() => {
            updateLocalChecksums('baselayer')
        })
    
    }

    const loadInventory = () => {
        Filesystem.readFile({path: 'inventory.json', directory: Directory.Data}).then(value => {
            const inv: InventoryData = JSON.parse(value.data)
            setInventory(inv)
        }).catch(err => console.log(`[loadInventory] ${err}`))
    }

    const loadBaselayerInfo = async () => {
        // get the available groundlayer names
        const names = await Filesystem.readdir({
            path: '/baselayers',
            directory: Directory.Data
        }).then(files => {
            return files.files.map(f => f.name)
        })

        // read the files
        const layers = await Promise.all(names.map(name => {
            return Filesystem.readFile({path: `/baselayers/${name}`, directory: Directory.Data}).then(res => {
                // const {data, ...info} = JSON.parse(res.data)
                // return info as wms.GroundLayerType
                return JSON.parse(res.data) as wms.BaseLayerData
            })
        }))

        // set the baselayers
        setBaseLayers(layers)
    }

    const getBaselayer = (name: string) => {
        return Filesystem.readFile({path: `/baselayers/${name}.json`, directory: Directory.Data})
        .then(file => {
            const {data, ...info} = JSON.parse(file.data)
            return data as string
        })
    }

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

        if (!baselayers) {
            if (localChecksums.baselayer! === remoteChecksums.baselayer!) {
                console.log('loading baselayer')
                loadBaselayerInfo()
            } else {
                console.log('downloading baselayer')
                downloadBaselayer()
            }
        }
    }, [localChecksums, remoteChecksums])    

    // build the final context value
    const value = {
        status,
        inventory,
        baselayers,
        localChecksums,
        remoteChecksums,
        getImageData,
        getBaselayer
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