import { ContextMenuUtility } from "./contextMenuUtility";
import { InfiniteContextMenuUtility } from "./infiniteContextMenuUtility";

import { IContextMenuSection } from "../models/contextMenuSection";

interface IContextMenuTestUtility {
  getMenuSections: () => IContextMenuSection[];  
}

export const ContextMenuTestUtility: IContextMenuTestUtility = {
  getMenuSections: (): IContextMenuSection[] => {
    const statsSectionsX: IContextMenuSection[] = [
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Photo", "fa-solid fa-camera"),
        ContextMenuUtility.mapAction("Description", "fa-solid fa-align-left")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Stats", "fa-solid fa-chart-line")
      ])
    ];

    const statsSections: IContextMenuSection[] = [
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Photo", "fa-solid fa-camera"),
        ContextMenuUtility.mapAction("Description", "fa-solid fa-align-left")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Stats", "fa-solid fa-chart-line", null, null, statsSectionsX)
      ])
    ];

    const settingsSections: IContextMenuSection[] = [
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Photo", "fa-solid fa-camera"),
        ContextMenuUtility.mapAction("Description", "fa-solid fa-align-left")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Stats", "fa-solid fa-chart-line", null, null, statsSections)
      ])
    ];

    return [
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("New Item", "fa-solid fa-plus"),
        ContextMenuUtility.mapAction("Rename", "fa-solid fa-pen")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Favorite", "fa-solid fa-heart"),
        ContextMenuUtility.mapAction("Dislike", "fa-solid fa-thumbs-down")
      ]),
      ContextMenuUtility.mapSection([
        ContextMenuUtility.mapAction("Settings", "fa-solid fa-gear", null, null, settingsSections),
        ContextMenuUtility.mapAction("Delete", "fa-solid fa-trash")
      ]),
      ContextMenuUtility.mapSection([
        InfiniteContextMenuUtility.getDefaultAction()
      ])
    ]
  }
}