import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Button,
    Collapse,
    Nav,
    NavLink,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";

export default function NavBar({ loggedInUser, setLoggedInUser, roles }) {

    const [open, setOpen] = useState(false);

    const toggleNavbar = () => setOpen(!open);



    return (
        <div>
            <Navbar color="light" light fixed="true" expand="lg">
                <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
                    🧹🧼House Rules
                </NavbarBrand>
                {loggedInUser ? (
                    <>
                        <NavbarToggler onClick={toggleNavbar} />
                        <Collapse isOpen={open} navbar>

                            <Nav navbar>
                                {loggedInUser.roles.includes("Admin") && (
                                    <NavItem onClick={() => setOpen(false)}>
                                        <NavLink tag={RRNavLink} to="/userProfiles">
                                            User Profiles
                                        </NavLink>
                                    </NavItem>
                                )}
                            </Nav>
                            <Nav navbar>
                               
                                    <NavItem onClick={() => setOpen(false)}>
                                        <NavLink tag={RRNavLink} to="/chores">
                                            Chores
                                        </NavLink>
                                    </NavItem>
                             
                            </Nav>
                            <Nav navbar>
                               
                               <NavItem onClick={() => setOpen(false)}>
                               <NavLink tag={RRNavLink} to={`/userProfiles/mychores/${loggedInUser.id}`}>
                                       My Chores
                                   </NavLink>
                               </NavItem>
                        
                       </Nav>

                        </Collapse>
                        <Button
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                setOpen(false);
                                logout().then(() => {
                                    setLoggedInUser(null);
                                    setOpen(false);
                                });
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={RRNavLink} to="/login">
                                <Button color="primary">Login</Button>
                            </NavLink>
                        </NavItem>
                    </Nav>
                )}
            </Navbar>
        </div>
    );
}