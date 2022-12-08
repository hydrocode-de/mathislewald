/**
 * Utility functions to build the correct queryies for the
 */
import axios from 'axios';
import { InventoryData } from '../context/data.model';


const getInventoryUrl = (baseUrl: string): string => `${baseUrl}/Inventory/ows`

const getBaseUrl = (baseUrl: string): string => `${baseUrl}/Base/ows`

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