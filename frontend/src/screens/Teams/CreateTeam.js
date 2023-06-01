import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../../actions/teamActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const CreateTeam = ({ history }) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [dateCreated, setDateCreated] = useState("");

  const dispatch = useDispatch();

  const teamCreate = useSelector((state) => state.teamCreate);
  const { loading, error } = teamCreate;

  const resetHandler = () => {
    setName("");
    setCountry("");
    setCity("");
    setDateCreated("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTeam(name, country, city, dateCreated));
    if (!name || !country || !city || !dateCreated) return;

    resetHandler();
    history.push("/teams");
  };

  return (
    <MainScreen title="Create a Team">
      <Card>
        <Card.Header>Create a New Team</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="name">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter Team Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                placeholder="Enter Country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                placeholder="Enter City"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="dateCreated">
              <Form.Label>Date Created</Form.Label>
              <Form.Control
                type="date"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Team
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

export default CreateTeam;