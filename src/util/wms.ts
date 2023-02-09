import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export interface GroundLayerType {
  name: string;
  title: string;
  keywords: [];
  bbox: { south: number; north: number; east: number; west: number };
  abstract?: string;
}

interface GetCapabilitiesResponse {
  WMS_Capabilities: {
    Capability: {
      Layer: {
        Layer: {
          Abstract: string;
          Name: string;
          Title: string;
          KeywordList: { Keyword: string[] };
          EX_GeographicBoundingBox: {
            westBoundLongitude: number;
            eastBoundLongitude: number;
            northBoundLatitude: number;
            southBoundLatitude: number;
          };
        }[];
      };
    };
  };
}

const getBaseUrl = (baseUrl: string): string => `${baseUrl}/Baselayer/ows`;

export const getBaseLayers = (baseUrl: string): Promise<GroundLayerType[]> => {
  return new Promise((resolve, reject) => {
    // build the parameters
    const params = {
      service: "WMS",
      version: "1.3.0",
      request: "getCapabilities",
      format: "image/png",
      namespace: "Baselayer",
    };

    // get the url
    const url = getBaseUrl(baseUrl);

    // reach out
    axios
      .get<string>(url, { params })
      .then((response) => {
        const parser = new XMLParser();
        const rawObj: GetCapabilitiesResponse = parser.parse(response.data);

        // parse out the layers
        const layers: GroundLayerType[] =
          rawObj.WMS_Capabilities.Capability.Layer.Layer.map((L) => {
            return {
              abstract: L.Abstract,
              name: L.Name,
              keywords: L.KeywordList.Keyword || [],
              title: L.Title,
              bbox: {
                south: L.EX_GeographicBoundingBox.southBoundLatitude,
                west: L.EX_GeographicBoundingBox.westBoundLongitude,
                north: L.EX_GeographicBoundingBox.northBoundLatitude,
                east: L.EX_GeographicBoundingBox.eastBoundLongitude,
              },
            } as GroundLayerType;
          });

        // resolve the layers
        resolve(layers);
      })
      .catch((error) => reject(error));
  });
};

export const getBaseLayersUri = (
  baseUrl: string,
  layerName: string
): string => {
  return `${baseUrl}/Baselayer/wms?service=WMS&version=1.1.1&request=getMap&layers=Baselayer:${layerName}&bbox={bbox-epsg-3857}&srs=EPSG:3857&transparent=true&format=image/png&width=256&height=256`;
};
