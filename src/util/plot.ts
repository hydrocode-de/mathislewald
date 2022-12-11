/**
 * Some plotting utility functions
 */

import { Data, Layout } from "plotly.js";
import { InventoryData, InventoryFeature } from "../context/data.model";

export const histogram2d = (feature: InventoryFeature, referenceData: InventoryData): [Data[], Partial<Layout>]  => {
    const hist: Data = {
        type: 'histogram2dcontour',
        x: referenceData.features.map(f => f.properties.height),
        y: referenceData.features.map(f => f.properties.radius),
        colorscale: 'Greens',
        reversescale: true,
        showscale: false,
        contours: {showlabels: false},
    }

    const scat: Data = {
        type: 'scatter',
        x: referenceData.features.map(f => f.properties.height),
        y: referenceData.features.map(f => f.properties.radius),
        mode: 'markers',
        marker: {size: 4, opacity: 0.4},
        name: 'all inventory data',
        customdata: referenceData.features.map(f => f.id || 'NaN'),
        hovertemplate: '<b>Tree ID %{customdata}</b><br><b>Height: </b>%{x:.1f}m<br><b>Radius: </b>%{y:.2f}m<extra></extra>'
    }

    const myself: Data = {
        type: 'scatter',
        x: [feature!.properties.height],
        y: [feature!.properties.radius],
        mode: 'markers',
        marker: {size: 15, opacity: 0.8, color: 'purple'},
        name: `${feature?.id}`,
        hovertemplate: '<b>Height: </b>%{x:.1f}m<br><b>Radius: </b>%{y:.2f}m<extra></extra>'
    }

    // make some plot specific adaptions to the layout
    const layoutUpdate = {
        legend: {orientation: 'h'},
        margin: {t: 5, b: 25, l: 50, r: 2},
        xaxis: {title: 'Tree height (m)'},
        yaxis: {title: 'Tree radius (m)'}
    } as Partial<Layout>

    return [[hist, scat, myself], layoutUpdate]

}

export const histogram = (feature: InventoryFeature, referenceData: InventoryData, yValue: string): [Data[], Partial<Layout>]  => {
    const hist: Data = {
        type: 'histogram',
        x: referenceData.features.map(f => f.properties[yValue]),
        name: 'all inventory data'
    }

    // make some plot specific adaptions to the layout
    const layoutUpdate = {
        title: `Tree ${yValue} distribution`,
        xaxis: {title: `${yValue} (m)`},
        yaxis: {title: 'number of trees'},
        shapes: [{
            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: feature.properties[yValue],
            x1: feature.properties[yValue],
            y0: 0,
            y1: 1,
            line: {color: 'purple', dash: 'dashdot', width: 4}
        }]
    } as Partial<Layout>

    return [[hist], layoutUpdate]
}
