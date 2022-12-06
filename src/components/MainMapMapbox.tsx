import { useEffect, useState } from 'react';
import Map, { ViewState, ViewStateChangeEvent, Source, Layer, useMap } from 'react-map-gl';
import { useData } from '../context/data';

// import mapbox css
import 'mapbox-gl/dist/mapbox-gl.css'

const InventorySource: React.FC = () => {
    // get a reference to the map
    const {current: map} = useMap();

    // subscribe to data context
    const { inventory } = useData()
    
    // flyTo inventory data
    useEffect(()=> {
        if (inventory && inventory.bbox) {
            if (inventory.bbox.length === 4) {
                map?.fitBounds(inventory.bbox)
            } else {
                map?.fitBounds([inventory.bbox[0], inventory.bbox[1], inventory.bbox[3], inventory.bbox[4]])
            }
        }
    }, [inventory, map])

    return <>
        { inventory ? (
            <Source id="inventory" type="geojson" data={inventory}>
                <Layer id="inventory" type="circle" paint={{'circle-color': 'green', 'circle-stroke-color': 'white', 'circle-radius': 8}} />
            </Source>
        ) : null }
        </>
}

const MainMap: React.FC = () => {
    // get the prefered color settings to load correct mapId
    const prefer = window.matchMedia('(prefers-color-scheme: dark)') 

    // map state
    const [viewState, setViewState] = useState<Partial<ViewState>>({
        longitude: 7.843,
        latitude: 48.,
        zoom: 14
    })

    /**
     * define a custom viewState handler on move, so that we can
     * intercept the behavior if needed.
     */
    const moveHandler = (event: ViewStateChangeEvent) => {
        // console.log(event)
        setViewState(event.viewState)
    }

    return (
        <Map
            reuseMaps
            {...viewState}
            onMove={moveHandler}
            style={{width: '100%', height: '100%'}}
            mapStyle={prefer ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/light-v10'}
        >
            <InventorySource />
        </Map>
    )
}

export default MainMap