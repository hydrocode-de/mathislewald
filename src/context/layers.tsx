import React, { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./settings";

import * as wfs from '../util/wfs';
import * as wms from '../util/wms';
import cloneDeep from "lodash.clonedeep";

interface LayersState {
    availableInventory: wfs.FeatureType[];
    availableBaselayer: wms.GroundLayerType[];
    activeDataLayer: string[];
    activeBaseLayer: string[];

    // some functions
    activateBaseLayer: (layer: string) => void;
    activateDataLayer: (layer: string) => void;
    deactivateBaseLayer: (layer: string) => void;
    deactivateDataLayer: (layer: string) => void;
    
}

// initial state
const initialState: LayersState = {
    availableInventory: [],
    availableBaselayer: [],
    activeDataLayer: [],
    activeBaseLayer: [],
    activateBaseLayer: (layer: string) => {},
    activateDataLayer: (layer: string) => {},
    deactivateBaseLayer: (layer: string) => {},
    deactivateDataLayer: (layer: string) => {}

}

// build the context
const LayersContext = createContext(initialState)


export const LayersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal and external state to distribute active layers
    const [activeDataLayer, setActiveDataLayer] = useState<string[]>([])
    const [activeBaseLayer, setActiveBaseLayer] = useState<string[]>([])
    
    // load available layers
    const { geoserverUrl } = useSettings()

    // create internal state for available layer
    const [availableInventory, setAvailableInventory] = useState<wfs.FeatureType[]>([])
    const [availableBaselayer, setAvailableBaselayer] = useState<wms.GroundLayerType[]>([])

    // listen to changes on the geoserverUrl
    useEffect(() => {
        if (geoserverUrl) {
            wfs.getInventories(geoserverUrl).then(iv => {
                setAvailableInventory(cloneDeep(iv))
                
                // set the last on activee by default
                setActiveDataLayer([ iv.pop()?.name || '' ])
            })
            wms.getBaseLayers(geoserverUrl).then(bl => {
                setAvailableBaselayer(bl)
                setActiveBaseLayer([])
            })
        }
    }, [geoserverUrl])


    // define the fuctions
    const activateBaseLayer = (layerName: string) => {
        // check that the layer is valid
        if (availableBaselayer.map(l => l.name).includes(layerName)) {
            const layers = [...activeBaseLayer];
            layers.push(layerName)
            setActiveBaseLayer(layers)
        } else {
            console.log(`[Layer] ${layerName} is not a valid BaseLayer`)
        }
    }

    const activateDataLayer = (layerName: string) => {
        // check that the layer is valid
        if (availableInventory.map(l => l.name).includes(layerName)) {
            const layers = [...activeDataLayer];
            layers.push(layerName)
            setActiveDataLayer(layers)
        } else {
            console.log(`[Layer] ${layerName} is not a valid DataLayer`)
        }
    }

    const deactivateBaseLayer = (layerName: string) => {
        const layers = [...activeDataLayer.filter(name => name !== layerName)]
        setActiveBaseLayer(layers)

    }

    const deactivateDataLayer = (layerName: string) => {
        const layers = [...activeDataLayer.filter(name => name !== layerName)]
        setActiveDataLayer(layers)
    }

    // create the final value
    const value = {
        availableInventory,
        availableBaselayer,
        activeDataLayer,
        activeBaseLayer,
        activateBaseLayer,
        activateDataLayer,
        deactivateBaseLayer,
        deactivateDataLayer
    }

    return <>
        <LayersContext.Provider value={value}>
            { children }
        </LayersContext.Provider>
    </>
}

// create a hook for easier layers access
export const useLayers = () => {
    return useContext(LayersContext);
}
