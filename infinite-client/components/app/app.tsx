import React from "react";

import { InfiniteCanvas } from "../infiniteCanvas/infiniteCanvas";
import { NoMoreOptionsText } from "../noMoreOptionsText/noMoreOptionsText";
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
    if(appState.mode === AppMode.Infinite) {
      return (
        <>
          <WindowEffect level={9} duration={1000} />
          <InfiniteCanvas />
          <NoMoreOptionsText />
          <button type="button" id="reset-mode-button" className="rubik-font" onClick={setModeToNormal}>Reset</button>
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
        <div id="infinite-app-links">
          <a href="https://www.youtube.com/c/Hyperplexed" target="_blank"><i className="fa-brands fa-youtube" /></a>
          <a href="https://codepen.io/Hyperplexed" target="_blank"><i className="fa-brands fa-codepen" /></a>
          <a href="https://twitter.com/Hyperplexed" target="_blank"><i className="fa-brands fa-twitter" /></a>
        </div>
        {getAppContent()}
      </div>
    </AppContext.Provider>
  );
}