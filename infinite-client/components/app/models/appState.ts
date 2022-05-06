import { AppMode } from "../../../enums/appMode"

export interface IAppState {
  mode: AppMode;
}

export const defaultAppState = (): IAppState => ({
  mode: AppMode.Normal
})