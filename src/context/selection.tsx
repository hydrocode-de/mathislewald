import bbox from "@turf/bbox";
import cloneDeep from "lodash.clonedeep";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
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
    addToActiveSelection: (treeId: number | string) => Promise<void>
    removeFromActiveSelection: (treeID: number | string) => Promise<void>
}

const initialState: SelectionState = {
    selections: [],
    activeSelection: null,
    setActiveSelection: (selectionId: string | null) => {},
    addToActiveSelection: (treeId: number | string) => Promise.reject('Not implemented.'),
    removeFromActiveSelection: (treeID: number | string) => Promise.reject('Not implemented.'),
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

    const {selections: offlineSelections, createSelection, updateSelection} = useOffline()

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

    const addToActiveSelection = async (treeId: number | string): Promise<void> => {
        // skip if the treeId is already selection
        if (activeSelection && activeSelection.selection.treeIds.includes(Number(treeId))) {
            return Promise.reject(`The tree ID=${treeId} is already part of the current selection`)
        }
        // get the selection representation from the current data or create a new one
        let selection: InventorySelection;
        if (!activeSelection) {
            // create a new selection
            selection = await createSelection([Number(treeId)], `New Selection ${selections.length}`)
        } else {
            // update
            activeSelection.selection.treeIds.push(Number(treeId))
            selection = await updateSelection(activeSelection.selection)            
        }

        // build the geojson
        const newActiveSelection = getSelectionWithGeoJSON(selection)
        setActiveSelectionState(newActiveSelection)

        // set the selection active if it was not
        if (activeSelectionId !== selection.id) {
            setActiveSelectionId(selection.id)
        }
    }

    const removeFromActiveSelection = async (treeId: number | string): Promise<void> => {
        // skip if the treeId is not in selection
        if (activeSelection && !activeSelection.selection.treeIds.includes(Number(treeId))) {
            return Promise.reject(`Tree ID=${treeId} is not in the active selection.`)
        }

        // remove the treeId
        const newTreeIds = activeSelection?.selection.treeIds.filter(id => id !== treeId) || []

        // update the selection
        const selection = await updateSelection({...activeSelection!.selection, treeIds: newTreeIds})

        // build the geoJSON
        const newActiveSelection = getSelectionWithGeoJSON(selection)
        setActiveSelectionState(newActiveSelection)

        // set the selection as the new active selection
        if (activeSelectionId !== selection.id) {
            setActiveSelectionId(selection.id)
        }
    }

    const getSelectionWithGeoJSON = useCallback((selection: InventorySelection): ActiveSelection => {
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
    }, [inventory])

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
    }, [activeSelectionId, inventory, selections, getSelectionWithGeoJSON])


    // create the context value
    const value = {
        selections,
        activeSelection,
        setActiveSelection,
        addToActiveSelection,
        removeFromActiveSelection
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


