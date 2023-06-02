import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTournament } from "../../actions/tournamentActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tournamentCreate = useSelector((state) => state.tournamentCreate);
  const { loading, error } = tournamentCreate;

  const resetHandler = () => {
    setName("");
    setLocation("");
    setStartDate("");
    setEndDate("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTournament(name, location, startDate, endDate));
    if (!name || !location || !startDate || !endDate) return;

    resetHandler();
    navigate("/tournaments");
  };

  return (
    <MainScreen title="Create a Tournament">
      <Card>
        <Card.Header>Create a New Tournament</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="name">
              <Form.Label>Tournament Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Tournament Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Tournament
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Fields
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
};

export default CreateTournament;