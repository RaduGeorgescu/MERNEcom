import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({ title = "Title", className, children }) => (
  <div>
    <Menu title={title} />
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
