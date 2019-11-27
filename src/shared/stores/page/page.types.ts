import { PageModel } from "@app/api";

interface IAction {
  type?: string;
}

export interface IPages extends IAction {
  pages: PageModel[];
}

export interface IPage extends IAction {
  page: PageModel;
}
