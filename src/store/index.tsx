import React, {
  useReducer,
  useContext,
  createContext,
  FC,
  Reducer,
} from "react";
import { LatLng } from "react-native-maps";

const SETCOORDS = "SETCOORDS";
const SETACTIVE = "SETACTIVE";
interface ActionType {
  type: "SETCOORDS" | "SETACTIVE";
  payload: LatLng | boolean;
}

interface LocData {
  coord: LatLng;
  inside: boolean;
  active: boolean;
}

const LocContext = createContext<LocData>({
  coord: { longitude: -121.91425323486327, latitude: 37.673104213661375 },
  active: true,
  inside: true,
});
// @ts-ignore
const LocDispatchContext = createContext<React.Dispatch<ActionType> | null>();

const reducer = (state: LocData, action: ActionType): LocData => {
  switch (action.type) {
    case SETCOORDS:
      return { ...state, coord: action.payload as LatLng };
    case SETACTIVE:
      return { ...state, active: action.payload as boolean };
    default:
      return state;
  }
};

const LocProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: LocData, action: ActionType) => LocData
  >(reducer, {
    coord: { longitude: -121.91425323486327, latitude: 37.673104213661375 },
    active: true,
    inside: true,
  });
  return (
    <LocContext.Provider value={state}>
      <LocDispatchContext.Provider value={dispatch}>
        {children}
      </LocDispatchContext.Provider>
    </LocContext.Provider>
  );
};

const useLocDispatch = () => useContext(LocDispatchContext);
const useLocState = () => useContext(LocContext);

export {
  LocProvider,
  useLocDispatch,
  useLocState,
  LocDispatchContext,
  LocContext,
  SETCOORDS,
  SETACTIVE,
};
