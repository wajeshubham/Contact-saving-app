import React from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar color="dark" light>
      <NavbarBrand className="text-white" tag={Link} to="/">
        <h3>Contact App</h3>
      </NavbarBrand>
      <NavbarText className="text-white float-right">
        save your contacts
      </NavbarText>
    </Navbar>
  );
};

export default Header;
