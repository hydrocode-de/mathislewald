import { Layer, Source } from "react-map-gl";
import { useLayers } from "../../context/layers";
import * as wms from '../../util/wms';

const BaseLayerSource: React.FC = () => {
    // subscribe to layers
    const layers = useLayers()

    console.log(layers.availableBaseLayer)
    
    return <>
        {layers.availableBaseLayer.filter(l => layers.activeBaseLayer.includes(l.name)).map(l => (
            <Source key={l.name} id={l.name} type={l.name == 'dtm' ? 'raster-dem' : 'raster'} 
                tiles={[wms.getBaseLayersUri('http://geowwd.uni-freiburg.de/geoserver', l.name)]} tileSize={256}
            >
                <Layer id={l.name} type={l.name == 'dtm' ? 'hillshade' : 'raster'} source={l.name}  paint={{}} 
                beforeId="inventory" />
            </Source>
        )) } 
    </>
}

export default BaseLayerSource;