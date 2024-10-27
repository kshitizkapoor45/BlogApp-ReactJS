import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Navbar, NavbarBrand, NavItem, NavLink, NavbarToggler,
  Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu,
  DropdownItem, Nav
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from '../auth';

const NavBar = () => {
  // State to manage the collapse
  const [isOpen, setIsOpen] = useState(false);
  const [login, setlogin] = useState(false);
  const [user, setuser] = useState(undefined)
  const navigate = useNavigate()

  useEffect(() => {

    setlogin(isLoggedIn())
    setuser(getCurrentUser())

  }, [login])

  const logout = () => {
    doLogout(() => {
      setlogin(false)
      navigate("/login")
    })
  }

  // Toggle function to handle the navbar collapse
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        color='dark'
        dark
        expand='md'
        fixed=''
        className='px-5'// Remove or set to 'top' or 'bottom' as needed
      >
        <NavbarBrand tag={ReactLink} to="/" >My Blogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">
                New Feed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavLink tag={ReactLink} to="/services">
              Services
            </NavLink>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
        <Nav navbar>

          {
            login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/profile">
                    My Profile
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user}
                  </NavLink>
                </NavItem>


                <NavItem>
                  <NavLink onClick={logout}>
                    Logout
                  </NavLink>
                </NavItem>

               
              </>
            )
          }

          {
            !login && (
              <>

                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>


                <NavItem>
                  <NavLink tag={ReactLink} to="/signin">
                    Signin
                  </NavLink>
                </NavItem>
              </>
            )
          }
        </Nav>
      </Navbar>

    </div>
  );
}

export default NavBar;
