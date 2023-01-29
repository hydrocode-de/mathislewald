import { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { useLayers } from "../../context/layers";
import * as wms from '../../util/wms';

const BaseLayerSource: React.FC = () => {
    const [activeLayers, setActiveLayers] = useState<string[]>([])

    // subscribe to layers
    const {availableBaseLayer, activeBaseLayer, activeInventoryLayer} = useLayers()

    useEffect(() => {
        setActiveLayers([...activeBaseLayer])
        console.log(activeBaseLayer)
    }, [activeBaseLayer])

    //console.log(layers.availableBaseLayer)
    
    return <>
        {availableBaseLayer.map(l => (
            <Source key={l.name} id={l.name} type={l.name === 'dtm' ? 'raster-dem' : 'raster'} 
                tiles={[wms.getBaseLayersUri('http://geowwd.uni-freiburg.de/geoserver', l.name)]} tileSize={256}
            >
                <Layer 
                    id={l.name} 
                    type={l.name === 'dtm' ? 'hillshade' : 'raster'} 
                    source={l.name}  
                    paint={{}} 
                    beforeId={activeInventoryLayer.length > 0 ? 'inventory' : undefined} 
                    layout={{visibility: activeLayers.includes(l.name) ? 'visible' : 'none'}} />
            </Source>
        )) } 
    </>
}

export default BaseLayerSource;