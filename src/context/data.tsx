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
  inventoryCount: Count;
  synced: boolean;
  filterValues: FilterValues;
  setFilterValues: (value: FilterValues) => void;
  inventoryStats: InventoryDataStats | null;
  activeVariable: string;
  setActiveVariable: (value: string) => void;
}

// initial empty state
const initialState: DataState = {
  allInventory: null,
  filteredInventory: null,
  inventoryCount: { total: 0, filtered: 0 },
  synced: false,
  filterValues: {
    radius: { lower: 4, upper: 50 },
    height: { lower: 3, upper: 43 },
  },
  setFilterValues: (value: FilterValues) => {},
  inventoryStats: null,
  activeVariable: "height",
  setActiveVariable: (value: string) => {},
};

// build the context
const DataContext = createContext(initialState);

export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // create internal state of the provider
  const [allInventory, setAllInventory] = useState<InventoryData>();
  const [filteredInventory, setFilteredInventory] = useState<InventoryData>();
  const [inventoryStats, setInventoryStats] = useState<InventoryDataStats>();
  const [inventoryCount, setInventoryCount] = useState<Count>(
    initialState.inventoryCount
  );
  const [activeVariable, setActiveVariable] = useState<string>("height");

  // create state for synchronization
  const [synced, setSynced] = useState<boolean>(false);
  //TODO: Use real values instread.
  const [filterValues, setFilterValues] = useState<FilterValues>({
    radius: { lower: 4, upper: 50 },
    height: { lower: 3, upper: 43 },
  });

  // use the offline context
  const { inventory } = useOffline();

  // copy over inventory data
  useEffect(() => {
    if (inventory) {
      setAllInventory(inventory);
      setInventoryStats({
        data: {
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

  // use the offline context

  // copy over inventory data
  // useEffect(() => {
  //   if (inventory) {
  //     setAllInventory(inventory);
  //     setInventoryCount({
  //       total: inventory.features.length,
  //       filtered: inventory.features.length,
  //     });
  //   } else {
  //     setAllInventory(undefined);
  //     setInventoryCount({ total: 0, filtered: 0 });
  //   }
  // }, [inventory]);

  // re-filter inventory when allInventory changes
  //   useEffect(() => {
  //       if (allInventory) {
  //           // TODO build the filter here
  //           const inv = {
  //               type: 'FeatureCollection',
  //               bbox: allInventory?.bbox,  // TODO after filter, update this
  //               features: [...cloneDeep(allInventory.features.filter(f => true))]
  //           } as InventoryData

  //           // set States
  //           setFilteredInventory(inv)
  //           setInventoryCount({total: allInventory.features.length, filtered: inv.features.length})
  //           setSynced(true)
  //       } else {
  //           setFilteredInventory(undefined)
  //           setInventoryCount({total: 0, filtered: 0})
  //       }
  //   }, [allInventory])

  //   // create the final value
  //   const value = {
  //       allInventory: allInventory || null,
  //       filteredInventory: filteredInventory || null,
  //       inventoryCount,
  //       synced
  //   }
  // }, [inventory]);

  // re-filter inventory when allInventory changes
  useEffect(() => {
    if (allInventory) {
      //      console.log("allInventory:", allInventory);
      //      console.log("filterValues:", filterValues);

      // TODO build the filter here
      const inv = {
        type: "FeatureCollection",
        features: [
          ...cloneDeep(
            allInventory.features.filter(
              (f) =>
                f.properties.radius > filterValues.radius.lower / 100 &&
                f.properties.radius < filterValues.radius.upper / 100 &&
                f.properties.height > filterValues.height.lower &&
                f.properties.height < filterValues.height.upper
            )
          ),
        ],
      } as InventoryData;

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
  }, [allInventory, filterValues]);

  // create the final value
  const value = {
    allInventory: allInventory || null,
    filteredInventory: filteredInventory || null,
    inventoryCount,
    synced,
    filterValues: filterValues,
    setFilterValues: setFilterValues,
    inventoryStats: inventoryStats || null,
    activeVariable: activeVariable,
    setActiveVariable: setActiveVariable,
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
