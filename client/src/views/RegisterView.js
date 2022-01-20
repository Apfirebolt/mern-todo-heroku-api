import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerAction } from "../actions/authActions";
import { Form, Button, Container } from "react-bootstrap";

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(registerAction({ ...values }));
  };

  return (
    <Container className="my-4 mx-auto w-50">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Your Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register("username", {
              required: "Username field is required",
            })}
          />
          <Form.Text className="text-muted">
            You're required to have a unique username.
          </Form.Text>
          <Form.Text className="text-danger d-block my-2">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>Your First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            {...register("firstName")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Your Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            {...register("lastName")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email field is required",
              isEmail: "This must be valid email",
            })}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Text className="text-danger d-block my-2">
            {errors.email?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password field is required",
            })}
          />
          <Form.Text className="text-danger d-block my-2">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
