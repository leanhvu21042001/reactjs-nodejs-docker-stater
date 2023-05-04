import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import { Button, Container, Card, Row } from "react-bootstrap";

function App() {
  const [state, setState] = useState({
    setBookName: "",
    setReview: "",
    fetchData: [],
    reviewUpdate: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange2 = (event) => {
    setState((prev) => ({
      ...prev,
      reviewUpdate: event.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get("/api/get")
      .then((res) =>
        setState((prev) => ({ ...prev, fetchData: res?.data ?? [] }))
      );
  }, []);

  const submit = () => {
    axios.post("/api/insert", state).then(() => alert("Success post"));

    console.log(state);
    document.location.reload();
  };

  //   const deleteItem = (id) => {
  //     if (confirm("Do you want to delete?")) {
  //       axios.delete(`/api/delete/${id}`);
  //       document.location.reload();
  //     }
  //   };

  const edit = (id) => {
    axios.put(`/api/update/${id}`, state);
    document.location.reload();
  };

  return (
    <div className="App">
      <h1>Dockerized Fullstack React Application</h1>
      <div className="form">
        <input
          name="setBookName"
          placeholder="Enter Book Name"
          onChange={handleChange}
        />
        <input
          name="setReview"
          placeholder="Enter Review"
          onChange={handleChange}
        />
      </div>
      <Button className="my-2" variant="primary" onClick={submit}>
        Submit
      </Button>{" "}
      <br />
      <br />
      <Container>
        <Row>
          {console.log({
            state,
          })}
          {state.fetchData.map((val, key) => {
            return (
              <React.Fragment>
                <Card style={{ width: "18rem" }} className="m-2">
                  <Card.Body>
                    <Card.Title>{val.book_name}</Card.Title>
                    <Card.Text>{val.book_review}</Card.Text>
                    <input
                      name="reviewUpdate"
                      onChange={handleChange2}
                      placeholder="Update Review"
                    ></input>
                    <Button
                      className="m-2"
                      onClick={() => {
                        edit(val.id);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                    //   onClick={() => {
                    //     delete val.id;
                    //   }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
