import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";

const AddToDoForm = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    props.addToDo(values);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="todo">
          <Form.Label>Enter To Do Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name of To do"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <Form.Text className="text-danger d-block my-2">
            {errors.name?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddToDoForm;
