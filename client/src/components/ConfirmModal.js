import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";

const ConfirmDeleteModal = (props) => {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    props.confirmDelete(props.selectedToDo._id);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <p>
          Are you sure you want to delete the to do named "
          {props.selectedToDo.name}" ?
        </p>
        <Button variant="secondary" className="m-1" type="button">
          Cancel
        </Button>
        <Button variant="danger" className="m-1" type="submit">
          Confirm
        </Button>
      </Form>
    </Container>
  );
};

export default ConfirmDeleteModal;
