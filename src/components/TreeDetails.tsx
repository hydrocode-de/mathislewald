import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonHeader,
  IonItem,
  IonLabel,
  IonListHeader,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Data, Layout } from "plotly.js";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useData } from "../context/data";
import { InventoryFeature } from "../context/data.model";
import { useOffline } from "../context/offline";
import * as plot from "../util/plot";
import "./TreeDetails.css";

interface TreeDetailsProps {
  treeID: number;
}

const TreeDetails: React.FC<TreeDetailsProps> = ({ treeID }) => {
  // load all inventory data
  const { filteredInventory, allInventory } = useData();

  // compnent state to store this feature
  const [feature, setFeature] = useState<InventoryFeature>();
  const [currentImg, setCurrentImg] = useState<string>();

  // state for the plot data
  const [data, setData] = useState<Data[]>([]);
  const [layout, setLayout] = useState<Partial<Layout>>({} as Layout);

  // state to set the plot type
  const [plotType, setPlotType] = useState<"hist2d" | "heights" | "radius">(
    "heights"
  );

  // DEV
  const { status, getImageData } = useOffline();
  useEffect(() => {
    if (feature && status !== "pending") {
      getImageData(feature.properties.image).then((data) =>
        setCurrentImg(data)
      );
    }
  }, [feature, status]);

  // load the correct feature, whenever the URL param or inventory updates
  useEffect(() => {
    if (filteredInventory?.features) {
      const f = filteredInventory.features.find(
        (f) => f.properties.treeid === treeID
      );
      setFeature(f);
    }
  }, [filteredInventory, treeID]);

  // update the plot data, when the feature changes
  useEffect(() => {
    if (!allInventory || !feature) return;

    // create traces and layout container
    let traces: Data[] = [];
    let layout = { autosize: true };

    // switch the plot type
    if (plotType === "hist2d") {
      const [t, l] = plot.histogram2d(feature, allInventory);
      traces = t;
      layout = { ...layout, ...l };
    } else if (plotType === "radius") {
      const [t, l] = plot.histogram(feature, allInventory, "radius");
      traces = t;
      layout = { ...layout, ...l };
    } else if (plotType === "heights") {
      const [t, l] = plot.histogram(feature, allInventory, "height");
      traces = t;
      layout = { ...layout, ...l };
    }

    // update
    setData(traces);
    setLayout(layout);
  }, [allInventory, feature, plotType]);

  return (
    <>
      {/* <IonListHeader>Overview</IonListHeader> */}
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Overview</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel>TreeID</IonLabel>
            <IonLabel class="ion-text-end">
              <h1>{feature?.properties.treeid}</h1>
            </IonLabel>
          </IonItem>

          <IonItem lines="none" class="ion-padding-bottom">
            <div style={{ width: "70%" }}>
              <IonLabel>Radius</IonLabel>
              <IonNote slot="helper">Half of the trunk diameter.</IonNote>
            </div>
            {/* <IonLabel>Radius</IonLabel> */}

            <IonLabel class="ion-text-end">
              <h1>{feature?.properties.radius.toFixed(2)}m</h1>
            </IonLabel>
          </IonItem>

          <IonItem lines="none">
            <div style={{ width: "70%" }}>
              <IonLabel>Height</IonLabel>
              <IonNote class="ion-padding-bottom">
                Measured using a combination of stereophotogrammetry and LiDAR.
              </IonNote>
            </div>
            <IonLabel class="ion-text-end">
              <h1> {feature?.properties.height.toFixed(1)}m</h1>
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
      {/* <IonListHeader>Charts</IonListHeader> */}

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Charts</IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="ion-no-padding">
          <div style={{ paddingTop: "3vh" }}>
            <Plot
              data={data}
              layout={layout}
              useResizeHandler
              style={{ width: "100%", height: "35vh" }}
              config={{ displayModeBar: false }}
            />
          </div>
          <IonItem lines="none" class="ion-padding-vertical">
            <IonSegment
              value={plotType}
              onIonChange={(e) =>
                setPlotType(e.target.value as "heights" | "radius" | "hist2d")
              }
            >
              <IonSegmentButton value="hist2d">
                <IonLabel>Height~Radius</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="heights">
                <IonLabel>Height</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="radius">
                <IonLabel>Radius</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem>
        </IonCardContent>
      </IonCard>
      {/* <IonListHeader>LIDAR Scans</IonListHeader> */}

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>LIDAR Scans</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
              <h3>LiDAR scan images</h3>
              <p>
                Measured individual tree height using a combination of
                stereophotogrammetry and LiDAR.
              </p>
            </IonLabel>
          </IonItem>
          {currentImg ? (
            <img src={`data:image/png;base64,${currentImg}`} alt="" />
          ) : null}
          {/* <img src={`http://geowwd.uni-freiburg.de/img/${feature?.properties.image}`} alt="a lidar image" /> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TreeDetails;
