import bbox from "@turf/bbox";
import cloneDeep from "lodash.clonedeep";
import { createContext, useContext, useState } from "react";
import { useData } from "./data";
import { InventoryData } from "./data.model";
import { InventorySelection } from "./inventory-selection.model";

interface SelectionState {
    selections: InventorySelection[];
    activeSelection: InventoryData | null;
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
    const [activeSelection, setActiveSelectionState] = useState<InventoryData | null>(initialState.activeSelection)

    // get a reference to all inventory data
    const { filteredInventory } = useData()
    
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

                setActiveSelectionState(data)
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


