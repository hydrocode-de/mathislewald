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

import { useOffline } from "./offline";
import { InventoryData } from "./data.model";

interface FilterValues {
  radius: { lower: number; upper: number };
}
// model for
interface InventoryDataStats {
  data:
    | {
        totalTrees: number;
        radiusMax: number;
        radiusMin: number;
      }
    | undefined;
}

// model the data types
interface DataState {
  allInventory: InventoryData | null;
  filteredInventory: InventoryData | null;
  synced: boolean;
  filterValues: FilterValues;
  setFilterValues: (value: FilterValues) => void;
  inventoryStats: InventoryDataStats | null;
}

// initial empty state
const initialState: DataState = {
  allInventory: null,
  filteredInventory: null,
  synced: false,
  filterValues: { radius: { lower: 10, upper: 90 } },
  setFilterValues: (value: FilterValues) => {},
  inventoryStats: null,
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

  // create state for synchronization
  const [synced, setSynced] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    radius: { lower: 10, upper: 90 },
  });

  // use the offline context
  const { inventory } = useOffline();

  // copy over inventory data
  useEffect(() => {
    if (inventory) {
      setAllInventory(inventory);
      setInventoryStats({
        data: {
          totalTrees: inventory.features.length,
          radiusMax: Math.max(
            ...inventory.features.map((f) => f.properties.radius)
          ),
          radiusMin: Math.min(
            ...inventory.features.map((f) => f.properties.radius)
          ),
        },
      });
    } else {
      setAllInventory(undefined);
    }
  }, [inventory]);

  // re-filter inventory when allInventory changes
  useEffect(() => {
    if (allInventory) {
      console.log("allInventory:", allInventory);
      console.log("filterValues:", filterValues);
      // TODO build the filter here
      const inv = {
        type: "FeatureCollection",
        bbox: allInventory?.bbox, // TODO after filter, update this
        features: [
          ...cloneDeep(
            allInventory.features.filter(
              (f) =>
                f.properties.radius > filterValues.radius.lower / 100 &&
                f.properties.radius < filterValues.radius.upper / 100
            )
          ),
        ],
      } as InventoryData;
      setFilteredInventory(inv);
      setSynced(true);
    } else {
      setFilteredInventory(undefined);
    }
    console.log("filteredInventory:", filteredInventory);
  }, [allInventory, filterValues]);

  // create the final value
  const value = {
    allInventory: allInventory || null,
    filteredInventory: filteredInventory || null,
    synced,
    filterValues: filterValues,
    setFilterValues: setFilterValues,
    inventoryStats: inventoryStats || null,
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
