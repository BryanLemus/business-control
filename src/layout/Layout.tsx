import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.scss";
import { AppShell } from "@mantine/core";

export const Layout = () => {
  return (
    <AppShell
      navbar={<Sidebar />}
      styles={(theme) => ({
        main: {
          paddingLeft: "var(--mantine-navbar-width)",
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
};
