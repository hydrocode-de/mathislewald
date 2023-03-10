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
import { InventoryData } from "./data.model";
import { useSettings } from "./settings";
import cloneDeep from "lodash.clonedeep";

import * as wfs from "../util/wfs";

// model the data types
interface DataState {
  allInventory: InventoryData | null;
  filteredInventory: InventoryData | null;
  synced: boolean;
  filterQuery: string[] | null;
  addFilterQuery: (query: string) => void;
  closeFilterQuery: (query: string) => void;
}

// initial empty state
const initialState: DataState = {
  allInventory: null,
  filteredInventory: null,
  synced: false,
  filterQuery: null,
  addFilterQuery: (query: string) => {},
  closeFilterQuery: (query: string) => {},
};

// build the context
const DataContext = createContext(initialState);

export const DataProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // create internal state of the provider
  const [allInventory, setAllInventory] = useState<InventoryData>();
  const [filteredInventory, setFilteredInventory] = useState<InventoryData>();

  // create state for synchronization
  const [synced, setSynced] = useState<boolean>(false);

  // create state to add filter queries
  const [filterQuery, setFilterQuery] = useState([] as string[]);

  const addFilterQuery = (query: string) => {
    setFilterQuery([...filterQuery, query]);
  };

  const closeFilterQuery = (query: string) => {
    setFilterQuery(filterQuery.filter((q) => q !== query));
  };

  // use the Settings context
  const { geoserverUrl } = useSettings();

  // create effect to load data
  // TODO: change to sync with offline store
  useEffect(() => {
    // run only if settings loaded
    if (geoserverUrl) {
      // TODO: we do not handle layer names so far
      wfs
        .getInventoryData(geoserverUrl)
        .then((invData) => setAllInventory(invData))
        .catch((error) => console.log(error));
    }
  }, [geoserverUrl]);
  //   useEffect(() => {
  //     console.log("filterQuery:", filterQuery);
  //   });

  // re-filter inventory when allInventory changes
  useEffect(() => {
    if (allInventory) {
      // TODO build the filter here
      console.log("return filterQuery:", filterQuery);
      const inv = {
        type: "FeatureCollection",
        bbox: allInventory?.bbox, // TODO after filter, update this
        features: [...cloneDeep(allInventory.features.filter((f) => true))],
      } as InventoryData;
      setFilteredInventory(inv);
      setSynced(true);
    } else {
      setFilteredInventory(undefined);
    }
  }, [allInventory, filterQuery]);

  // create the final value
  const value = {
    allInventory: allInventory || null,
    filteredInventory: filteredInventory || null,
    synced,
    filterQuery: filterQuery,
    addFilterQuery: addFilterQuery,
    closeFilterQuery: closeFilterQuery,
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
