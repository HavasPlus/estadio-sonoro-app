/// <reference path="./../../../types/index.d.ts" />

import { createStore, compose } from "redux";
import { History } from "history";
import { combineReducers } from "redux";

import { ISettingsState, settingsReducer } from "./settings";

type StoreParams = {
  history: History;
  initialState: IAppState;
  middleware?: any[];
};

export interface IAppState {
  settings: ISettingsState;
}

export const getInitialState = () => {
  const initialState = <IAppState>{};
  return initialState;
};

declare let window: ExtendedWindow;
export const configureStore = ({ initialState }: StoreParams) => {
  const devtools =
    process.env.NODE_ENV === "development" &&
    typeof window !== "undefined" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });


  const store = createStore<IAppState>(
    combineReducers({
      settings: settingsReducer
    }),
    initialState
  );

  // if (process.env.NODE_ENV !== "production") {
  //   if (module.hot) {
  //     module.hot.accept("./rootReducer", () => store.replaceReducer(require("./rootReducer").default));
  //   }
  // }

  return store;
};

export default configureStore;
