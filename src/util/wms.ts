import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Buffer } from "buffer";

export interface BBox {
  south: number;
  north: number;
  east: number;
  west: number
}

export interface GroundLayerType {
  name: string;
  title: string;
  keywords: [];
  bbox: BBox;
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

export interface BaseLayerImgOpt {
  width?: number,
  height?: number,
  type?: string
}

export const getBaseLayersImg = async (baseUrl: string, layerName: string, bbox: BBox, opts: BaseLayerImgOpt ={}): Promise<string> => {
  // set the box
  const box = `${bbox.west},${bbox.south},${bbox.east},${bbox.north}`
  
  // set the other params
  const mime = `image/${opts.type || 'jpeg'}`
  const size = `height=${opts.height || 256}&width=${opts.width || 256}`
  // get base layer uri
  const uri = `${baseUrl}/Baselayer/wms?service=WMS&version=1.1.1&request=getMap&layers=Baselayer:${layerName}&bbox=${box}&srs=EPSG:32632&transparent=true&format=${mime}&${size}`

  return new Promise((resolve, reject) => {
    axios.get<string>(uri, {responseType: 'arraybuffer'}).then(response => {
      // create the buffer
      const buffer = Buffer.from(response.data, 'binary').toString('base64')
      resolve(buffer)
    }).catch(error => reject(error))
  })


}
