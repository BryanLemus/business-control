import { ReactNode } from "react";
import "./Drawer.scss";

type Props = {
  children?: ReactNode;
  title?: ReactNode;
  open: boolean;
  onClose: (event: MouseEvent) => void;
};

export const Drawer = ({ children, onClose, title, open }: Props) => {
  return (
    <div className={`Drawer` + `${open ? " Drawer--open" : ""}`}>
      <div
        className="Drawer_overlay"
        onClick={(e) => {
          e.stopPropagation();
          onClose(e.nativeEvent);
        }}
      />
      <div className="Drawer_content">
        <div className="Drawer_header">{title}</div>
        <div className="Drawer_body">{children}</div>
      </div>
    </div>
  );
};
