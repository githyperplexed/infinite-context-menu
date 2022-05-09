import { CanvasUtility } from "./canvasUtility";

import { ICanvasContextMenuWindow } from "../models/canvasContextMenuWindow";
import { ICoordinate } from "../models/coordinate";
import { ISize } from "../models/size";

import { CanvasContextMenuWindowSize } from "../enums/canvasContextMenuWindowSize";

interface IWindowUtility {
  create: (context: CanvasRenderingContext2D, index: number) => ICanvasContextMenuWindow;
  determineSpeed: (context: CanvasRenderingContext2D, coordinate: ICoordinate, height: number, width: number, speed: ICoordinate) => ICoordinate;  
  drawImage: (context: CanvasRenderingContext2D, img: HTMLImageElement, w: ICanvasContextMenuWindow, clickAt: number, mouse: ICoordinate) => void;    
  drawAll: (context: CanvasRenderingContext2D, img: HTMLImageElement, windows: ICanvasContextMenuWindow[], clickAt: number, mouse: ICoordinate) => void;    
  filterOutDestroyed: (windows: ICanvasContextMenuWindow[], clickAt: number) => ICanvasContextMenuWindow[];  
  isClickInWindow: (start: ICoordinate, size: ISize, mouse: ICoordinate) => boolean;
}

export const WindowUtility: IWindowUtility = {
  create: (context: CanvasRenderingContext2D, index: number): ICanvasContextMenuWindow => {    
    const speed: ICoordinate = {
      x: index % 2 === 0 ? 1 : -1,
      y: index % 2 === 0 ? 1 : -1
    }

    const origin: ICoordinate = {
      x: context.canvas.width / 2, 
      y: index % 2 === 0 ? CanvasContextMenuWindowSize.Height * -1 : context.canvas.height + CanvasContextMenuWindowSize.Height
    }

    return {
      id: Math.random().toString(),
      coordinate: { ...origin },
      speed: { ...speed },
      destroyedAt: null
    };
  },
  determineSpeed: (context: CanvasRenderingContext2D, coordinate: ICoordinate, height: number, width: number, speed: ICoordinate): ICoordinate => {    
    const updated: ICoordinate = { ...speed };

    if(updated.x > 0 && coordinate.x + (width / 2) >= context.canvas.width) {
      updated.x = speed.x * -1;
    } else if (updated.x < 0 && coordinate.x - (width / 2) <= 0) {
      updated.x = speed.x * -1;
    }

    if(updated.y > 0 && coordinate.y + (height / 2) >= context.canvas.height) {
      updated.y = speed.y * -1;
    } else if(updated.y < 0 && coordinate.y - (height / 2) <= 0) {
      updated.y = speed.y * -1;
    }

    return updated;
  },
  drawImage: (context: CanvasRenderingContext2D, img: HTMLImageElement, w: ICanvasContextMenuWindow, clickAt: number, mouse: ICoordinate): void => {    
    const size: ISize = {
      height: w.destroyedAt ? CanvasUtility.getAnimatedValue(CanvasContextMenuWindowSize.Height, CanvasContextMenuWindowSize.Height * 1.5, 100, w.destroyedAt) : CanvasContextMenuWindowSize.Height,
      width: w.destroyedAt ? CanvasUtility.getAnimatedValue(CanvasContextMenuWindowSize.Width, CanvasContextMenuWindowSize.Width * 1.5, 100, w.destroyedAt) : CanvasContextMenuWindowSize.Width
    }

    w.coordinate.x = w.coordinate.x + w.speed.x;
    w.coordinate.y = w.coordinate.y + w.speed.y;

    w.speed = WindowUtility.determineSpeed(context, w.coordinate, size.height, size.width, w.speed);

    const upperLeft: ICoordinate = {
      x: w.coordinate.x - (size.width / 2), 
      y: w.coordinate.y - (size.height / 2)
    }

    context.shadowBlur = 29;

    context.shadowColor = "rgba(10, 10, 10, 0.5)";

    context.shadowOffsetY = 7;

    if(w.destroyedAt) { 
      context.fillStyle = `rgba(20, 20, 20, ${CanvasUtility.getAnimatedValue(100, 0, 100, w.destroyedAt) / 100})`;
  
      context.fillRect(upperLeft.x, upperLeft.y, size.width, size.height);
    } else {
      context.drawImage(img, upperLeft.x, upperLeft.y, size.width, size.height);
    }

    if(WindowUtility.isClickInWindow(upperLeft, size, mouse)) {      
      const now: number = new Date().getTime();

      if(now - clickAt <= 10 && w.destroyedAt === null) {
        w.destroyedAt = now;
      }
    }
  },
  drawAll: (context: CanvasRenderingContext2D, img: HTMLImageElement, windows: ICanvasContextMenuWindow[], clickAt: number, mouse: ICoordinate): void => {
    for(let w of windows) {
      WindowUtility.drawImage(context, img, w, clickAt, mouse);
    }
  },
  filterOutDestroyed: (windows: ICanvasContextMenuWindow[], clickAt: number): ICanvasContextMenuWindow[] => {
    const now: number = new Date().getTime();

    if(clickAt && now - clickAt < 500) {
      return windows.filter((w: ICanvasContextMenuWindow) => w.destroyedAt === null || now - w.destroyedAt <= 100);
    }

    return windows;
  },
  isClickInWindow: (start: ICoordinate, size: ISize, mouse: ICoordinate): boolean => {
    return (
      mouse.x >= start.x && 
      mouse.x <= start.x + size.width &&
      mouse.y >= start.y &&
      mouse.y <= start.y + size.height
    );
  }
}