import { IContextMenuSection } from "./contextMenuSection";

export interface IContextMenuAction {
  id: string;
  className?: string;
  label: string;
  icon: string;
  sections?: IContextMenuSection[];
  onClick?: () => void;
}