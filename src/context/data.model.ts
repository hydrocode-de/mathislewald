/**
 * Model the Invetory properties within the GeoJSON specification
 */
export interface InventoryProperties {
    treeid: number;
    radius: number;
    height: number;
    images: string[];
    [key: string]: any;
}

// export only one of the inventory data features
export type InventoryFeature = GeoJSON.Feature<GeoJSON.Point, InventoryProperties>

// define how inventory data looks like
export type InventoryData = GeoJSON.FeatureCollection<GeoJSON.Point, InventoryProperties>
