import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonNote,
  IonRow,
  IonSegment,
  IonSegmentButton,
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

const TreeOverviewItem: React.FC<{
  name: string;
  value: string;
  description: string;
}> = ({ name, value, description }) => {
  return (
    <IonItem lines="none" class="ion-no-padding">
      <IonGrid>
        <IonRow>
          <IonCol class="ion-text-left ion-align-self-end">
            <IonLabel>{name}</IonLabel>
          </IonCol>
          <IonCol class="ion-text-right ion-align-self-end">
            <IonLabel>
              <h1>{value}m</h1>
            </IonLabel>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol style={{ paddingTop: "0" }} class="ion-padding-vertical">
            <IonNote>{description}</IonNote>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

const TreeDetails: React.FC<TreeDetailsProps> = ({ treeID }) => {
  // get the current preffered color scheme
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // load all inventory data
  const { filteredInventory, allInventory } = useData();

  // compnent state to store this feature
  const [feature, setFeature] = useState<InventoryFeature>();
  const [currentImg, setCurrentImg] = useState<string>();

  // state for the plot data
  const [data, setData] = useState<Data[]>([]);
  const [layout, setLayout] = useState<Partial<Layout>>({
    autosize: true,
  } as Layout);

  // state to set the plot type
  const [plotType, setPlotType] = useState<"hist2d" | "heights" | "radius">(
    "heights"
  );
  const plotTypeName = {
    hist2d: "Height vs Radius (2D Histogram)",
    heights: "Height Histogram",
    radius: "Radius Histogram",
  };

  // DEV
  const { status, getImageData } = useOffline();
  useEffect(() => {
    if (feature && status !== "pending") {
      getImageData(feature.properties.images?.[0]).then((data) =>
        setCurrentImg(data)
      );
    }
  }, [feature, status]);

  // load the correct feature, whenever the URL param or inventory updates
  useEffect(() => {
    if (filteredInventory?.features) {
      const f = filteredInventory.features.find(
        (f) => Number(f.properties.treeid) === treeID
      );
      setFeature(f);
    }
  }, [filteredInventory, treeID]);

  // update the plot data, when the feature changes
  useEffect(() => {
    if (!allInventory || !feature) return;

    // create traces and layout container
    let traces: Data[] = [];
    let layout = {
      autosize: true,
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color: isDark ? "white" : "black" },
    } as Layout;

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
  }, [allInventory, feature, plotType, isDark]);

  return (
    <>
      <IonCard>
        <IonCardHeader></IonCardHeader>
        <IonCardContent>
          {/* Use it later on */}
          {/* <IonItem lines="none">
            <IonSegment value={"front"}>
              <IonSegmentButton value="front">
                <IonLabel>Front</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="back">
                <IonLabel>Back</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItem> */}
          {currentImg ? (
            <img src={`data:image/png;base64,${currentImg}`} alt="" />
          ) : null}
          <IonItem lines="none">
            <IonLabel className="ion-text-wrap">
              <h3>LiDAR scan images</h3>
              <p>
                Measured individual tree height using a combination of
                stereophotogrammetry and LiDAR.
              </p>
            </IonLabel>
          </IonItem>
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          {feature && (
            <div>
              <TreeOverviewItem
                name="Radius"
                value={feature!.properties.radius.toFixed(2)}
                description="Radius of a Tree"
              />
              <TreeOverviewItem
                name="Height"
                value={feature!.properties.height.toFixed(1)}
                description="Measured individual tree height using a combination of
                stereophotogrammetry and LiDAR."
              />
            </div>
          )}
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle class="ion-text-center">
            {plotTypeName[plotType]}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent class="ion-no-padding">
          <IonItem lines="none">
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
          <div style={{ paddingTop: "3vh", paddingBottom: 20 }}>
            <Plot
              data={data}
              layout={layout}
              useResizeHandler
              style={{ width: "100%", height: "35vh" }}
              config={{ displayModeBar: false }}
            />
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default TreeDetails;
