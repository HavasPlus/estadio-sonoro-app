import { REDUX } from "@app/constants";

import * as ActionType from "./settings.types";

const setSettings = (payload: ActionType.ISettings) => ({
  type: REDUX.SETTINGS.SET_SETTINGS,
  ...payload
});

export const settingsActions = {
  setSettings
};
