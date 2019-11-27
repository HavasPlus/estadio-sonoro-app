import { REDUX } from "@app/constants";

import * as ActionType from "./page.types";

const setPages = (payload: ActionType.IPages) => ({
  type: REDUX.PAGE.SET_PAGES,
  ...payload
});

const setCurrentPage = (payload: ActionType.IPage) => ({
  type: REDUX.PAGE.SET_CURRENT_PAGE,
  ...payload
});

const addToPages = (payload: ActionType.IPage) => ({
  type: REDUX.PAGE.ADD_TO_PAGES,
  ...payload
});

export const pageActions = {
  addToPages,
  setCurrentPage,
  setPages
};
