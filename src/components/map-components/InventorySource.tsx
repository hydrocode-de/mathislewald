import { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import { CirclePaint, CircleLayout, MapLayerMouseEvent } from 'mapbox-gl';
import { Source, Layer, useMap } from 'react-map-gl';

import { useData } from "../../context/data";
import { InventoryData, InventoryFeature, InventoryProperties } from "../../context/data.model";
import { useLayers } from "../../context/layers";
import { useIonRouter } from "@ionic/react";


const InventoryLayer: React.FC = () => {
    // component state
    const [src, setSrc] = useState<InventoryData>()

    // store selected and hovered features for effects
    const [hovered, setHovered] = useState<InventoryFeature>()

    // load needed contexts
    const { filteredInventory } = useData()
    const layers = useLayers()
    const map = useMap()
    const router = useIonRouter()

    // load source into component
    useEffect(() => {
        if (filteredInventory) {
            setSrc(cloneDeep({...filteredInventory, features: [...filteredInventory.features.map((f, i) => {
                return {...f, id: i}
            })]}))
        }
    }, [filteredInventory])

    // zoom to layer
    useEffect(() => {
        if (!map.current) {
            return
        }
        // zoom to layer
        if (src?.bbox) {
            map.current.fitBounds(src.bbox as [number, number, number, number], {padding: 90})
        }
        
        src?.features.forEach(f => {
            map.current?.setFeatureState(
                {source: 'inventory', id: f.properties.treeid},
                {color: 'red'}
            )
        })
    }, [map, src])

    // add event listener to map
    useEffect(() => {
        if (!map.current) {
            return
        }
        // mouse Enter
        map.current.on('mouseenter', 'inventory', (e: MapLayerMouseEvent) => {
            // set all other hover to false
            src?.features.forEach(f => {
                map.current?.setFeatureState(
                    {source: 'inventory', id: f.properties.treeid}, {hover: false}
                )
            })

            // active hover only for the first one (this way only one feature is hovered at a time)
            if (e.features && e.features.length > 0) {
                // TODO: implement this as component state and use useEffect to trigger maplibre state
                //setHovered(e.features[0] as InventoryFeature)
                map.current?.setFeatureState(
                    {source: 'inventory', id: e.features[0].properties!.treeid}, {hover: true}
                )
            }

            // change the mouse pointer
            map.current?.getCanvas().style.setProperty('cursor', 'pointer')
        })

        // mouseLeave
        map.current.on('mouseleave', 'inventory', (e: MapLayerMouseEvent) => {
            //setHovered(undefined) 
            // disable hover state for all features, not matter what
            src?.features.forEach(f => {
                map.current?.setFeatureState(
                    {source: 'inventory', id: f.properties.treeid}, {hover: false}
                )
            })

            // reset mouse style
            map.current?.getCanvas().style.setProperty('cursor', 'default')
        })

        // Click handler
        map.current.on('click', 'inventory', (e: MapLayerMouseEvent) => {
            if (e.features && e.features.length > 0) {
                // get the first feature
                const f = e.features[0] as GeoJSON.Feature<GeoJSON.Point>
                router.push(`/list/${(f as InventoryFeature).properties.treeid}`)
            }
        })
    }, [map])

    // build paint and layout
    const paint = {
        'circle-color': ['case', ['boolean', ['feature-state', 'hover'], false], 
            'purple', 
            ['to-color', ['feature-state', 'color'], 'gray']
        ],
        'circle-opacity': 0.8,
        'circle-radius': ['case', ['boolean', ['feature-state', 'hover'], false], 8.5, 6],
        'circle-stroke-width': 0.8,
        'circle-stroke-color': 'white'
    } as CirclePaint

    const layout = {
        // TODO: NEED TO CHANGE THE FORMAT OF INVENTORY LAYER
        visibility: layers.activeInventoryLayer.length > 0 ? 'visible' : 'none'
    } as CircleLayout
    
    return <>
        { src ? (
            <Source id="inventory" type="geojson" data={src}>
                <Layer id="inventory" source="inventory" type="circle" paint={paint} layout={layout} />
            </Source>
        ) : null}
    </>
}

export default InventoryLayer;