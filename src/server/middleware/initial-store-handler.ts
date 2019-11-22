import * as express from "express";
import { pageActions } from "@app/stores";
import { PageApi } from "@app/api";
import FatalError from "@app/errors/fatal-error";
import MobileDetect from "mobile-detect";
import { settingsActions } from "@app/stores/settings";

export const moduleFetcher: any = () => async (
  req: express.Request & { store: any },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (req.url.indexOf("favicon") > 0) {
      return next();
    }

    const api = new PageApi();

    const response = await api
      .pageRouteGet("https://localhost:3000/" + req.url)
      .then(response => response.json())
      .catch((error: any) => {
        // new FatalError(error.name, error.message, error.stack);
      });

    //res.locals.store.dispatch(pageActions.setCurrentPage({ page: response }));
  } catch (error) {
    // new FatalError(error.name, error.message, error.stack);
  }

  next();
};
