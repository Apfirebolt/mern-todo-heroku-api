import React, { Fragment } from "react";
import { Navbar, NavbarBrand, Container } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <Fragment>
      <Navbar className="fixed-bottom" color="dark">
        <Container className="d-flex justify-content-center">
          <NavbarBrand className="d-block">Copyright @2022 Mern Heroku App</NavbarBrand>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default FooterComponent;
