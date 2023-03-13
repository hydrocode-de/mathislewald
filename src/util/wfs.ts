import { kml } from "@tmcw/togeojson";
import bbox from "@turf/bbox";
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser'
import cloneDeep from "lodash.clonedeep";
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

interface WFS_FEATURE_TYPE {
    Abstract: string,
    Keywords: string,
    LatLonBoundingBox: string,
    Name: string,
    SRS: string,
    Title: string
}
interface GetCapabilitiesResponse {
    WFS_Capabilities: {
        FeatureTypeList: {FeatureType: WFS_FEATURE_TYPE} | WFS_FEATURE_TYPE[]
        [key: string]: any
    }
}

const getInventoryUrl = (baseUrl: string): string => `${baseUrl}/Inventory/ows`


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
            
            const featureList: FeatureType[] = []
            // add data
            if (!Array.isArray(rawObj.WFS_Capabilities.FeatureTypeList)) {
                featureList.push({
                    abstract: (rawObj.WFS_Capabilities.FeatureTypeList.FeatureType).Abstract,
                    name: (rawObj.WFS_Capabilities.FeatureTypeList.FeatureType).Name,
                    title: (rawObj.WFS_Capabilities.FeatureTypeList.FeatureType).Title,
                    keywords: (rawObj.WFS_Capabilities.FeatureTypeList.FeatureType).Keywords.split(','),
                    srs: (rawObj.WFS_Capabilities.FeatureTypeList.FeatureType).SRS,
                })
            } else {
                rawObj.WFS_Capabilities.FeatureTypeList.forEach(R => {
                    featureList.push({
                        abstract: R.Abstract,
                        name: R.Name,
                        title: R.Title,
                        keywords: R.Keywords.split(','),
                        srs: R.SRS
                    })
                })
            }
            
            resolve(featureList)
        })
        .catch(err => reject(err))
    })
}


export const getInventoryData = (baseUrl: string, layerName: string ='inventory-2023'):Promise<InventoryData> => {
    return new Promise((resolve, reject) => {
        // build the parameters
        const params = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: `Inventory:${layerName}`,
            outputFormat: 'kml'
//            outputFormat: 'application/json',
//            srsName: 'EPSG:4326'
        }
        
        // get the url
        const url = getInventoryUrl(baseUrl)

        // reach out to the server
        // axios.get<InventoryData>(url, {params: params})
        // .then(response => resolve(response.data))
        // .catch(error => reject(error))
        axios.get<string>(url, {params: params}).then(
            response => {
                // parse the KML
                const parser = new DOMParser()
                const xml = parser.parseFromString(response.data, 'text/xml')
                const data = kml(xml)
                
                // add the bounding box
                const geojson = cloneDeep({...data, bbox: bbox(data)})
                resolve(geojson as InventoryData)
            }
        )
        
    })
}