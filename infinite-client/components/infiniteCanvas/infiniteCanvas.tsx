import React from "react";

import { CanvasUtility } from "./utilities/canvasUtility";
import { ReticleUtility } from "./utilities/reticleUtility";
import { WindowUtility } from "./utilities/windowUtility";

import { ICanvasContextMenuWindow } from "./models/canvasContextMenuWindow";
import { ICoordinate } from "./models/coordinate";
import { ISize } from "./models/size";

export const InfiniteCanvas: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if(ref.current) {
      const context: CanvasRenderingContext2D = ref.current.getContext("2d");

      context.canvas.height = context.canvas.clientHeight;
      context.canvas.width = context.canvas.clientWidth;

      let clickAt: number = null;

      const mouse: ICoordinate = {
        x: context.canvas.width / 2, 
        y: context.canvas.height / 2
      }

      const size: ISize = {
        height: 282,
        width: 320,
        radius: 10
      }
  
      const speed: ICoordinate = {
        x: 1.5,
        y: 1.5
      }

      const origin: ICoordinate = {
        x: context.canvas.width / 2, 
        y: size.height * -1
      }

      const getAWindow = (): ICanvasContextMenuWindow => ({
        id: Math.random().toString(),
        coordinate: { ...origin },
        speed: { ...speed },
        size: { ...size },
        destroyedAt: null
      })

      let windows: ICanvasContextMenuWindow[] = [getAWindow()];

      const interval: NodeJS.Timeout = setInterval(() => {
        if(windows.length < 250) {
          windows.push(getAWindow());
        }
      }, 400);

      const draw = (): void => {   
        CanvasUtility.drawCanvas(context);

        windows = WindowUtility.filterOutDestroyed(windows);

        WindowUtility.drawAll(context, windows, clickAt, mouse);

        ReticleUtility.draw(context, mouse, clickAt);

        window.requestAnimationFrame(draw);
      }

      draw();

      const handleOnMouseMove = (e: any): void => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }
      
      const handleOnResize = (e: any): void => {
        if(windows.length > 0) {
          windows = [];
        }
      }

      const handleOnClick = (e: any): void => {
        clickAt = new Date().getTime();
      }
      
      ref.current.addEventListener("mousemove", handleOnMouseMove);

      ref.current.addEventListener("resize", handleOnResize);

      ref.current.addEventListener("mousedown", handleOnClick);

      return () => {
        clearInterval(interval);

        ref.current.removeEventListener("mousemove", handleOnMouseMove);
        
        ref.current.removeEventListener("resize", handleOnResize);

        ref.current.removeEventListener("mousedown", handleOnClick);
      }
    }
  }, []);

  return (
    <canvas ref={ref} id="infinite-canvas" />
  );
}