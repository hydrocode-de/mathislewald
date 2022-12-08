/**
 * Utility functions to build the correct queryies for the
 */
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser'
import { InventoryData } from '../context/data.model';

// fast-XML parsed interface in JSON
// TODO: we can read attributes as well and get the BBOX here, already
export interface FeatureType {
    abstract?: string;
    keywords: string[],
    title: string,
    name: string,
    srs?: string
}

interface GetCapabilitiesResponse {
    WFS_Capabilities: {
        FeatureTypeList: {
            Abstract: string,
            Keywords: string,
            LatLonBoundingBox: string,
            Name: string,
            SRS: string,
            Title: string
        }[]
        [key: string]: any
    }
}

const getInventoryUrl = (baseUrl: string): string => `${baseUrl}/Inventory/ows`

const getBaseUrl = (baseUrl: string): string => `${baseUrl}/Base/ows`

export const getInventories = (baseUrl: string): Promise<FeatureType[]> => {
    return new Promise((resolve, reject) => {
        // build the parameters
        const params = {
            service: 'WFS',
            version: '1.0.0',
            request: 'getCapabilities'
        }

        // get the url
        const url = getInventoryUrl(baseUrl)

        // reach out
        axios.get<string>(url, { params })
            .then(response => {
                // parse the XML response
                const parser = new XMLParser()
                const rawObj: GetCapabilitiesResponse = parser.parse(response.data)
                
                // if there is only one Feature Type, it will not be iterable
                if (typeof rawObj.WFS_Capabilities.FeatureTypeList[Symbol.iterator] !== 'function') {
                    rawObj.WFS_Capabilities.FeatureTypeList = [(rawObj.WFS_Capabilities.FeatureTypeList as any).FeatureType]
                }

                // map into more usable structure
                resolve(rawObj.WFS_Capabilities.FeatureTypeList.map(R => {
                    return {
                        abstract: R.Abstract,
                        title: R.Title,
                        name: R.Name,
                        keywords: R.Keywords.split(','),
                        srs: R.SRS
                    } as FeatureType
                }))
            })
            .catch(error => reject(error))
    })
}

export const getInventoryData = (baseUrl: string, layerName: string ='inventory-2022'):Promise<InventoryData> => {
    return new Promise((resolve, reject) => {
        // build the parameters
        const params = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: `Inventory:${layerName}`,
            outputFormat: 'application/json',
            srsName: 'EPSG:4326'
        }

        // get the url
        const url = getInventoryUrl(baseUrl)

        // reach out to the server
        axios.get<InventoryData>(url, {params: params})
        .then(response => resolve(response.data))
        .catch(error => reject(error))

    })
}