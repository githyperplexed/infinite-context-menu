import { IContextMenuAction } from "./contextMenuAction";

export interface IContextMenuSection {
  id: string;
  actions: IContextMenuAction[];
}