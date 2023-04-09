import bbox from "@turf/bbox";
import cloneDeep from "lodash.clonedeep";
import { createContext, useContext, useEffect, useState } from "react";
import { useData } from "./data";
import { InventoryData } from "./data.model";
import { InventorySelection } from "./inventory-selection.model";
import { useOffline } from "./offline";

export interface ActiveSelection {
    selection: InventorySelection,
    geoJSON: InventoryData 
}

interface SelectionState {
    selections: InventorySelection[];
    activeSelection: ActiveSelection | null;
    setActiveSelection: (selectionId: string | null) => void
}

const initialState: SelectionState = {
    selections: [],
    activeSelection: null,
    setActiveSelection: (selectionId: string | null) => {}
}

// add the context
const SelectionContext = createContext(initialState);


export const SelectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create the state
    const [selections, setSelections] = useState<InventorySelection[]>(initialState.selections)
    const [activeSelection, setActiveSelectionState] = useState<ActiveSelection | null>(initialState.activeSelection)

    // get a reference to all inventory data
    const { filteredInventory } = useData()
    const {selections: offlineSelections} = useOffline()

    // subscribe to changes in offline selections
    useEffect(() => {
        if (offlineSelections) {
            setSelections(offlineSelections)
        } else {
            setSelections([])
        }
    }, [offlineSelections])
    
    // define the context functions
    const setActiveSelection = (selectionId: string | null) => {
        if (selectionId === null || !filteredInventory) {
            setActiveSelectionState(null)
        } else {
            const selection = selections.find(s => s.id === selectionId)
            if (selection) {
                // extract the features from the inventory data that match the selection
                const features = filteredInventory.features.filter(f => selection.treeIds.includes(Number(f.properties.treeid)))

                // create the geojson
                const data = {
                    type: 'FeatureCollection',
                    features: cloneDeep(features),
                } as InventoryData

                // add the bounding box
                data.bbox = bbox(data)

                setActiveSelectionState({
                    selection: cloneDeep(selection),
                    geoJSON: cloneDeep(data)
                })
            } else {
                setActiveSelectionState(null)
            }
        }
    }

    // create the context value
    const value = {
        selections,
        activeSelection,
        setActiveSelection
    }

    // return the provider
    return (
        <SelectionContext.Provider value={value}>
            { children }
        </SelectionContext.Provider>
    )
}

// create a context hook for easier access
export const useSelection = () => {
    return useContext(SelectionContext)
}


