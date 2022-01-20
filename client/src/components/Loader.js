import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="d-flex justify-content-center my-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden text-center">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default Loader;
