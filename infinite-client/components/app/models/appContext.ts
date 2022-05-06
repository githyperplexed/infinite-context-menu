import { AppMode } from "../../../enums/appMode";

export interface IAppContext {
  mode: AppMode;
  setModeToInfinite: () => void;
  setModeToNormal: () => void;
}