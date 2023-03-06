import { FC, ReactNode } from "react";
import "./Toolbar.scss";

interface Props {
  children: ReactNode;
}

export const Toolbar: FC<Props> = ({ children }) => {
  return <div className="Toolbar">{children}</div>;
};
