import React from "react";

import { CanvasUtility } from "./utilities/canvasUtility";
import { ReticleUtility } from "./utilities/reticleUtility";
import { WindowUtility } from "./utilities/windowUtility";

import { ICanvasContextMenuWindow } from "./models/canvasContextMenuWindow";
import { ICoordinate } from "./models/coordinate";

export const InfiniteCanvas: React.FC = () => {
  const ref = React.useRef<HTMLCanvasElement>(null),
    imageRef = React.useRef<HTMLImageElement>(null);

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

      let index: number = 0,
        windows: ICanvasContextMenuWindow[] = [WindowUtility.create(context, index++)];
        
      const generate = (): void => {
        setTimeout(() => {
          if(windows.length < 100) {
            windows.push(WindowUtility.create(context, index++));
          }
  
          window.requestAnimationFrame(generate); 
        }, 600);
      }

      const draw = (): void => {   
        CanvasUtility.drawCanvas(context);

        windows = WindowUtility.filterOutDestroyed(windows, clickAt);

        WindowUtility.drawAll(context, imageRef.current, windows, clickAt, mouse);

        ReticleUtility.draw(context, mouse, clickAt);

        window.requestAnimationFrame(draw);
      }

      draw();

      generate();

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

      window.addEventListener("resize", handleOnResize);

      ref.current.addEventListener("mousedown", handleOnClick);

      return () => {
        window.removeEventListener("resize", handleOnResize);
      }
    }
  }, []);

  return (
    <canvas ref={ref} id="infinite-canvas">
      <img ref={imageRef} src="/img/infinite-menu-options.png" height="100" width="100" />
    </canvas>
  );
}