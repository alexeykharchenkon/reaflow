import { createContext, useContext } from "react";
import { DataStore } from "./dataStore";

interface RootStore {
    dataStore: DataStore;
}

const dataStore = new DataStore();

export const rootStore: RootStore = {
    dataStore,
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}