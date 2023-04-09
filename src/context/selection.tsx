import bbox from "@turf/bbox";
import cloneDeep from "lodash.clonedeep";
import { createContext, useContext, useEffect, useState } from "react";
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
    addToActiveSelection: (treeId: number) => void
}

const initialState: SelectionState = {
    selections: [],
    activeSelection: null,
    setActiveSelection: (selectionId: string | null) => {},
    addToActiveSelection: (treeId: number) => {}
}

// add the context
const SelectionContext = createContext(initialState);


export const SelectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    // create the state
    const [selections, setSelections] = useState<InventorySelection[]>(initialState.selections)
    const [activeSelectionId, setActiveSelectionId] = useState<string | null>(null)
    const [activeSelection, setActiveSelectionState] = useState<ActiveSelection | null>(initialState.activeSelection)

    // get a reference to all inventory data
    const { inventory } = useOffline()

    const {selections: offlineSelections, createSelection} = useOffline()

    // subscribe to changes in offline selections
    useEffect(() => {
        if (offlineSelections) {
            setSelections(offlineSelections)
        } else {
            setSelections([])
        }
    }, [offlineSelections])
    
    // setActiveSelection handler
    const setActiveSelection = (selectionId: string | null) => {
        if (!selectionId) {
            setActiveSelectionId(null)
        } else {
            setActiveSelectionId(selectionId)
        }
    }

    const addToActiveSelection = async (treeId: number) => {
        // get the selection representation from the current data or create a new one
        let selection: InventorySelection;
        if (!activeSelection) {
            selection = await createSelection([], `New Selection ${selections.length}`)
        } else {
            selection = activeSelection.selection
        }

        // add the tree to selection
        selection.treeIds.push(treeId)

        // build the geojson
        const newActiveSelection = getSelectionWithGeoJSON(selection)
        setActiveSelectionState(newActiveSelection)
    }

    const getSelectionWithGeoJSON = (selection: InventorySelection): ActiveSelection => {
        // filter the full inventory for any selected tree
        const features = inventory?.features.filter(f => selection.treeIds.includes(Number(f.properties.treeid))) || []

        // create the geojson
        const data = {
            type: 'FeatureCollection',
            features: cloneDeep(features),
        } as InventoryData

        // add the bounding box
        data.bbox = bbox(data)

        return {selection: cloneDeep(selection), geoJSON: cloneDeep(data)}
    }

    // use effect to update the current active selection, when the activeSelectionId or the filteredInventory changes
    useEffect(() => {
        if (!inventory) return
        if (activeSelectionId) {
            const selection = selections.find(s => s.id === activeSelectionId)
            if (selection) {
                const newActiveSelection = getSelectionWithGeoJSON(selection)
                setActiveSelectionState(newActiveSelection)
            } else {
                setActiveSelectionState(null)
            }
        } else {
            setActiveSelectionState(null)
        }
    }, [activeSelectionId, inventory])


    // create the context value
    const value = {
        selections,
        activeSelection,
        setActiveSelection,
        addToActiveSelection
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


