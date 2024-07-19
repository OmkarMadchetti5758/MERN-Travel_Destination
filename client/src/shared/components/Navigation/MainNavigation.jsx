import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";

import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import "./MainNavigation.css";

export default function MainNavigation(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  function openDrawer() {
    setDrawerIsOpen(true);
  }
  function closeDrawer() {
    setDrawerIsOpen(false);
  }
  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
        <nav className="main-drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="cursor-pointer w-12 h-12 bg-transparent border-none flex flex-col justify-around md:hidden">
          <MenuSharpIcon
            style={{ color: "white", fontWeight: "bold", fontSize: 30 }}
            onClick={openDrawer}
          />
        </button>
        <h1 className="text-white">
          <Link
            to="/"
            className="no-underline font-bold text-2xl text-amber-500"
          >
            Travel Destination's
          </Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
}
