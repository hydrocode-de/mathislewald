import { InventoryFeature } from "./data.model"

export interface Checksums {
    inventory: string,
    images: string,
    baselayer: {[key: string]: string}
}

export interface OfflineImage {
    name: string,
    mime: string,
    src: string | Blob
}

export interface OfflineInventory {
    name: string,
    features: InventoryFeature[],
    bbox: GeoJSON.BBox
}

export interface OfflineBaselayer extends OfflineImage {
    bbox: GeoJSON.BBox
}