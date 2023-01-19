import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonNote, IonPage, IonSegment, IonSegmentButton, IonSpinner, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router"
import Plot from 'react-plotly.js'
import { Data, Layout } from 'plotly.js'

import { useData } from "../context/data"
import { InventoryProperties } from "../context/data.model"
import * as plot from '../util/plot'


const TreeOverviewPage: React.FC<RouteComponentProps<{id: string}>> = ({ match }) => {
    // compnent state to store this feature
    const [feature, setFeature] = useState<GeoJSON.Feature<GeoJSON.Point, InventoryProperties>>()

    // state for the plot data
    const [data, setData] = useState<Data[]>([])
    const [layout, setLayout] = useState<Partial<Layout>>({} as Layout)

    // state to set the plot type
    const [plotType, setPlotType] = useState<'hist2d' | 'heights' | 'radius'>('heights')

    // load all inventory data
    const { filteredInventory, allInventory } = useData()

    // load the correct feature, whenever the URL param or inventory updates
    useEffect(() => {
        if (filteredInventory?.features) {
            const f = filteredInventory.features.find(f => f.id === match.params.id)
            setFeature(f)
        }
    }, [filteredInventory, match])

    // update the plot data, when the feature changes
    useEffect(() => {
        if (!allInventory || !feature) return
        
        // create traces and layout container
        let traces: Data[] = []
        let layout = {autosize: true}

        // switch the plot type
        if (plotType === "hist2d") {
            const [t, l] = plot.histogram2d(feature, allInventory)
            traces = t
            layout = {...layout, ...l}
        } else if (plotType === 'radius') {
            const [t, l] = plot.histogram(feature, allInventory, 'radius')
            traces = t
            layout = {...layout, ...l}
        } else if (plotType === 'heights') {
            const [t, l] = plot.histogram(feature, allInventory, 'height')
            traces = t
            layout = {...layout, ...l}
        }
        
        // update
        setData(traces)
        setLayout(layout)
    }, [allInventory, feature, plotType])

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton />
                    <IonTitle>{ feature ? `Tree ID:${feature.id}` : 'Loading...' }</IonTitle>
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
            
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle>Feature view</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>Overview</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                    <IonItem lines="none">
                        <IonLabel slot="start">TreeID</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.treeid }</IonLabel>
                    </IonItem>

                    <IonItem lines="none">
                        <IonLabel slot="start">Radius</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.radius.toFixed(2) }m</IonLabel>
                        <IonNote slot="helper">
                            Radius describes half of the trunk diameter to 15 of the tree.
                        </IonNote>
                    </IonItem>

                    <IonItem lines="none">
                        <IonSegment value={plotType} onIonChange={e => setPlotType(e.target.value as 'heights' | 'radius' | 'hist2d')}>
                            <IonSegmentButton value="hist2d">
                                <IonLabel>Heights ~ Radius (2D Histogram)</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="heights">
                                <IonLabel>Heights histogram</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="radius">
                                <IonLabel>Radius histogram</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonItem>

                    <Plot data={data} layout={layout} useResizeHandler style={{width: '100%', height: '40vh'}} />

                    <IonItem lines="none">
                        <IonLabel slot="start">Height</IonLabel>
                        <IonLabel slot="end">{ feature?.properties.height.toFixed(1) }m</IonLabel>
                        <IonNote slot="helper">
                            Measured individual tree height using a combination of 
                            stereophotogrammetry and LiDAR.
                        </IonNote>
                    </IonItem>


                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>LiDAR</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>

                    <IonItem lines="none">
                        <IonLabel className="ion-text-wrap">
                            <h3>LiDAR scan images</h3>
                            <p>Measured individual tree height using a combination of 
                            stereophotogrammetry and LiDAR.</p>
                        </IonLabel>
                    </IonItem>

                    <img src={`http://geowwd.uni-freiburg.de/img/${feature?.properties.image}`} alt="a lidar image" />
                </IonCardContent>
            </IonCard>

        </IonContent>
    </IonPage>
}

export default TreeOverviewPage