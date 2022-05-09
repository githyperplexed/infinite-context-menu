import React from "react";

import { ContextMenu } from "./contextMenu";

import { AppContext } from "../app/app";

import { ContextMenuUtility } from "../../utilities/contextMenuUtility";

import { IContextMenuContext } from "./models/contextMenuContext";
import { IContextMenuSection } from "../../models/contextMenuSection";
import { IDirectionEntry } from "../../models/directionEntry";
import { defaultContextMenuState, IContextMenuState } from "./models/contextMenuState";
import { IPosition } from "../../models/position";

import { AppMode } from "../../enums/appMode";

interface IContextMenuWrapperProps {
  targetRef: React.MutableRefObject<HTMLElement>;
  sections: IContextMenuSection[];
}

export const ContextMenuContext = React.createContext<IContextMenuContext>(null);

export const ContextMenuWrapper: React.FC<IContextMenuWrapperProps> = (props: IContextMenuWrapperProps) => {
  const { mode } = React.useContext(AppContext);

  const [state, setStateTo] = React.useState<IContextMenuState>(defaultContextMenuState(true));

  const setActiveTo = (active: boolean): void => {
    if(mode === AppMode.Normal) {
      setStateTo({ ...state, active });
    }
  }

  const setMenuRefTo = (menuRef: React.MutableRefObject<HTMLElement>): void => {
    setStateTo({ ...state, menuRef });
  }

  const activateMenu = (position: IPosition): void => {
    setStateTo({ ...state, active: true, position });
  }

  const updateDirectionHistory = (directionHistory: IDirectionEntry[], branchID?: string): void => {
    const updated: IContextMenuState = { 
      ...state,
      directionHistory
    };

    if(branchID !== undefined && branchID !== null) {
      updated.branchID = branchID;
    }

    setStateTo(updated);
  }

  const addDirectionHistoryEntry = (entry: IDirectionEntry, branchID?: string): void => {
    if(branchID) {
      updateDirectionHistory([entry], branchID);
    } else {
      updateDirectionHistory([...state.directionHistory, entry]);
    }
  }

  const truncateDirectionHistoryAtEntry = (actionID: string): void => {
    const targetIndex: number = state.directionHistory.findIndex((entry: IDirectionEntry) => entry.actionID === actionID);

    if(targetIndex >= 0) {
      const updatedDirectionHistory: IDirectionEntry[] = [...state.directionHistory].slice(0, targetIndex);

      updateDirectionHistory(updatedDirectionHistory, updateDirectionHistory.length === 0 ? "" : null);
    }
  }

  React.useEffect(() => {
    setStateTo({ ...state, sections: props.sections, targetRef: props.targetRef });
  }, [props.targetRef, props.sections]);

  React.useEffect(() => {
    if(state.targetRef !== null && state.targetRef.current !== null) {
      state.targetRef.current.onclick = (e: any): void => {        
        if(ContextMenuUtility.shouldDectivate(state.menuRef, e)) {
          setStateTo(defaultContextMenuState());
        }
      }

      state.targetRef.current.oncontextmenu = (e: any): void => {
        if(ContextMenuUtility.shouldActivate(state.menuRef, e)) {
          e.preventDefault();

          activateMenu({ left: e.clientX, top: e.clientY });
        }
      }
    }
  }, [state.targetRef, state.menuRef, mode]);

  if(state.active) {
    return (
      <ContextMenuContext.Provider value={{ 
        state, 
        activateMenu, 
        setActiveTo, 
        setMenuRefTo,
        addDirectionHistoryEntry,
        truncateDirectionHistoryAtEntry
      }}>
        <ContextMenu />
      </ContextMenuContext.Provider>
    );
  }

  return null;
}