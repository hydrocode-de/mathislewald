
import { Style } from 'mapbox-gl';
import maplibregl, { MapLibreEvent } from 'maplibre-gl';
import Map from 'react-map-gl'

// load the maplibre CSS styles
import 'maplibre-gl/dist/maplibre-gl.css';

import InventorySource from './map-components/InventorySource'

const MainMap: React.FC = () => {
    // onload callback handler
    const onLoad = (e: any) => {
        // resize the map once loaded
        (e as MapLibreEvent).target.resize()
    }

    // some hard-coded styles
    const style = {
        version: 8,
        sources: {
            terrain: {
                type: 'raster',
                tiles: ['https://stamen-tiles.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg'],
                tileSize: 256,
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
                maxzoom: 19
            }
        },
        layers: [
            {
                id: 'terrain',
                source: 'terrain',
                type: 'raster'
            }
        ]
    } as Style;

    return (
            <Map mapLib={maplibregl}
                style={{width: '100%', height: '100%'}}
                onLoad={m => onLoad(m)}
                mapStyle={style}
            >
                <InventorySource />
            </Map>
    )
}

export default MainMap