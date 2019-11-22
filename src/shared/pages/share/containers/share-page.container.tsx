import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";

import { IAppState } from "@app/stores";

import { settingsActions, ISettings } from "@app/stores/settings";
import { ISharePageComponentProps, SharePageComponent } from "../components";
import { RouteComponentProps } from "react-router";

interface IStateProps {
  countRecords?: number;
  token?: string;
}
interface IDispatchProps {
  setSettings: (settings: ISettings) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, ISharePageComponentProps, IAppState> = state => {
  const { token, countRecords, foundRecord, name,  } = state.settings;

  return { token, countRecords, foundRecord, name,  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, ISharePageComponentProps> = dispatch => ({
  setSettings: (settings: ISettings) => dispatch(settingsActions.setSettings(settings))
});

export type ISharePageContainerProps = IStateProps & IDispatchProps & RouteComponentProps;
export const SharePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SharePageComponent);
