import React from "react";

import { InfiniteCanvas } from "../infiniteCanvas/infiniteCanvas";
import { WindowEffect } from "../windowEffect/windowEffect";

import { ContextMenuWrapper } from "../contextMenu/contextMenuWrapper";

import { ContextMenuTestUtility } from "../../utilities/contextMenuTestUtility";

import { IAppContext } from "./models/appContext";
import { defaultAppState, IAppState } from "./models/appState";

import { AppMode } from "../../enums/appMode";

export const AppContext = React.createContext<IAppContext>(null);

export const App: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [appState, setAppStateTo] = React.useState<IAppState>(defaultAppState());

  const setModeTo = (mode: AppMode): void => {
    setAppStateTo({ ...appState, mode });
  }

  const setModeToInfinite = (): void => setModeTo(AppMode.Infinite),
    setModeToNormal = (): void => setModeTo(AppMode.Normal);

  const getAppContent = (): JSX.Element => {
    if(appState.mode === AppMode.Infinite || true) {
      return (
        <>
          <WindowEffect level={9} duration={1000} />
          <InfiniteCanvas />
          <ContextMenuWrapper targetRef={ref} sections={ContextMenuTestUtility.getMenuSections()} />
        </>
      )
    }

    return (
      <ContextMenuWrapper targetRef={ref} sections={ContextMenuTestUtility.getMenuSections()} />
    )
  }

  return (
    <AppContext.Provider value={{ mode: appState.mode, setModeToInfinite, setModeToNormal }}>
      <div ref={ref} id="infinite-app" className={appState.mode.toLowerCase()}>        
        {getAppContent()}
      </div>
    </AppContext.Provider>
  );
}