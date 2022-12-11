import { GoogleMap, Marker } from '@capacitor/google-maps';
import { useEffect, useRef } from 'react';
import { useData } from '../context/data';

const { REACT_APP_GOOGLE_MAPS_KEY } = process.env;

const MainMap: React.FC = () => {
    const mapRef  = useRef<HTMLElement>()
    let map: GoogleMap;

    const {inventory} = useData()

    const createMap = async () => {
        if (!mapRef.current) return

        map = await GoogleMap.create({
            id: 'mymap',
            element: mapRef.current,
            apiKey: REACT_APP_GOOGLE_MAPS_KEY as string,
            config: {center: {lat: 48., lng: 7.843}, zoom: 12}
        })
        map.enableClustering()
        if (inventory) {
            map.addMarkers(inventory.features.map(f => {
                return {coordinate: {lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0]}} as Marker
            })).then(l => console.log(l))
        }
    }
    

    useEffect(() => {
        createMap().then(() => (window as any).map = map)
    }, [])
    return (

            <capacitor-google-map ref={mapRef} style={{display: 'inline-block', width: '100%', height: '100%'}}>

            </capacitor-google-map>
        
    )
}

export default MainMap