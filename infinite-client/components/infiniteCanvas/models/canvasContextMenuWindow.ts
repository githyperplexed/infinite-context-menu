import { ICoordinate } from "./coordinate";

export interface ICanvasContextMenuWindow {
  id: string;
  coordinate: ICoordinate;
  speed: ICoordinate;
  destroyedAt: number;
}