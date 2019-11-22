import * as express from "express";
import { configureStore, getInitialState } from "@app/stores";

import createHistory from "@app/stores/history";

export const addStore = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction | undefined
): Promise<void> => {
  const history = createHistory({ initialEntries: [req.url] });

  res.locals.store = configureStore({ history, initialState: getInitialState() });

  if (typeof next !== "function") {
    throw new Error("Next handler is missing");
  }
  next();
};
