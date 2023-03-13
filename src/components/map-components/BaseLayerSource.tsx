import { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";
import { useLayers } from "../../context/layers";
import { useOffline } from "../../context/offline";
import * as wms from '../../util/wms';

const BaseLayerSource: React.FC = () => {
    const [activeLayers, setActiveLayers] = useState<string[]>([])

    // create 

    // subscribe to layers
    const {availableBaseLayer, activeBaseLayer, activeInventoryLayer} = useLayers()

    // load offline context
    const { status, baselayers } = useOffline()

    useEffect(() => {
        setActiveLayers([...activeBaseLayer])
//        console.log(activeBaseLayer)
    }, [activeBaseLayer])

    //console.log(layers.availableBaseLayer)
    
    if (status === 'offline' || true) {
        return <>
            { baselayers?.map(l => (
                <Source key={l.name} id={l.name} type='image' 
                    url={`data:image/${l.opt.type};base64,${l.data}`} 
                    coordinates={[[l.bbox.west, l.bbox.south], [l.bbox.east, l.bbox.south], [l.bbox.east, l.bbox.north], [l.bbox.west, l.bbox.north]]}
                >
                    <Layer id={l.name} type="raster" source={l.name} 
                        paint={{"raster-fade-duration": 0}} 
                        layout={{visibility: activeLayers.includes(l.name) ? 'visible': 'none'}} 
                        beforeId="inventory"
                    />
                </Source>
            )) }
        </>
    } else {
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
                        // beforeId={activeInventoryLayer.length > 0 ? 'inventory' : undefined} 
                        layout={{visibility: activeLayers.includes(l.name) ? 'visible' : 'none'}} />
                </Source>
            )) } 
        </>
    }
    
}

export default BaseLayerSource;