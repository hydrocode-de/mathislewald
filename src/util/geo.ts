/**
 * Utility functions to work and transform geometry formats
 * from and to goole maps namespace
 */


/**
 * Transform a GeoJSON.BBox to a google maps LatLngBounds
 * @param bbox GeoJSON.BBox
 * @returns google.maps.LatLngBounds
 */
export const bboxToLngLat = (bbox: GeoJSON.BBox): google.maps.LatLngBounds => {
    return new google.maps.LatLngBounds(
        {lng: bbox[0], lat: bbox[1]}, 
        {lng: bbox[2], lat: bbox[3]},
    )
}


/**
 * Extract the POINT geometry from a GeoJSON.Feature and transform to
 * google maps LatLng
 * @param feature GeoJSON.Feature<GeoJSON.Point
 * @returns google.maps.LatLng
 */
export const featureToLngLat = (feature: GeoJSON.Feature<GeoJSON.Point>): google.maps.LatLng => {
    return new google.maps.LatLng({
        lng: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1]
    })
}