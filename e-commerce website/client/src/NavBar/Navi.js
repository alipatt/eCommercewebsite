import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  //NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import NaviCart from "./NaviCart";
import { Link } from "react-router-dom";
import "../Cssfile/Nav.css";
const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <Link id="RouterNavLink" to="/landing" className="px-2">
          <h3>GPP</h3>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink onClick={props.help} >Help</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/alipatt">GitHub</NavLink>
            </NavItem>
            <NaviCart
              cart={props.cart}
              total={props.total}
              getProducts={props.getProducts}
              AddToCart={props.AddToCart}
              resetCart={props.resetCart}
              RemoveFromCart={props.RemoveFromCart}
              name={props.name}
            />
          </Nav>
          <NavbarText href="/admin">AP</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
