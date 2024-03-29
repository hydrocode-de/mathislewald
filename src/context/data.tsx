/**
 * Data context
 *
 * This context loads the data into the application.
 * In the final version, it will synchronize the data to localstorage and
 * then load from the localstorage to this context.
 *
 * The application will only subscribe to this context in order to implement
 * future changes to the data model
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import bbox from "@turf/bbox";

import { useOffline } from "./offline";
import { InventoryData } from "./data.model";

export type SORTING = "ascending" | "descending" | "none";

interface FilterValues {
  radius: { lower: number; upper: number };
  height: { lower: number; upper: number };
}
// model for
interface InventoryDataStats {
  data:
    | {
        radiusMax: number;
        radiusMin: number;
        heightMax: number;
        heightMin: number;
      }
    | undefined;
}

interface Count {
  total: number;
  filtered: number;
}

// model the data types
interface DataState {
  allInventory: InventoryData | null;
  filteredInventory: InventoryData | null;
  selectedInventoryTreeID: string | null;
  setSelectedInventoryTreeIDHandler: (treeID: string) => void;
  inventoryCount: Count;
  synced: boolean;
  filterValues: FilterValues | undefined;
  setFilterValues: (value: FilterValues) => void;
  inventoryStats: InventoryDataStats | null;
  activeVariable: string;
  sortDirection: SORTING;
  setActiveVarialbeHandler: (value: string) => void;
  setSortDirection: (value: SORTING) => void;
}

// initial empty state
const initialState: DataState = {
  allInventory: null,
  filteredInventory: null,
  selectedInventoryTreeID: null,
  setSelectedInventoryTreeIDHandler: (treeID: string) => {},
  inventoryCount: { total: 0, filtered: 0 },
  synced: false,
  filterValues: undefined,
  setFilterValues: (value: FilterValues) => {},
  inventoryStats: null,
  activeVariable: "height",
  sortDirection: "none",
  setActiveVarialbeHandler: (value: string) => {},
  setSortDirection: (value: SORTING) => {},
};

// build the context
const DataContext = createContext(initialState);

export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // create internal state of the provider
  const [allInventory, setAllInventory] = useState<InventoryData>();
  const [filteredInventory, setFilteredInventory] = useState<InventoryData>();
  const [selectedInventoryTreeID, setSelectedInventoryTreeID] = useState<
    string | null
  >(null);
  const [inventoryStats, setInventoryStats] = useState<InventoryDataStats>();
  const [inventoryCount, setInventoryCount] = useState<Count>(
    initialState.inventoryCount
  );

  // active variable and sorting
  const [activeVariable, setActiveVariable] = useState<string>("height");
  const [sortDirection, setSortDirectionState] = useState<SORTING>("none");

  const setActiveVarialbeHandler = (value: string) => {
    setActiveVariable(value);
  };

  const setSelectedInventoryTreeIDHandler = (treeID: string) => {
    setSelectedInventoryTreeID(treeID);
  };

  // create state for synchronization
  const [synced, setSynced] = useState<boolean>(false);

  //TODO: Use real values instread.
  const [filterValues, setCurrentFilterValues] = useState<
    FilterValues | undefined
  >(undefined);

  // use the offline context
  const { inventory } = useOffline();

  // define the setFilterValues function
  const setFilterValues = (newValues: FilterValues) => {
    setCurrentFilterValues({
      height: { ...newValues.height },
      radius: { ...newValues.radius },
    });
  };

  // define the setSortDirection function
  const setSortDirection = (newDirection: SORTING) => {
    setSortDirectionState(newDirection);
  };

  // copy over inventory data
  useEffect(() => {
    if (inventory) {
      // console.log("runnning effect");

      // copy inventory over
      setAllInventory(inventory);

      // calculate the stats for variables
      const currentStats = {
        radiusMax: Math.max(
          ...inventory.features.map((f) => f.properties.radius)
        ),
        radiusMin: Math.min(
          ...inventory.features.map((f) => f.properties.radius)
        ),
        heightMax: Math.max(
          ...inventory.features.map((f) => f.properties.height)
        ),
        heightMin: Math.min(
          ...inventory.features.map((f) => f.properties.height)
        ),
      };
      setInventoryStats({
        data: { ...currentStats },
      });

      // set the filter to the current min/max as the dataset changed
      setCurrentFilterValues({
        radius: {
          lower: currentStats.radiusMin,
          upper: currentStats.radiusMax,
        },
        height: {
          lower: currentStats.heightMin,
          upper: currentStats.heightMax,
        },
      });

      setInventoryCount({
        total: inventory.features.length,
        filtered: inventory.features.length,
      });
    } else {
      setAllInventory(undefined);
      setInventoryCount({ total: 0, filtered: 0 });
    }
  }, [inventory]);

  // re-filter inventory when allInventory changes, activeVariable or sorting changes
  useEffect(() => {
    if (allInventory && !!filterValues) {
      //      console.log("allInventory:", allInventory);
      // console.log("filterValues:", filterValues);

      // TODO build the filter here
      const inv = {
        type: "FeatureCollection",
        features: [
          ...cloneDeep(
            allInventory.features.filter(
              (f) =>
                f.properties.radius > filterValues.radius.lower &&
                f.properties.radius < filterValues.radius.upper &&
                f.properties.height > filterValues.height.lower &&
                f.properties.height < filterValues.height.upper
            )
          ),
        ],
      } as InventoryData;

      // apply sorting, sort in place
      if (sortDirection === "ascending") {
        inv.features.sort((a, b) => a.properties[activeVariable] - b.properties[activeVariable]);
      } 
      else if (sortDirection === "descending") {
        inv.features.sort((a, b) => b.properties[activeVariable] - a.properties[activeVariable]);
      }
      else {
        // sort by id ascending
        inv.features.sort((a, b) => a.properties.treeid - b.properties.treeid);
      }


      // update the bounding box
      inv.bbox = bbox(inv);
      setFilteredInventory(inv);

      // set the counts as state for performance reasons
      setInventoryCount({
        total: allInventory.features.length,
        filtered: inv.features.length,
      });
      setSynced(true);
    } else {
      setFilteredInventory(undefined);
      setInventoryCount({ total: 0, filtered: 0 });
    }
    //    console.log("filteredInventory:", filteredInventory);
  }, [allInventory, filterValues, activeVariable, sortDirection]);


  // create the final value
  const value = {
    allInventory: allInventory || null,
    filteredInventory: filteredInventory || null,
    selectedInventoryTreeID: selectedInventoryTreeID || null,
    setSelectedInventoryTreeIDHandler,
    inventoryCount,
    synced,
    filterValues,
    setFilterValues,
    inventoryStats: inventoryStats || null,
    activeVariable,
    sortDirection,
    setActiveVarialbeHandler,
    setSortDirection
  };

  return (
    <>
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
    </>
  );
};

// create a hook for easier data access
export const useData = () => {
  return useContext(DataContext);
};
