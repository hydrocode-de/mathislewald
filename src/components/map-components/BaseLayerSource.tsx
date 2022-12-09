import { GroundOverlay, useGoogleMap } from "@react-google-maps/api";
import { useLayers } from "../../context/layers";


const BaseLayerSource: React.FC = () => {
    // subscribe to the ground layers
    const { availableBaselayer, activeBaseLayer } = useLayers()

    return <>
        { availableBaselayer.map(l => {
                return (
                    <GroundOverlay 
                        key={l.name}
                        url={`http://geowwd.uni-freiburg.de/geoserver/Baselayer/wms?service=WMS&version=1.1.0&request=GetMap&layers=Baselayer:${l.name}&bbox=${l.bbox.west}%2C${l.bbox.south}%2C${l.bbox.east}%2C${l.bbox.north}&width=1920&height=1080&srs=EPSG:4326&format=image/jpeg`} 
                        bounds={l.bbox}

                        // I am not sure about this: long loading time but fast in usage
                        opacity={activeBaseLayer.includes(l.name) ? 1 : 0}

                        onClick={e => console.log(e)}
                    />
                )
        }) }
    </>
}

export default BaseLayerSource;