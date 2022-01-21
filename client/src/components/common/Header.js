import React, { useEffect } from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link as ReachLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../actions/authActions";
import { toast } from "react-toastify";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success, loading } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success("Logged in successfully!");
      navigate("/todos");
    }
  }, [success]);

  const logoutFunction = (e) => {
    toast.success("Logged out successfully!");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>MERN Heroku TODO</Navbar.Brand>
          {userInfo ? (
            <Nav className="me-auto">
              <Nav.Link as={ReachLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={ReachLink} to="/todos">
                To Do
              </Nav.Link>
              <Button onClick={(e) => logoutFunction(e)}>Log Out</Button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link as={ReachLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={ReachLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={ReachLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
