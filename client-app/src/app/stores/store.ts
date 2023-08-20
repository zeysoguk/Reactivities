import { createContext } from "react";
import ActivityStore from "./activityStore";
import { useContext } from "react";

interface Store  {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store);
 
export function useStore(){
    return useContext(StoreContext);
}