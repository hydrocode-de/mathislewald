/**
 * Model the Invetory properties within the GeoJSON specification
 */
interface InventoryProperties {
    treeid: number;
    radius: number;
    height: number;
    image: string;
    [key: string]: any;
}

// define how inventory data looks like
export type InventoryData = GeoJSON.FeatureCollection<GeoJSON.Point, InventoryProperties>