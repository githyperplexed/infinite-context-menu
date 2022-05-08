import React from "react";
import classNames from "classnames";

import { IContextMenuAction } from "../../models/contextMenuAction";

interface IContextMenuActionProps extends IContextMenuAction {
  effect?: JSX.Element;
}

export const ContextMenuAction: React.FC<IContextMenuActionProps> = (props: IContextMenuActionProps) => {
  return (
    <button type="button" className={classNames("context-menu-action", props.className)} onClick={props.onClick}>
      <i className={props.icon} />
      <span className="label rubik-font">{props.label}</span>
      {props.effect || null}
    </button>
  );
}