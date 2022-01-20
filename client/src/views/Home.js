import React from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container className="p-3">
      <h1 className="display-5 text-center my-3">MERN Heroku Boilerplate</h1>
      <p className="lead">
        This is a boilerplate to create MERN stack applications and host them on Heroku Cloud Platform
      </p>
      <p>
        It contains User Authentication, Task Object with List, Delete and Add abilities (Update is missing). It uses Redux for store management
        and React Bootstrap for UI components.
      </p>
    </Container>
  );
};

export default HomePage;
