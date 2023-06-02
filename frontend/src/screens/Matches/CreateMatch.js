import React, { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createMatch } from "../../actions/matchActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const CreateMatch = () => {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const matchCreate = useSelector((state) => state.matchCreate);
  const { loading, error } = matchCreate;

  const resetHandler = () => {
    setTeam1("");
    setTeam2("");
    setStartTime("");
    setEndTime("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createMatch(team1, team2, startTime, endTime));
    if (!team1 || !team2 || !startTime || !endTime) return;

    resetHandler();
    navigate('/matches');
  };

  return (
    <MainScreen title="Create a Match">
      <Card>
        <Card.Header>Create a New Match</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="team1">
              <Form.Label>Team 1</Form.Label>
              <Form.Control
                type="text"
                value={team1}
                placeholder="Enter Team 1"
                onChange={(e) => setTeam1(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="team2">
              <Form.Label>Team 2</Form.Label>
              <Form.Control
                type="text"
                value={team2}
                placeholder="Enter Team 2"
                onChange={(e) => setTeam2(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Match
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

export default CreateMatch;