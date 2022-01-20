import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToDoForm from "../../components/AddToDoForm";
import { listToDosAction } from "../../actions/toDoActions";
import { Table, Container, Button } from "react-bootstrap";

const ToDoHomePage = () => {
  const toDoList = useSelector((state) => state.listToDo);
  const { loading, toDos } = { ...toDoList };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listToDosAction());
  }, [dispatch]);

  return (
    <Fragment>
      {loading && <p>Loading</p>}
      <Container>
        <h3 className="text-center my-3">To Do Page</h3>
        <AddToDoForm />
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
                    <Button className="m-1">Update</Button>
                    <Button className="m-1" variant="danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
};

export default ToDoHomePage;
