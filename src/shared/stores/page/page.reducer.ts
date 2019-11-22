import { Action } from "redux";

import { REDUX } from "@app/constants";
import * as ActionType from "./page.types";
import { PageModel } from "@app/api";

export interface IPageState {
  pages: PageModel[];
  currentPage: PageModel | undefined;
}

const INITIAL_STATE: IPageState = {
  currentPage: undefined,
  pages: []
};

export const pageReducer = (state: IPageState = INITIAL_STATE, action: Action): IPageState => {
  switch (action.type) {
    case REDUX.PAGE.SET_PAGES: {
      const { pages } = <ActionType.IPages>action;

      return { ...state, pages };
    }
    case REDUX.PAGE.SET_CURRENT_PAGE: {
      const { page } = <ActionType.IPage>action;

      return { ...state, currentPage: page };
    }
    case REDUX.PAGE.ADD_TO_PAGES: {
      const { page } = <ActionType.IPage>action;
      const pages = addToPages(state.pages, page);

      return { ...state, pages };
    }
    default: {
      return state;
    }
  }
};

export const addToPages = (pages: PageModel[], page: PageModel): PageModel[] => {
  const newPages = [...pages];
  newPages.map(item => (item.id === page.id ? page : item));
  newPages.push(page);

  return [...Array.from(new Set(newPages))];
};
