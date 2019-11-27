import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";

import { IAppState } from "@app/stores";

import { settingsActions, ISettings } from "@app/stores/settings";
import { ISuccessComponentProps, SuccessComponent } from "../components";
import { RouteComponentProps } from "react-router";

interface IStateProps {
  countRecords?: number;
  token?: string;
}
interface IDispatchProps {
  // setSettings: (settings: ISettings) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, ISuccessComponentProps, IAppState> = state => {
  const { countRecords, token } = state.settings;

  return { countRecords, token };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, ISuccessComponentProps> = dispatch => ({
  // setSettings: (settings: ISettings) => dispatch(settingsActions.setSettings(settings))
});

export type ISuccessContainerProps = IStateProps & IDispatchProps & RouteComponentProps;
export const SuccessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessComponent);
