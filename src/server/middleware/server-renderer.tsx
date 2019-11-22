import * as React from "react";
import * as express from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Html from "../components/html";
import { Routes } from "@app/routes";

const serverRenderer: any = () => (req: express.Request & { store: any }, res: express.Response) => {
  const content = renderToString(
    <Provider store={res.locals.store}>
      <Router location={req.url} context={{}}>
        <React.Fragment>
          <Routes />
        </React.Fragment>
      </Router>
    </Provider>
  );

  const state = JSON.stringify(res.locals.store.getState());
  // const state = JSON.stringify({});

  return res.send(
    "<!doctype html>" +
      renderToString(
        <Html
          css={[res.locals.assetPath("bundle.css"), res.locals.assetPath("vendor.css")]}
          scripts={[res.locals.assetPath("bundle.js"), res.locals.assetPath("vendor.js")]}
          state={state}
        >
          {content}
        </Html>
      )
  );
};

export default serverRenderer;
