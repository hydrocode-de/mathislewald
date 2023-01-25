import React, { createContext, useContext, useEffect, useState } from "react";
import { useSettings } from "./settings";

import * as wfs from '../util/wfs';
import * as wms from '../util/wms';

interface LayersState {
    availableInventoryLayer: wfs.FeatureType[];
    availableDataLayer: wfs.FeatureType[];
    availableBaseLayer: wms.GroundLayerType[];
    activeInventoryLayer: string[];
    activeDataLayer: string[];
    activeBaseLayer: string[];

    // some functions
    activateInventoryLayer: (layer: string) => void;
    activateBaseLayer: (layer: string) => void;
    activateDataLayer: (layer: string) => void;
    deactivateInventoryLayer: (layer: string) => void;
    deactivateBaseLayer: (layer: string) => void;
    deactivateDataLayer: (layer: string) => void;

    // overwrite functions
    setInventoryLayerTo: (layers: string[]) => void;
    setBaseLayerTo: (layers: string[]) => void;
    setDataLayerTo: (layers: string[]) => void;
    
}

// initial state
const initialState: LayersState = {
    availableInventoryLayer: [],
    availableBaseLayer: [],
    availableDataLayer: [],
    activeInventoryLayer: [],
    activeDataLayer: [],
    activeBaseLayer: [],
    activateInventoryLayer: (layer: string) => {},
    activateBaseLayer: (layer: string) => {},
    activateDataLayer: (layer: string) => {},
    deactivateInventoryLayer: (layer: string) => {},
    deactivateBaseLayer: (layer: string) => {},
    deactivateDataLayer: (layer: string) => {},
    setInventoryLayerTo: (layers: string[]) => {},
    setBaseLayerTo: (layers: string[]) => {},
    setDataLayerTo: (layers: string[]) => {}

}

// build the context
const LayersContext = createContext(initialState)


export const LayersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create internal and external state to distribute active layers
    const [activeInventoryLayer, setActiveInventoryLayer] = useState<string[]>([])
    const [activeDataLayer, setActiveDataLayer] = useState<string[]>([])
    const [activeBaseLayer, setActiveBaseLayer] = useState<string[]>([])

    // create internal state for available layer

    const [availableInventoryLayer, setAvailableInventoryLayer] = useState<wfs.FeatureType[]>([])
    const [availableDataLayer, setAvailableDataLayer] = useState<wfs.FeatureType[]>([])
    const [availableBaseLayer, setAvailableBaseLayer] = useState<wms.GroundLayerType[]>([])

    
    // load available layers
    const { geoserverUrl } = useSettings()

    // listen to changes on the geoserverUrl
    // TODO, this needs to be replaced by the offline service
    useEffect(() => {
        if (geoserverUrl) {
            wfs.getInventories(geoserverUrl)
            .then(iv => {
                // console.log(iv)
                setAvailableInventoryLayer(iv)
                
                // set the last on activee by default
                setActiveInventoryLayer([ iv.length > 0 ? iv[0].name : '' ])
            })
            //.catch(err => console.log(err))
            
            wms.getBaseLayers(geoserverUrl)
            .then(bl => {
                // console.log(bl)
                setAvailableBaseLayer(bl)
                setActiveBaseLayer([])
            })
            .catch(err => console.log(err))
        }
    }, [geoserverUrl])


    // define the fuctions
    const activateInventoryLayer = (layerName: string) => {
        // check that the layer is valid
        if (availableInventoryLayer.map(l => l.name).includes(layerName)) {
            const layers = [...activeInventoryLayer];
            layers.push(layerName)
            setActiveInventoryLayer(layers)
        } else {
            console.log(`[Layer] ${layerName} is not a valid InventoryLayer`)
        }
    }

    const activateBaseLayer = (layerName: string) => {
        // check that the layer is valid
        if (availableBaseLayer.map(l => l.name).includes(layerName)) {
            const layers = [...activeBaseLayer];
            layers.push(layerName)
            setActiveBaseLayer(layers)
        } else {
            console.log(`[Layer] ${layerName} is not a valid BaseLayer`)
        }
    }

    const activateDataLayer = (layerName: string) => {
        // check that the layer is valid
        if (availableDataLayer.map(l => l.name).includes(layerName)) {
            const layers = [...activeDataLayer];
            layers.push(layerName)
            setActiveDataLayer(layers)
        } else {
            console.log(`[Layer] ${layerName} is not a valid DataLayer`)
        }
    }

    const deactivateInventoryLayer = (layerName: string) => {
        const layers = [...activeInventoryLayer.filter(name => name !== layerName)]
        setActiveInventoryLayer(layers)
    }

    const deactivateBaseLayer = (layerName: string) => {
        const layers = [...activeDataLayer.filter(name => name !== layerName)]
        setActiveBaseLayer(layers)

    }

    const deactivateDataLayer = (layerName: string) => {
        const layers = [...activeDataLayer.filter(name => name !== layerName)]
        setActiveDataLayer(layers)
    }

    const setInventoryLayerTo = (layers: string[]) => {
        setActiveInventoryLayer([...layers])
    }

    const setDataLayerTo = (layers: string[]) => {
        setActiveDataLayer([...layers])
    }

    const setBaseLayerTo = (layers: string[]) => {
        setActiveBaseLayer([...layers])
    }

    // create the final value
    const value = {
        availableInventoryLayer,
        availableDataLayer,
        availableBaseLayer,
        activeInventoryLayer,
        activeBaseLayer,
        activeDataLayer,
        activateInventoryLayer,
        activateDataLayer,
        activateBaseLayer,
        deactivateInventoryLayer,
        deactivateDataLayer,
        deactivateBaseLayer,
        setInventoryLayerTo,
        setDataLayerTo,
        setBaseLayerTo
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
