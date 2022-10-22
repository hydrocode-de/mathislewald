import { useState } from 'react';
import Map, { ViewState, ViewStateChangeEvent, Source, Layer } from 'react-map-gl';

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
            <Source id="states" type="raster" tileSize={256} tiles={['http://geowwd.uni-freiburg.de:8080/geoserver/topp/wms?service=WMS&version=1.1.0&request=GetMap&layers=topp%3Astates&bbox=-124.73142200000001%2C24.955967%2C-66.969849%2C49.371735&width=768&height=330&srs=EPSG%3A4326&styles=&format=image%2Fpng']}>
                <Layer id="states" type="raster" />
            </Source>
        </Map>
    )
}

export default MainMap