import { REDUX } from "@app/constants/redux";
import { Action } from "redux";
import * as ActionType from "./settings.types";
import { string } from "prop-types";

export interface ISettingsState {
  backingtrack: string;
  countRecords: number;
  crowdRecord: string;
  foundRecord: string;
  name: string;
  token: string;
}

const INITIAL_STATE: ISettingsState = {
  countRecords: 0,
  name: "",
  token: "",
  foundRecord: "",
  backingtrack: "",
  crowdRecord: ""
};

export const settingsReducer = (state: ISettingsState = INITIAL_STATE, action: Action): ISettingsState => {
  switch (action.type) {
    case REDUX.SETTINGS.SET_SETTINGS: {
      const { countRecords, name, foundRecord, token , backingtrack, crowdRecord} = <ActionType.ISettings>action;

      return { ...state, countRecords, foundRecord, name, token, backingtrack, crowdRecord };
    }
    default: {
      return state;
    }
  }
};
