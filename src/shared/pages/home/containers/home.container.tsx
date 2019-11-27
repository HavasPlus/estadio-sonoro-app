import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";

import { IAppState } from "@app/stores";

import { settingsActions, ISettings } from "@app/stores/settings";
import { IHomeComponentProps, HomeComponent } from "../components";

interface IStateProps {
  backingtrack: string;
  countRecords: number;
  crowdRecord?: string;
  foundRecord?: string;
  name: string;
  token: string;
}
interface IDispatchProps {
  setSettings: (settings: ISettings) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, IHomeComponentProps, IAppState> = state => {
  const { token, countRecords,foundRecord, name, backingtrack, crowdRecord } = state.settings;

  return { token, countRecords,foundRecord, name, backingtrack, crowdRecord };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IHomeComponentProps> = dispatch => ({
  setSettings: (settings: ISettings) => dispatch(settingsActions.setSettings(settings))
});

export type HomeContainerProps = IStateProps & IDispatchProps;
export const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);
