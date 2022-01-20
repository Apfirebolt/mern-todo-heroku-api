import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToDoForm from "../../components/AddToDoForm";
import LoaderComponent from "../../components/Loader";
import ConfirmDeleteModal from "../../components/ConfirmModal";
import {
  listToDosAction,
  deleteToDosAction,
  addToDoAction,
} from "../../actions/toDoActions";
import { Table, Container, Button, Modal } from "react-bootstrap";

const ToDoHomePage = () => {
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState({});
  const toDoList = useSelector((state) => state.listToDo);
  const { loading, toDos } = { ...toDoList };
  const dispatch = useDispatch();

  const handleClose = () => setShowDeleteForm(false);
  const handleSelectDelete = (toDoId) => {
    const selected = toDos.find((item) => item._id === toDoId);
    setSelectedToDo(selected);
    setShowDeleteForm(true);
  };

  const deleteToDoConfirm = (todoId) => {
    dispatch(deleteToDosAction(todoId));
    dispatch(listToDosAction());
    setShowDeleteForm(false);
  };

  const addToDo = (values) => {
    dispatch(addToDoAction({ ...values }));
    dispatch(listToDosAction());
  };

  useEffect(() => {
    dispatch(listToDosAction());
  }, [dispatch]);

  return (
    <Fragment>
      {loading && (
        <LoaderComponent />
      )}
      <Container>
        <h3 className="text-center my-3">To Do Page</h3>
        <AddToDoForm addToDo={addToDo} />
        <Table striped bordered hover className="my-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {toDos?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td className="text-center">
                    <Button
                      className="m-1"
                      variant="danger"
                      onClick={() => handleSelectDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={showDeleteForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm To Do Delete ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ConfirmDeleteModal
            confirmDelete={deleteToDoConfirm}
            selectedToDo={selectedToDo}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default ToDoHomePage;
